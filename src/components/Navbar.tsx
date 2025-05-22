import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  FileText, CheckCircle2, BookOpen, Info, 
  Menu, Home, DollarSign, MessageSquare, X, ChevronRight 
} from "lucide-react";
import FeedbackDialog from "./FeedbackDialog";
import LinkedInAutomationDialog from "./LinkedInAutomation/LinkedInAutomationDialog";
import LinkedInOptimizationDialog from "./LinkedInOptimization/LinkedInOptimizationDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/utils/responsiveUtils";
import { ResponsiveContainer } from "./Layout/ResponsiveContainer";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const scrollPosition = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Update header style based on scroll position
  useEffect(() => {
    setIsScrolled(scrollPosition > 20);
  }, [scrollPosition]);

  const navLinks = [
    {
      title: "Home",
      icon: Home,
      path: "/",
      description: "Return to homepage"
    },
    {
      title: "Resume Builder",
      icon: FileText,
      path: "/builder",
      description: "Create your professional resume"
    },
    {
      title: "ATS Checker",
      icon: CheckCircle2,
      path: "/ats-checker",
      description: "Verify ATS compatibility"
    },
    {
      title: "Career Tips",
      icon: MessageSquare,
      path: "/career-tips",
      description: "Resume advice & interview tips"
    },
    {
      title: "Interview Guide",
      icon: BookOpen,
      path: "/interview-guide",
      description: "Prepare for interviews"
    },
    {
      title: "Pricing",
      icon: DollarSign,
      path: "/pricing",
      description: "View our pricing plans"
    },
    {
      title: "About Us",
      icon: Info,
      path: "/about",
      description: "Learn about our mission"
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "w-full py-3 sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-white border-b"
      )}
    >
      <ResponsiveContainer maxWidth="5xl">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-lg md:text-xl font-medium text-primary flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-lg font-bold">
              S
            </span>
            <span>SXO-Resume</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm bg-transparent hover:bg-gray-50">Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-1 p-4 w-[300px] bg-white rounded-xl shadow-lg">
                      {navLinks.slice(0, 4).map((link) => (
                        <Link 
                          key={link.path}
                          to={link.path} 
                          className={cn(
                            "flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors",
                            isActive(link.path) && "bg-primary/5 text-primary"
                          )}
                        >
                          <link.icon className={cn("w-4 h-4", isActive(link.path) ? "text-primary" : "text-gray-400")} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{link.title}</div>
                            <p className="text-xs text-gray-500">{link.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm bg-transparent hover:bg-gray-50">Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-1 p-4 w-[300px] bg-white rounded-xl shadow-lg">
                      <Link 
                        to="/about" 
                        className={cn(
                          "flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors",
                          isActive("/about") && "bg-primary/5 text-primary"
                        )}
                      >
                        <Info className={cn("w-4 h-4", isActive("/about") ? "text-primary" : "text-gray-400")} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">About Us</div>
                          <p className="text-xs text-gray-500">Learn about our mission</p>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <LinkedInOptimizationDialog />
            <LinkedInAutomationDialog />
            <FeedbackDialog />
            <Link to="/builder">
              <Button size="sm" className="ml-2 shadow-sm">
                Create Resume
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="text-lg font-medium text-primary flex items-center gap-2">
                      <span className="bg-primary/10 text-primary w-6 h-6 flex items-center justify-center rounded-md font-bold text-sm">
                        S
                      </span>
                      <span>SXO-Resume</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 py-6 px-4 overflow-y-auto mobile-scroll-view">
                    <div className="space-y-1">
                      {navLinks.map((link) => (
                        <Link 
                          key={link.path}
                          to={link.path} 
                          className={cn(
                            "flex items-center justify-between p-3 rounded-md transition-colors",
                            isActive(link.path) 
                              ? "bg-primary/10 text-primary" 
                              : "hover:bg-gray-100"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <link.icon className={cn(
                              "w-5 h-5 flex-shrink-0", 
                              isActive(link.path) ? "text-primary" : "text-gray-500"
                            )} />
                            <div>
                              <div className="font-medium">{link.title}</div>
                              <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 pb-6 px-4 space-y-3">
                    <LinkedInOptimizationDialog />
                    <LinkedInAutomationDialog />
                    <FeedbackDialog />
                    <Link to="/builder" className="block mt-4">
                      <Button className="w-full shadow-sm">
                        Create Resume
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </ResponsiveContainer>
    </nav>
  );
};

export default Navbar;
