import { useState } from "react";
import { LayoutDashboard, FileText, Users, Package, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const sidebarItems = [
  { title: "Overview", url: "/dashboard/ngo-admin", icon: LayoutDashboard },
  { title: "Help Requests", url: "/dashboard/ngo-admin/requests", icon: FileText },
  { title: "Volunteers", url: "/dashboard/ngo-admin/volunteers", icon: Users },
  { title: "Inventory", url: "/dashboard/ngo-admin/inventory", icon: Package },
  { title: "Alerts", url: "/dashboard/ngo-admin/alerts", icon: AlertTriangle },
];

const initialRequests = [
  { id: "1", title: "School supplies for 50 children", type: "Education", urgency: "High", status: "pending", beneficiary: "Ramesh K.", location: "Mumbai" },
  { id: "2", title: "Emergency medical aid", type: "Medical", urgency: "Critical", status: "pending", beneficiary: "Sunita D.", location: "Kerala" },
  { id: "3", title: "Food rations for 100 families", type: "Food", urgency: "High", status: "verified", beneficiary: "Anil M.", location: "Delhi" },
  { id: "4", title: "Shelter repair after cyclone", type: "Shelter", urgency: "Critical", status: "verified", beneficiary: "Meena S.", location: "Odisha" },
];

const volunteers = [
  { id: "1", name: "Aarav Patel", skills: "Teaching, Hindi", location: "Mumbai", status: "Active" },
  { id: "2", name: "Sneha Iyer", skills: "Medical, First Aid", location: "Bangalore", status: "Active" },
  { id: "3", name: "Vikram Singh", skills: "Logistics, Driving", location: "Delhi", status: "Inactive" },
];

const initialInventory = [
  { id: "1", item: "Rice (kg)", category: "Food", quantity: 500, unit: "kg" },
  { id: "2", item: "Blankets", category: "Clothes", quantity: 200, unit: "pcs" },
  { id: "3", item: "Paracetamol", category: "Medicine", quantity: 1000, unit: "tablets" },
  { id: "4", item: "First Aid Kits", category: "Medicine", quantity: 50, unit: "kits" },
];

export default function NGOAdminDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [inventory, setInventory] = useState(initialInventory);

  const handleVerify = (id: string) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "verified" } : r));
    toast.success("Request verified and published to donors");
  };
  const handleReject = (id: string) => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "rejected" } : r));
    toast.info("Request rejected");
  };

  return (
    <DashboardLayout items={sidebarItems} title="NGO Admin Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Pending Requests", value: requests.filter((r) => r.status === "pending").length, icon: "📋" },
            { label: "Verified Requests", value: requests.filter((r) => r.status === "verified").length, icon: "✅" },
            { label: "Volunteers", value: volunteers.length, icon: "👥" },
            { label: "Inventory Items", value: inventory.length, icon: "📦" },
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

        <Tabs defaultValue="requests">
          <TabsList>
            <TabsTrigger value="requests">Help Requests</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Beneficiary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.title}</TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell>
                          <Badge variant={r.urgency === "Critical" ? "destructive" : "secondary"}>{r.urgency}</Badge>
                        </TableCell>
                        <TableCell>{r.beneficiary}</TableCell>
                        <TableCell>
                          <Badge variant={r.status === "verified" ? "default" : r.status === "rejected" ? "destructive" : "secondary"}>
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {r.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleVerify(r.id)}>Verify</Button>
                              <Button size="sm" variant="outline" onClick={() => handleReject(r.id)}>Reject</Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {volunteers.map((v) => (
                      <TableRow key={v.id}>
                        <TableCell className="font-medium">{v.name}</TableCell>
                        <TableCell>{v.skills}</TableCell>
                        <TableCell>{v.location}</TableCell>
                        <TableCell>
                          <Badge variant={v.status === "Active" ? "default" : "secondary"}>{v.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.item}</TableCell>
                        <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
