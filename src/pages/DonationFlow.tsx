import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, CreditCard, Smartphone, Building } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GratitudePopup from "@/components/donation/GratitudePopup";
import { MOCK_HELP_REQUESTS } from "@/lib/constants";

const presetAmounts = [500, 1000, 2500, 5000, 10000];

export default function DonationFlow() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const request = MOCK_HELP_REQUESTS.find((r) => r.id === requestId) || MOCK_HELP_REQUESTS[0];

  const [amount, setAmount] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showGratitude, setShowGratitude] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowGratitude(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-1 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Make a Donation</h1>

        <div className="grid gap-6">
          {/* Request Summary */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{request.title}</h3>
                  <p className="text-sm text-muted-foreground">{request.ngo} • {request.location}</p>
                </div>
                <Badge variant={request.urgency === "Critical" ? "destructive" : "secondary"}>{request.urgency}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>₹{request.raised.toLocaleString("en-IN")} raised</span>
                  <span className="font-medium">₹{request.amount.toLocaleString("en-IN")} goal</span>
                </div>
                <Progress value={(request.raised / request.amount) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" /> Choose Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDonate} className="space-y-6">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {presetAmounts.map((a) => (
                    <Button key={a} type="button" variant={amount === a ? "default" : "outline"} onClick={() => setAmount(a)}>
                      ₹{a.toLocaleString("en-IN")}
                    </Button>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="custom">Or enter custom amount (₹)</Label>
                  <Input id="custom" type="number" min={1} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </div>

                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "upi", label: "UPI", icon: Smartphone },
                      { value: "card", label: "Card", icon: CreditCard },
                      { value: "netbanking", label: "Net Banking", icon: Building },
                    ].map((pm) => (
                      <div key={pm.value} className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value={pm.value} id={pm.value} />
                        <Label htmlFor={pm.value} className="flex items-center gap-2 cursor-pointer">
                          <pm.icon className="h-4 w-4" /> {pm.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={processing || amount < 1}>
                  {processing ? "Processing..." : `Donate ₹${amount.toLocaleString("en-IN")}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  This is a simulated payment. No real money will be charged.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />

      <GratitudePopup
        open={showGratitude}
        onClose={() => { setShowGratitude(false); navigate("/"); }}
        amount={amount}
        requestTitle={request.title}
      />
    </div>
  );
}
