

## HopeLink — NGO Donation Platform

A full-stack platform connecting NGOs, donors, volunteers, and beneficiaries with Supabase backend, role-based auth, and INR currency.

### Phase 1: Foundation & Auth
- **Design system**: Teal/dark green primary (#0D9488), soft pink accents, clean modern UI matching reference images
- **Shared layout**: Navbar with HopeLink logo (❤️), nav links (Home, Help Requests, NGO Directory, Impact Stories, Volunteer), Log In + Donate Now buttons, footer
- **Role-based authentication**: Sign in/Sign up with role selector (Donor, NGO Admin, Volunteer, Beneficiary) — Supabase Auth + profiles table + user_roles table
- **Landing page**: Hero section, how it works, featured causes, impact stats, testimonials

### Phase 2: Database & Core Data (Supabase)
- **Tables**: profiles, user_roles, ngos, help_requests, donations, volunteers, volunteer_activities, inventory_items, impact_stories, emergency_alerts
- **RLS policies**: Role-based access for each table
- Help requests have statuses: pending → verified/rejected → funded → delivered → impact_proof

### Phase 3: Public Pages
- **Help Requests page**: List of verified requests with type, urgency badges (critical/high/medium), location, progress bar, donate button
- **NGO Directory**: Cards with NGO profiles, mission, verified badge, cause areas
- **Impact Stories**: Success stories with photos and impact metrics
- **Volunteer page**: Browse opportunities, filter by skills/location

### Phase 4: Role-Based Dashboards

**Donor Dashboard** (sidebar: Overview, My Donations, Impact Timeline)
- Stats cards: Total Donated, Donations count, Impact Score, Active Causes
- Donation History bar chart
- Live Impact Timeline with stage indicators (Request Raised → NGO Verified → Donation Received → Help Delivered → Impact Proof)

**NGO Admin Dashboard** (sidebar: Overview, Help Requests, Volunteers, Inventory, Alerts)
- Stats: Pending Requests, Volunteers, Inventory Items
- Tabs: Help Requests table with verify/reject actions, Volunteers list, Inventory management
- Emergency alerts creation

**Volunteer Dashboard** (sidebar: Overview, Opportunities, My Activities)
- Stats: Hours Logged, Activities Joined, Location
- Skills tags display
- Matched Opportunities cards with "Join Activity" button

**Beneficiary Dashboard** (sidebar: Overview, My Requests, Submit Request)
- Stats: Total Requests, Verified, Pending
- Request cards with progress bars and verification status
- Submit new help request form (title, type, urgency, location, amount, description)

### Phase 5: Donation Flow
- Simulated payment form (amount, payment method selector)
- **Gratitude screen**: Soft pink themed popup with rhyming gratitude quote, "See More Kind Words" button that reveals additional quotes dynamically
- Donation tracking linked to impact timeline

### Phase 6: Additional Features
- Real-time donation transparency (fund usage breakdown per request)
- Digital inventory management for NGOs (food, clothes, medicines with quantities)
- NGO–donor communication updates
- Emergency alerts system
- Mobile-responsive, accessible UI with proper ARIA labels and larger touch targets

