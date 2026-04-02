import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            HopeLink
          </div>
          <p className="text-sm text-muted-foreground">
            Connecting hearts, transforming lives. A transparent platform bridging NGOs, donors, volunteers, and beneficiaries.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/help-requests" className="block hover:text-foreground">Help Requests</Link>
            <Link to="/ngo-directory" className="block hover:text-foreground">NGO Directory</Link>
            <Link to="/impact-stories" className="block hover:text-foreground">Impact Stories</Link>
            <Link to="/volunteer" className="block hover:text-foreground">Volunteer</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">For Organizations</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/auth" className="block hover:text-foreground">Register NGO</Link>
            <Link to="/auth" className="block hover:text-foreground">Admin Login</Link>
            <span className="block">Partner With Us</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>info@hopelink.org</p>
            <p>+91 98765 43210</p>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        © 2026 HopeLink. Built with ❤️ for social impact.
      </div>
    </footer>
  );
}
