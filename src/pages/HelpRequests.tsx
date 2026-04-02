import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Search, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_HELP_REQUESTS, HELP_TYPES, URGENCY_LEVELS } from "@/lib/constants";

export default function HelpRequests() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const verified = MOCK_HELP_REQUESTS.filter((r) => r.status !== "pending" && r.status !== "rejected");
  const filtered = verified.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || r.type === typeFilter;
    const matchUrgency = urgencyFilter === "all" || r.urgency === urgencyFilter;
    return matchSearch && matchType && matchUrgency;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">People Who Need Help</h1>
          <p className="text-muted-foreground">All requests are verified by registered NGOs for authenticity</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title or location..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {HELP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Urgency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency</SelectItem>
              {URGENCY_LEVELS.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((req) => (
            <Card key={req.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <Badge variant={req.urgency === "Critical" ? "destructive" : req.urgency === "High" ? "default" : "secondary"}>
                    {req.urgency}
                  </Badge>
                  <Badge variant="outline">{req.type}</Badge>
                </div>
                <h3 className="font-semibold text-lg leading-tight">{req.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{req.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₹{req.raised.toLocaleString("en-IN")}</span>
                    <span className="font-medium">₹{req.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <Progress value={(req.raised / req.amount) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{Math.round((req.raised / req.amount) * 100)}% funded</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{req.location}</span>
                  <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-primary" />{req.ngo}</span>
                </div>
                <Button className="w-full" asChild>
                  <Link to={`/donate/${req.id}`}>Donate Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No matching requests found.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
