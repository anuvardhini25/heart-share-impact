import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_NGOS } from "@/lib/constants";

export default function NGODirectory() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NGO Directory</h1>
          <p className="text-muted-foreground">Explore verified NGOs making a difference across India</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_NGOS.map((ngo) => (
            <Card key={ngo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={ngo.image} alt={ngo.name} className="w-full h-48 object-cover" loading="lazy" />
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{ngo.name}</h3>
                  {ngo.verified && <CheckCircle className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{ngo.mission}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {ngo.location}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {ngo.causes.map((c) => (
                    <Badge key={c} variant="secondary">{c}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
