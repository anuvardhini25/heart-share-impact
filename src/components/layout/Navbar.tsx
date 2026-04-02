import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Help Requests", to: "/help-requests" },
  { label: "NGO Directory", to: "/ngo-directory" },
  { label: "Impact Stories", to: "/impact-stories" },
  { label: "Volunteer", to: "/volunteer" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardPath = user
    ? `/dashboard/${user.role.replace("_", "-")}`
    : "/auth";

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <span>HopeLink</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate(dashboardPath)}>
                <LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard
              </Button>
              <span className="text-sm text-muted-foreground">Hi, {user?.name}</span>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
              Log In
            </Button>
          )}
          <Button size="sm" onClick={() => navigate("/help-requests")}>
            Donate Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3 animate-fade-in">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            {isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigate(dashboardPath); setMobileOpen(false); }}>
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" className="flex-1" onClick={() => { navigate("/auth"); setMobileOpen(false); }}>
                Log In
              </Button>
            )}
            <Button size="sm" className="flex-1" onClick={() => { navigate("/help-requests"); setMobileOpen(false); }}>
              Donate Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
