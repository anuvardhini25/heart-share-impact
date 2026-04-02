import { LayoutDashboard, Heart, Clock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImpactTimeline from "@/components/dashboard/ImpactTimeline";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sidebarItems = [
  { title: "Overview", url: "/dashboard/donor", icon: LayoutDashboard },
  { title: "My Donations", url: "/dashboard/donor/donations", icon: Heart },
  { title: "Impact Timeline", url: "/dashboard/donor/timeline", icon: Clock },
];

const donationHistory = [
  { month: "Jan", amount: 2000 },
  { month: "Feb", amount: 5000 },
  { month: "Mar", amount: 3000 },
  { month: "Apr", amount: 8000 },
  { month: "May", amount: 4000 },
  { month: "Jun", amount: 10000 },
];

const myDonations = [
  { id: "1", title: "School supplies for 50 children", amount: 2500, date: "2026-03-15", status: "delivered" as const },
  { id: "2", title: "Emergency medical aid", amount: 5000, date: "2026-03-20", status: "funded" as const },
  { id: "3", title: "Monthly food rations", amount: 1000, date: "2026-03-28", status: "verified" as const },
];

export default function DonorDashboard() {
  return (
    <DashboardLayout items={sidebarItems} title="Donor Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Donated", value: "₹32,000", icon: "💰" },
            { label: "Donations", value: "8", icon: "🎁" },
            { label: "Impact Score", value: "92", icon: "⭐" },
            { label: "Active Causes", value: "3", icon: "🌟" },
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

        {/* Chart */}
        <Card>
          <CardHeader><CardTitle>Donation History</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={donationHistory}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                <Bar dataKey="amount" fill="hsl(174, 62%, 56%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Donations with Timeline */}
        <Card>
          <CardHeader><CardTitle>Live Impact Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {myDonations.map((d) => (
              <div key={d.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{d.title}</p>
                    <p className="text-sm text-muted-foreground">₹{d.amount.toLocaleString("en-IN")} • {d.date}</p>
                  </div>
                </div>
                <ImpactTimeline currentStatus={d.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
