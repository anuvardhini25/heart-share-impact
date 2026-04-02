import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const opportunities = [
  { id: "1", title: "Teaching Assistant", ngo: "Hope Foundation", location: "Mumbai", skills: ["Teaching", "Hindi", "English"], type: "Education", slots: 5, duration: "3 months" },
  { id: "2", title: "Medical Camp Volunteer", ngo: "Smile India", location: "Rural Karnataka", skills: ["First Aid", "Medical"], type: "Medical", slots: 10, duration: "1 week" },
  { id: "3", title: "Food Distribution Drive", ngo: "Green Earth Trust", location: "Delhi NCR", skills: ["Logistics", "Driving"], type: "Food", slots: 20, duration: "1 day" },
  { id: "4", title: "Shelter Construction Helper", ngo: "Asha Kiran", location: "Odisha", skills: ["Construction", "Physical Labor"], type: "Shelter", slots: 15, duration: "2 weeks" },
  { id: "5", title: "Digital Literacy Trainer", ngo: "Hope Foundation", location: "Online/Remote", skills: ["Computer Science", "Teaching"], type: "Education", slots: 8, duration: "6 months" },
];

export default function VolunteerPage() {
  const [joined, setJoined] = useState<Set<string>>(new Set());

  const handleJoin = (id: string) => {
    setJoined((prev) => new Set(prev).add(id));
    toast.success("You've expressed interest! The NGO will contact you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Volunteer Opportunities</h1>
          <p className="text-muted-foreground">Find meaningful ways to contribute your skills and time</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">{opp.type}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />{opp.slots} slots
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{opp.title}</h3>
                <p className="text-sm text-muted-foreground">{opp.ngo}</p>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{opp.location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{opp.duration}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {opp.skills.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                  ))}
                </div>
                <Button className="w-full" disabled={joined.has(opp.id)} onClick={() => handleJoin(opp.id)}>
                  {joined.has(opp.id) ? "Applied ✓" : "Join Activity"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
