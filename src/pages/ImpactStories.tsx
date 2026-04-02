import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_IMPACT_STORIES } from "@/lib/constants";

export default function ImpactStories() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Impact Stories</h1>
          <p className="text-muted-foreground">Real stories of change, powered by your generosity</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_IMPACT_STORIES.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={story.image} alt={story.title} className="w-full h-56 object-cover" loading="lazy" />
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-xl">{story.title}</h3>
                <p className="text-muted-foreground">{story.description}</p>
                <p className="text-sm text-muted-foreground">By {story.ngo}</p>
                <div className="flex gap-6 text-sm pt-2">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4 text-primary" />{story.beneficiaries} beneficiaries</span>
                  <span className="flex items-center gap-1"><TrendingUp className="h-4 w-4 text-primary" />₹{(story.donations / 1000).toFixed(0)}K raised</span>
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
