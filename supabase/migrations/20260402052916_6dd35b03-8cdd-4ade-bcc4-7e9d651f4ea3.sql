
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('donor', 'ngo_admin', 'volunteer', 'beneficiary');

-- Create help type enum
CREATE TYPE public.help_type AS ENUM ('Food', 'Education', 'Medical', 'Shelter');

-- Create urgency enum
CREATE TYPE public.urgency_level AS ENUM ('Critical', 'High', 'Medium', 'Low');

-- Create request status enum
CREATE TYPE public.request_status AS ENUM ('pending', 'verified', 'rejected', 'funded', 'delivered', 'impact_proof');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- NGOs table
CREATE TABLE public.ngos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  mission TEXT,
  location TEXT,
  causes TEXT[],
  verified BOOLEAN DEFAULT false,
  contact_email TEXT,
  contact_phone TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.ngos ENABLE ROW LEVEL SECURITY;

-- Help requests table
CREATE TABLE public.help_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type help_type NOT NULL,
  urgency urgency_level NOT NULL DEFAULT 'Medium',
  status request_status NOT NULL DEFAULT 'pending',
  location TEXT,
  amount NUMERIC DEFAULT 0,
  raised NUMERIC DEFAULT 0,
  ngo_id UUID REFERENCES public.ngos(id),
  beneficiary_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;

-- Donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  help_request_id UUID REFERENCES public.help_requests(id),
  amount NUMERIC NOT NULL,
  payment_method TEXT DEFAULT 'upi',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Volunteers table
CREATE TABLE public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  skills TEXT[],
  availability TEXT,
  interests TEXT[],
  location TEXT,
  hours_logged NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- Volunteer activities
CREATE TABLE public.volunteer_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  ngo_id UUID REFERENCES public.ngos(id),
  location TEXT,
  skills_needed TEXT[],
  slots INTEGER DEFAULT 1,
  duration TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.volunteer_activities ENABLE ROW LEVEL SECURITY;

-- Inventory items
CREATE TABLE public.inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES public.ngos(id) ON DELETE CASCADE NOT NULL,
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity NUMERIC DEFAULT 0,
  unit TEXT DEFAULT 'pcs',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;

-- Impact stories
CREATE TABLE public.impact_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES public.ngos(id),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  beneficiaries_count INTEGER DEFAULT 0,
  donations_total NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.impact_stories ENABLE ROW LEVEL SECURITY;

-- Emergency alerts
CREATE TABLE public.emergency_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID REFERENCES public.ngos(id),
  title TEXT NOT NULL,
  message TEXT,
  severity TEXT DEFAULT 'medium',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ngos_updated_at BEFORE UPDATE ON public.ngos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_help_requests_updated_at BEFORE UPDATE ON public.help_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE ON public.volunteers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies

-- Profiles
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User roles
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own roles" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- NGOs
CREATE POLICY "NGOs viewable by everyone" ON public.ngos FOR SELECT USING (true);
CREATE POLICY "NGO admins manage own NGO" ON public.ngos FOR INSERT WITH CHECK (auth.uid() = admin_user_id);
CREATE POLICY "NGO admins update own NGO" ON public.ngos FOR UPDATE USING (auth.uid() = admin_user_id);

-- Help requests
CREATE POLICY "Verified requests viewable by everyone" ON public.help_requests FOR SELECT USING (
  status != 'pending' OR beneficiary_user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);
CREATE POLICY "Beneficiaries create requests" ON public.help_requests FOR INSERT WITH CHECK (auth.uid() = beneficiary_user_id);
CREATE POLICY "NGO admins update requests" ON public.help_requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);

-- Donations
CREATE POLICY "Donors view own donations" ON public.donations FOR SELECT USING (auth.uid() = donor_user_id);
CREATE POLICY "Donors create donations" ON public.donations FOR INSERT WITH CHECK (auth.uid() = donor_user_id);

-- Volunteers
CREATE POLICY "Volunteers viewable by authenticated" ON public.volunteers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Volunteers manage own profile" ON public.volunteers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Volunteers update own profile" ON public.volunteers FOR UPDATE USING (auth.uid() = user_id);

-- Volunteer activities
CREATE POLICY "Activities viewable by everyone" ON public.volunteer_activities FOR SELECT USING (true);
CREATE POLICY "NGO admins create activities" ON public.volunteer_activities FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);

-- Inventory
CREATE POLICY "Inventory viewable by NGO admin" ON public.inventory_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);
CREATE POLICY "NGO admins manage inventory" ON public.inventory_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);
CREATE POLICY "NGO admins update inventory" ON public.inventory_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);

-- Impact stories
CREATE POLICY "Stories viewable by everyone" ON public.impact_stories FOR SELECT USING (true);
CREATE POLICY "NGO admins create stories" ON public.impact_stories FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);

-- Emergency alerts
CREATE POLICY "Active alerts viewable by everyone" ON public.emergency_alerts FOR SELECT USING (true);
CREATE POLICY "NGO admins create alerts" ON public.emergency_alerts FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.ngos WHERE id = ngo_id AND admin_user_id = auth.uid())
);
