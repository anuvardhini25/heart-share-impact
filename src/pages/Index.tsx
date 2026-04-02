import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Shield, Eye, ArrowRight, CheckCircle, HandHeart, TrendingUp, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_HELP_REQUESTS, MOCK_IMPACT_STORIES } from "@/lib/constants";

const stats = [
  { icon: Heart, value: "₹2.5 Cr+", label: "Donations Raised" },
  { icon: Users, value: "10,000+", label: "Lives Impacted" },
  { icon: Shield, value: "150+", label: "Verified NGOs" },
  { icon: HandHeart, value: "5,000+", label: "Active Volunteers" },
];

const howItWorks = [
  { step: "1", title: "Request Help", desc: "Beneficiaries or NGOs submit a help request with details" },
  { step: "2", title: "NGO Verifies", desc: "Registered NGO admin verifies the authenticity of the request" },
  { step: "3", title: "Donor Contributes", desc: "Donors browse verified requests and contribute funds or resources" },
  { step: "4", title: "Track Impact", desc: "Follow your donation through our Live Impact Timeline" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Donor", quote: "HopeLink's transparency made me confident my money reached the right people.", rating: 5 },
  { name: "Rajesh Kumar", role: "NGO Admin", quote: "Managing our help requests and volunteers has never been this efficient.", rating: 5 },
  { name: "Anita Desai", role: "Volunteer", quote: "I found meaningful volunteer opportunities matching my skills perfectly.", rating: 5 },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 py-20 md:py-32">
        <div className="container text-center space-y-6">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            🌟 Trusted by 150+ NGOs across India
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Connect Hearts,{" "}
            <span className="text-primary">Transform Lives</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A transparent platform bridging NGOs, donors, volunteers, and beneficiaries.
            Every donation tracked. Every impact verified.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link to="/help-requests">
                <Heart className="mr-2 h-5 w-5" /> Donate Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth">
                Join as Volunteer <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center space-y-2">
              <s.icon className="h-8 w-8 mx-auto opacity-80" />
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Simple, transparent, and impactful — from request to delivery</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {howItWorks.map((item) => (
            <Card key={item.step} className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">People Who Need Help</h2>
              <p className="text-muted-foreground">Verified requests from trusted NGOs</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/help-requests">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_HELP_REQUESTS.slice(0, 3).map((req) => (
              <Card key={req.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant={req.urgency === "Critical" ? "destructive" : "secondary"}>
                      {req.urgency}
                    </Badge>
                    <Badge variant="outline">{req.type}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg leading-tight">{req.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{req.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Raised ₹{req.raised.toLocaleString("en-IN")}</span>
                      <span className="font-medium">₹{req.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <Progress value={(req.raised / req.amount) * 100} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{req.location}</span>
                    <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-primary" />{req.ngo}</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to={`/donate/${req.id}`}>Donate Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Impact Stories</h2>
          <p className="text-muted-foreground">Real stories of change, powered by your generosity</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {MOCK_IMPACT_STORIES.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={story.image} alt={story.title} className="w-full h-48 object-cover" loading="lazy" />
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-lg">{story.title}</h3>
                <p className="text-sm text-muted-foreground">{story.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4 text-primary" />{story.beneficiaries} helped</span>
                  <span className="flex items-center gap-1"><TrendingUp className="h-4 w-4 text-primary" />₹{(story.donations / 1000).toFixed(0)}K raised</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What People Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Join thousands of donors, volunteers, and NGOs working together for a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/ngo-directory">Explore NGOs</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
