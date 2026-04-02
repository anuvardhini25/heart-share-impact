import { LayoutDashboard, Search, Activity } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const sidebarItems = [
  { title: "Overview", url: "/dashboard/volunteer", icon: LayoutDashboard },
  { title: "Opportunities", url: "/dashboard/volunteer/opportunities", icon: Search },
  { title: "My Activities", url: "/dashboard/volunteer/activities", icon: Activity },
];

const myActivities = [
  { id: "1", title: "Teaching English at Dharavi Center", hours: 24, status: "Ongoing" },
  { id: "2", title: "Food Distribution Drive - March", hours: 8, status: "Completed" },
];

const opportunities = [
  { id: "1", title: "Medical Camp Assistant", ngo: "Smile India", location: "Rural Karnataka", match: 95 },
  { id: "2", title: "Digital Literacy Trainer", ngo: "Hope Foundation", location: "Online", match: 88 },
  { id: "3", title: "Shelter Construction Helper", ngo: "Asha Kiran", location: "Odisha", match: 72 },
];

export default function VolunteerDashboard() {
  return (
    <DashboardLayout items={sidebarItems} title="Volunteer Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Hours Logged", value: "32", icon: "⏱️" },
            { label: "Activities Joined", value: "4", icon: "🎯" },
            { label: "Skills", value: "5", icon: "🛠️" },
            { label: "Location", value: "Mumbai", icon: "📍" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">My Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {["Teaching", "Hindi", "English", "First Aid", "Computer Science"].map((s) => (
              <Badge key={s} variant="secondary" className="px-3 py-1">{s}</Badge>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle>Matched Opportunities</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="flex items-center justify-between border rounded-lg p-4">
                <div>
                  <p className="font-medium">{opp.title}</p>
                  <p className="text-sm text-muted-foreground">{opp.ngo} • {opp.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{opp.match}% match</Badge>
                  <Button size="sm" onClick={() => toast.success("Applied successfully!")}>Join</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>My Activities</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {myActivities.map((a) => (
              <div key={a.id} className="flex items-center justify-between border rounded-lg p-4">
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.hours} hours logged</p>
                </div>
                <Badge variant={a.status === "Completed" ? "default" : "secondary"}>{a.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
