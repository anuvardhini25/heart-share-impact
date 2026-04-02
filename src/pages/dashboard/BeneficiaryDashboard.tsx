import { useState } from "react";
import { LayoutDashboard, FileText, PlusCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HELP_TYPES, URGENCY_LEVELS } from "@/lib/constants";
import ImpactTimeline from "@/components/dashboard/ImpactTimeline";
import { toast } from "sonner";

const sidebarItems = [
  { title: "Overview", url: "/dashboard/beneficiary", icon: LayoutDashboard },
  { title: "My Requests", url: "/dashboard/beneficiary/requests", icon: FileText },
  { title: "Submit Request", url: "/dashboard/beneficiary/submit", icon: PlusCircle },
];

const initialRequests = [
  { id: "1", title: "School supplies for my children", type: "Education", urgency: "High", status: "verified" as const, amount: 5000, raised: 3000 },
  { id: "2", title: "Medical treatment assistance", type: "Medical", urgency: "Critical", status: "pending" as const, amount: 15000, raised: 0 },
  { id: "3", title: "Monthly food rations", type: "Food", urgency: "Medium", status: "delivered" as const, amount: 3000, raised: 3000 },
];

export default function BeneficiaryDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newReq = {
      id: String(requests.length + 1),
      title: fd.get("title") as string,
      type: fd.get("type") as string,
      urgency: fd.get("urgency") as string,
      status: "pending" as const,
      amount: Number(fd.get("amount")),
      raised: 0,
    };
    setRequests((prev) => [...prev, newReq]);
    setDialogOpen(false);
    toast.success("Help request submitted! It will be reviewed by an NGO admin.");
  };

  return (
    <DashboardLayout items={sidebarItems} title="Beneficiary Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Requests", value: requests.length, icon: "📋" },
            { label: "Verified", value: requests.filter((r) => r.status === "verified").length, icon: "✅" },
            { label: "Pending", value: requests.filter((r) => r.status === "pending").length, icon: "⏳" },
            { label: "Delivered", value: requests.filter((r) => r.status === "delivered").length, icon: "🎉" },
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

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">My Requests</h3>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><PlusCircle className="mr-2 h-4 w-4" /> Submit New Request</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Help Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required placeholder="Brief description of help needed" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type of Help</Label>
                    <Select name="type" required>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {HELP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <Select name="urgency" required>
                      <SelectTrigger><SelectValue placeholder="Select urgency" /></SelectTrigger>
                      <SelectContent>
                        {URGENCY_LEVELS.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" required placeholder="City, State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Required Amount (₹)</Label>
                  <Input id="amount" name="amount" type="number" min={100} required placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required placeholder="Explain your situation and how the help will be used..." rows={3} />
                </div>
                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {requests.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{r.title}</h4>
                    <p className="text-sm text-muted-foreground">{r.type} • {r.urgency} urgency</p>
                  </div>
                  <Badge variant={r.status === "pending" ? "secondary" : r.status === "verified" ? "default" : "outline"}>
                    {r.status}
                  </Badge>
                </div>
                {r.amount > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>₹{r.raised.toLocaleString("en-IN")} raised</span>
                      <span>₹{r.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <Progress value={(r.raised / r.amount) * 100} className="h-2" />
                  </div>
                )}
                <ImpactTimeline currentStatus={r.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
