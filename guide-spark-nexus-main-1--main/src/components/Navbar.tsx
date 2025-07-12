import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// IMPORTANT: Import the useAuth hook from the centralized AuthContext file
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { currentUser, signOut } = useAuth(); // Use the auth context
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isStartupsDropdownOpen, setIsStartupsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the base path for navigation based on user role
  // This ensures links within Navbar correctly point to / or /admin
  const basePath = currentUser && currentUser.role === "admin" ? "/admin" : "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust navItems and dropdown hrefs to use basePath
  const navItems = [
    { name: "Home", href: `${basePath}/` },
    { name: "Finance", href: `${basePath}/finance` },
    { name: "Events", href: `${basePath}/events` },
    { name: "Network", href: `${basePath}/network` },
    { name: "Marketplace", href: `${basePath}/marketplace` },
  ];

  const startupsDropdownItems = [
    { name: "Startups", href: `${basePath}/startups` },
    { name: "Internships", href: `${basePath}/internships` },
  ];

  const resourcesDropdownItems = [
    { name: "Resources Hub", href: `${basePath}/resources` },
    { name: "Blogs", href: `${basePath}/blogs` },
    { name: "Scholarships", href: `${basePath}/scholarships` },
    { name: "Courses", href: `${basePath}/courses` },
    { name: "Course Materials", href: `${basePath}/course-materials` },
    { name: "Student Discounts", href: `${basePath}/student-discounts` },
    { name: "Startup Schemes", href: `${basePath}/startup-schemes` },
    { name: "YouTube Shorts", href: `${basePath}/youtube-shorts` },
    { name: "Podcasts", href: `${basePath}/podcasts` },
  ];

  // Check active state against the full path, including basePath
  const isStartupsActive =
    location.pathname === `${basePath}/startups` ||
    location.pathname === `${basePath}/internships`;
  const isResourcesActive =
    location.pathname.startsWith(`${basePath}/resources`) ||
    location.pathname.startsWith(`${basePath}/blogs`) ||
    location.pathname.startsWith(`${basePath}/scholarships`) ||
    location.pathname.startsWith(`${basePath}/courses`) ||
    location.pathname.startsWith(`${basePath}/paid-courses`) ||
    location.pathname.startsWith(`${basePath}/free-courses`) ||
    location.pathname.startsWith(`${basePath}/course-materials`) ||
    location.pathname.startsWith(`${basePath}/student-discounts`) ||
    location.pathname.startsWith(`${basePath}/startup-schemes`) ||
    location.pathname.startsWith(`${basePath}/youtube-shorts`) ||
    location.pathname.startsWith(`${basePath}/podcasts`);

  // Hide navbar completely on signin/signup pages
  // This check is now redundant if Navbar is only rendered within UserLayout/AdminDashboard,
  // but keeping it here as a safeguard if Navbar is ever used standalone.
  if (location.pathname === "/signin" || location.pathname === "/signup") {
    return null;
  }

  return (
    <motion.nav
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-500",
        isScrolled ? "py-1 md:py-2" : "py-2 md:py-4"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <motion.div
          className={cn(
            "flex items-center justify-between transition-all duration-500 w-full max-w-7xl mx-auto",
            isScrolled
              ? "bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl px-3 sm:px-4 md:px-6 py-2 md:py-3 border-t-0 border-x-0 border-b-[2.5px] border-b-[linear-gradient(90deg,rgba(255,255,255,0.85)_0%,rgba(168,85,247,0.7)_50%,rgba(255,255,255,0.85)_100%)]"
              : "bg-black/15 backdrop-blur-xl px-2 md:px-4 py-2 border-none rounded-2xl sm:rounded-3xl"
          )}
          whileHover={{ scale: isScrolled ? 1.01 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo - Mobile Optimized */}
          <motion.div className="flex items-center flex-shrink-0">
            <Link
              to={`${basePath}/`}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink whitespace-nowrap"
            >
              Guide Bazaar
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                    location.pathname === item.href
                      ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Startups Dropdown - open on hover, no arrow */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => isDesktop && setIsStartupsDropdownOpen(true)}
              onMouseLeave={() => isDesktop && setIsStartupsDropdownOpen(false)}
            >
              <DropdownMenu
                open={isDesktop ? isStartupsDropdownOpen : undefined}
                onOpenChange={setIsStartupsDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1",
                      isStartupsActive
                        ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                    tabIndex={0}
                  >
                    Startups
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
                  align="center"
                >
                  {startupsDropdownItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
                          location.pathname === item.href && "text-brand-purple"
                        )}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {/* Resources Dropdown - open on hover, no arrow */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => isDesktop && setIsResourcesDropdownOpen(true)}
              onMouseLeave={() =>
                isDesktop && setIsResourcesDropdownOpen(false)
              }
            >
              <DropdownMenu
                open={isDesktop ? isResourcesDropdownOpen : undefined}
                onOpenChange={setIsResourcesDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1",
                      isResourcesActive
                        ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                    tabIndex={0}
                  >
                    Resources
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
                  align="center"
                >
                  {resourcesDropdownItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
                          location.pathname === item.href && "text-brand-purple"
                        )}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>

          {/* User Info / Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            {currentUser ? (
              <>
                {/* Display username/email */}
                <span className="text-white/80 font-medium text-sm whitespace-nowrap">
                  Hello,{" "}
                  {currentUser.displayName ||
                    currentUser.email?.split("@")[0] ||
                    "User"}
                </span>
                {/* Logout Button */}
                <Button
                  onClick={signOut} // Use signOut from context
                  className="bg-red-700 hover:bg-red-800 rounded-full px-4 xl:px-6 shadow-lg text-sm whitespace-nowrap min-h-[40px]"
                >
                  Logout
                </Button>
                {/* Optional: Link to profile if you want a dedicated profile page */}
                <Link to={`${basePath}/profile`}>
                  <motion.div
                    className="relative"
                    onHoverStart={() => setIsProfileHovered(true)}
                    onHoverEnd={() => setIsProfileHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button
                      className="rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center relative overflow-hidden border border-white/20 transition-all duration-500"
                      animate={{
                        backgroundColor: isProfileHovered
                          ? "#000000"
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                      aria-label="Profile"
                    >
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          opacity: isProfileHovered ? 0 : 1,
                          rotate: isProfileHovered ? -90 : 0,
                          scale: isProfileHovered ? 0.8 : 1,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          opacity: isProfileHovered ? 1 : 0,
                          rotate: isProfileHovered ? 0 : 90,
                          scale: isProfileHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <X
                          className="h-4 w-4 sm:h-5 sm:w-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                          style={{
                            filter:
                              "drop-shadow(0 0 2px rgba(255,255,255,0.5))",
                            backgroundImage:
                              "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-white/70 hover:text-white font-medium transition-colors px-3 xl:px-4 py-2 rounded-full hover:bg-white/10 text-sm whitespace-nowrap"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 rounded-full px-4 xl:px-6 shadow-lg text-sm whitespace-nowrap min-h-[40px]">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Better Spacing */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 border border-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Menu - Completely Redesigned */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-2 mx-3 sm:mx-6 z-[55]"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-black/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-4 w-full max-w-sm mx-auto">
              {/* Main Navigation */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-center text-sm",
                      location.pathname === item.href
                        ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Startups Section */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
                  Startups
                </div>
                <div className="space-y-1">
                  {startupsDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
                        location.pathname === item.href
                          ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
                  Resources
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {resourcesDropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
                        location.pathname === item.href
                          ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth Section - Mobile */}
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                {currentUser ? (
                  <>
                    <p className="text-white/80 px-4 py-2.5 text-center text-sm">
                      Hello,{" "}
                      {currentUser.displayName ||
                        currentUser.email?.split("@")[0] ||
                        "User"}
                    </p>
                    <Button
                      onClick={signOut} // Use signOut from context
                      className="bg-red-700 hover:bg-red-800 w-full rounded-xl shadow-lg py-3 text-sm font-medium"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center text-sm"
                    >
                      Login
                    </Link>
                    <Link to="/signup" className="block">
                      <Button className="bg-gradient-to-r from-brand-purple to-brand-pink w-full rounded-xl shadow-lg py-3 text-sm font-medium">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Menu, X, ChevronDown, User } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // Import the useAuth hook from App.tsx (CORRECTED: Ensures use of alias)
// import { useAuth } from "@/App";

// const Navbar = () => {
//   const { currentUser, signOut } = useAuth(); // Use the auth context
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileHovered, setIsProfileHovered] = useState(false);
//   const [isStartupsDropdownOpen, setIsStartupsDropdownOpen] = useState(false);
//   const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Hide navbar completely on profile page (only if not logged in, or if you want a different profile view)
//   // For now, let's keep it visible so user can logout from profile page too.
//   // if (location.pathname === "/profile") {
//   //   return null;
//   // }

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Finance", href: "/finance" },
//     { name: "Events", href: "/events" },
//     { name: "Network", href: "/network" },
//     { name: "Marketplace", href: "/marketplace" },
//   ];

//   const startupsDropdownItems = [
//     { name: "Startups", href: "/startups" },
//     { name: "Internships", href: "/internships" },
//   ];

//   const resourcesDropdownItems = [
//     { name: "Blogs", href: "/blogs" },
//     { name: "Scholarships", href: "/scholarships" },
//     { name: "Courses", href: "/courses" },
//     { name: "Course Materials", href: "/course-materials" },
//     { name: "Student Discounts", href: "/student-discounts" },
//     { name: "Startup Schemes", href: "/startup-schemes" },
//   ];

//   const isStartupsActive =
//     location.pathname === "/startups" || location.pathname === "/internships";
//   const isResourcesActive =
//     location.pathname === "/blogs" ||
//     location.pathname === "/scholarships" ||
//     location.pathname === "/courses" ||
//     location.pathname === "/paid-courses" ||
//     location.pathname === "/free-courses" ||
//     location.pathname === "/course-materials" ||
//     location.pathname === "/student-discounts" ||
//     location.pathname === "/startup-schemes";

//   return (
//     <motion.nav
//       className={cn(
//         "fixed w-full top-0 z-50 transition-all duration-500",
//         isScrolled ? "py-1 md:py-2" : "py-2 md:py-4"
//       )}
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       <div className="w-full px-3 sm:px-6 lg:px-8">
//         <motion.div
//           className={cn(
//             "flex items-center justify-between transition-all duration-500 w-full max-w-7xl mx-auto",
//             isScrolled
//               ? "bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl px-3 sm:px-4 md:px-6 py-2 md:py-3 border-t-0 border-x-0 border-b-[2.5px] border-b-[linear-gradient(90deg,rgba(255,255,255,0.85)_0%,rgba(168,85,247,0.7)_50%,rgba(255,255,255,0.85)_100%)]"
//               : "bg-black/15 backdrop-blur-xl px-2 md:px-4 py-2 border-none rounded-2xl sm:rounded-3xl"
//           )}
//           whileHover={{ scale: isScrolled ? 1.01 : 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           {/* Logo - Mobile Optimized */}
//           <motion.div className="flex items-center flex-shrink-0">
//             <Link
//               to="/"
//               className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink whitespace-nowrap"
//             >
//               Guide Bazaar
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
//             {navItems.map((item) => (
//               <motion.div
//                 key={item.name}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to={item.href}
//                   className={cn(
//                     "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
//                     location.pathname === item.href
//                       ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
//                       : "text-white/70 hover:text-white hover:bg-white/10"
//                   )}
//                 >
//                   {item.name}
//                 </Link>
//               </motion.div>
//             ))}

//             {/* Startups Dropdown - open on hover, no arrow */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onMouseEnter={() => isDesktop && setIsStartupsDropdownOpen(true)}
//               onMouseLeave={() => isDesktop && setIsStartupsDropdownOpen(false)}
//             >
//               <DropdownMenu
//                 open={isDesktop ? isStartupsDropdownOpen : undefined}
//                 onOpenChange={setIsStartupsDropdownOpen}
//               >
//                 <DropdownMenuTrigger asChild>
//                   <button
//                     className={cn(
//                       "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1",
//                       isStartupsActive
//                         ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
//                         : "text-white/70 hover:text-white hover:bg-white/10"
//                     )}
//                     tabIndex={0}
//                   >
//                     Startups
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
//                   align="center"
//                 >
//                   {startupsDropdownItems.map((item) => (
//                     <DropdownMenuItem key={item.name} asChild>
//                       <Link
//                         to={item.href}
//                         className={cn(
//                           "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
//                           location.pathname === item.href && "text-brand-purple"
//                         )}
//                       >
//                         {item.name}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </motion.div>

//             {/* Resources Dropdown - open on hover, no arrow */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onMouseEnter={() => isDesktop && setIsResourcesDropdownOpen(true)}
//               onMouseLeave={() =>
//                 isDesktop && setIsResourcesDropdownOpen(false)
//               }
//             >
//               <DropdownMenu
//                 open={isDesktop ? isResourcesDropdownOpen : undefined}
//                 onOpenChange={setIsResourcesDropdownOpen}
//               >
//                 <DropdownMenuTrigger asChild>
//                   <button
//                     className={cn(
//                       "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1",
//                       isResourcesActive
//                         ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
//                         : "text-white/70 hover:text-white hover:bg-white/10"
//                     )}
//                     tabIndex={0}
//                   >
//                     Resources
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
//                   align="center"
//                 >
//                   {resourcesDropdownItems.map((item) => (
//                     <DropdownMenuItem key={item.name} asChild>
//                       <Link
//                         to={item.href}
//                         className={cn(
//                           "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
//                           location.pathname === item.href && "text-brand-purple"
//                         )}
//                       >
//                         {item.name}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </motion.div>
//           </div>

//           {/* User Info / Auth Buttons - Desktop */}
//           <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
//             {currentUser ? (
//               <>
//                 {/* Display username/email */}
//                 <span className="text-white/80 font-medium text-sm whitespace-nowrap">
//                   Hello,{" "}
//                   {currentUser.displayName ||
//                     currentUser.email?.split("@")[0] ||
//                     "User"}
//                 </span>
//                 {/* Logout Button */}
//                 <Button
//                   onClick={signOut}
//                   className="bg-red-700 hover:bg-red-800 rounded-full px-4 xl:px-6 shadow-lg text-sm whitespace-nowrap min-h-[40px]"
//                 >
//                   Logout
//                 </Button>
//                 {/* Optional: Link to profile if you want a dedicated profile page */}
//                 <Link to="/profile">
//                   <motion.div
//                     className="relative"
//                     onHoverStart={() => setIsProfileHovered(true)}
//                     onHoverEnd={() => setIsProfileHovered(false)}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.button
//                       className="rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center relative overflow-hidden border border-white/20 transition-all duration-500"
//                       animate={{
//                         backgroundColor: isProfileHovered
//                           ? "#000000"
//                           : "rgba(255, 255, 255, 0.1)",
//                       }}
//                       transition={{ duration: 0.3 }}
//                       aria-label="Profile"
//                     >
//                       <motion.div
//                         className="absolute inset-0 flex items-center justify-center"
//                         animate={{
//                           opacity: isProfileHovered ? 0 : 1,
//                           rotate: isProfileHovered ? -90 : 0,
//                           scale: isProfileHovered ? 0.8 : 1,
//                         }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                       >
//                         <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
//                       </motion.div>

//                       <motion.div
//                         className="absolute inset-0 flex items-center justify-center"
//                         animate={{
//                           opacity: isProfileHovered ? 1 : 0,
//                           rotate: isProfileHovered ? 0 : 90,
//                           scale: isProfileHovered ? 1 : 0.8,
//                         }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                       >
//                         <X
//                           className="h-4 w-4 sm:h-5 sm:w-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
//                           style={{
//                             filter:
//                               "drop-shadow(0 0 2px rgba(255,255,255,0.5))",
//                             backgroundImage:
//                               "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
//                             WebkitBackgroundClip: "text",
//                             WebkitTextFillColor: "transparent",
//                           }}
//                         />
//                       </motion.div>
//                     </motion.button>
//                   </motion.div>
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/signin"
//                   className="text-white/70 hover:text-white font-medium transition-colors px-3 xl:px-4 py-2 rounded-full hover:bg-white/10 text-sm whitespace-nowrap"
//                 >
//                   Login
//                 </Link>
//                 <Link to="/signup">
//                   <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 rounded-full px-4 xl:px-6 shadow-lg text-sm whitespace-nowrap min-h-[40px]">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button - Better Spacing */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden rounded-full text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 border border-white/20"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <X className="h-4 w-4 sm:h-5 sm:w-5" />
//             ) : (
//               <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
//             )}
//           </Button>
//         </motion.div>
//       </div>

//       {/* Mobile Menu - Completely Redesigned */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             className="lg:hidden mt-2 mx-3 sm:mx-6 z-[55]"
//             initial={{ opacity: 0, y: -20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -20, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="bg-black/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-4 w-full max-w-sm mx-auto">
//               {/* Main Navigation */}
//               <div className="space-y-2">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className={cn(
//                       "block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-center text-sm",
//                       location.pathname === item.href
//                         ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
//                         : "text-white/80 hover:text-white hover:bg-white/10"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>

//               {/* Startups Section */}
//               <div className="mt-4 pt-3 border-t border-white/10">
//                 <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
//                   Startups
//                 </div>
//                 <div className="space-y-1">
//                   {startupsDropdownItems.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={cn(
//                         "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
//                         location.pathname === item.href
//                           ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
//                           : "text-white/70 hover:text-white hover:bg-white/10"
//                       )}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Resources Section */}
//               <div className="mt-4 pt-3 border-t border-white/10">
//                 <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
//                   Resources
//                 </div>
//                 <div className="space-y-1 max-h-48 overflow-y-auto">
//                   {resourcesDropdownItems.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={cn(
//                         "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
//                         location.pathname === item.href
//                           ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
//                           : "text-white/70 hover:text-white hover:bg-white/10"
//                       )}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Auth Section - Mobile */}
//               <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
//                 {currentUser ? (
//                   <>
//                     <p className="text-white/80 px-4 py-2.5 text-center text-sm">
//                       Hello,{" "}
//                       {currentUser.displayName ||
//                         currentUser.email?.split("@")[0] ||
//                         "User"}
//                     </p>
//                     <Button
//                       onClick={signOut}
//                       className="bg-red-700 hover:bg-red-800 w-full rounded-xl shadow-lg py-3 text-sm font-medium"
//                     >
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/signin"
//                       className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center text-sm"
//                     >
//                       Login
//                     </Link>
//                     <Link to="/signup" className="block">
//                       <Button className="bg-gradient-to-r from-brand-purple to-brand-pink w-full rounded-xl shadow-lg py-3 text-sm font-medium">
//                         Sign Up
//                       </Button>
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;

// // import { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { Menu, X, ChevronDown, User } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";

// // const Navbar = () => {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isProfileHovered, setIsProfileHovered] = useState(false);
// //   const [isStartupsDropdownOpen, setIsStartupsDropdownOpen] = useState(false);
// //   const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
// //   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // Hide navbar completely on profile page
// //   if (location.pathname === "/profile") {
// //     return null;
// //   }

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 10);
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     setIsMobileMenuOpen(false);
// //   }, [location.pathname]);

// //   useEffect(() => {
// //     const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const navItems = [
// //     { name: "Home", href: "/" },
// //     { name: "Finance", href: "/finance" },
// //     { name: "Events", href: "/events" },
// //     { name: "Network", href: "/network" },
// //     { name: "Marketplace", href: "/marketplace" },
// //   ];

// //   const startupsDropdownItems = [
// //     { name: "Startups", href: "/startups" },
// //     { name: "Internships", href: "/internships" },
// //   ];

// //   const resourcesDropdownItems = [
// //     { name: "Blogs", href: "/blogs" },
// //     { name: "Scholarships", href: "/scholarships" },
// //     { name: "Courses", href: "/courses" },
// //     { name: "Course Materials", href: "/course-materials" },
// //     { name: "Student Discounts", href: "/student-discounts" },
// //     { name: "Startup Schemes", href: "/startup-schemes" },
// //   ];

// //   const isStartupsActive = location.pathname === "/startups" || location.pathname === "/internships";
// //   const isResourcesActive = location.pathname === "/blogs" || location.pathname === "/scholarships" || location.pathname === "/courses" || location.pathname === "/paid-courses" || location.pathname === "/free-courses" || location.pathname === "/course-materials" || location.pathname === "/student-discounts" || location.pathname === "/startup-schemes";

// //   return (
// //     <motion.nav
// //       className={cn(
// //         "fixed w-full top-0 z-50 transition-all duration-500",
// //         isScrolled ? "py-1 md:py-2" : "py-2 md:py-4"
// //       )}
// //       initial={{ y: -100, opacity: 0 }}
// //       animate={{ y: 0, opacity: 1 }}
// //       transition={{ duration: 0.6, ease: "easeOut" }}
// //     >
// //       <div className="w-full px-3 sm:px-6 lg:px-8">
// //         <motion.div
// //           className={cn(
// //             "flex items-center justify-between transition-all duration-500 w-full max-w-7xl mx-auto",
// //             isScrolled
// //               ? "bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl px-3 sm:px-4 md:px-6 py-2 md:py-3 border-t-0 border-x-0 border-b-[2.5px] border-b-[linear-gradient(90deg,rgba(255,255,255,0.85)_0%,rgba(168,85,247,0.7)_50%,rgba(255,255,255,0.85)_100%)]"
// //               : "bg-black/15 backdrop-blur-xl px-2 md:px-4 py-2 border-none rounded-2xl sm:rounded-3xl"
// //           )}
// //           whileHover={{ scale: isScrolled ? 1.01 : 1 }}
// //           transition={{ duration: 0.3 }}
// //         >
// //           {/* Logo - Mobile Optimized */}
// //           <motion.div className="flex items-center flex-shrink-0">
// //             <Link to="/" className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink whitespace-nowrap">
// //               Guide Bazaar
// //             </Link>
// //           </motion.div>

// //           {/* Desktop Navigation */}
// //           <div className="hidden lg:flex items-center space-x-1 flex-shrink-0">
// //             {navItems.map((item) => (
// //               <motion.div
// //                 key={item.name}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 <Link
// //                   to={item.href}
// //                   className={cn(
// //                     "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
// //                     location.pathname === item.href
// //                       ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
// //                       : "text-white/70 hover:text-white hover:bg-white/10"
// //                   )}
// //                 >
// //                   {item.name}
// //                 </Link>
// //               </motion.div>
// //             ))}

// //             {/* Startups Dropdown - open on hover, no arrow */}
// //             <motion.div
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               onMouseEnter={() => isDesktop && setIsStartupsDropdownOpen(true)}
// //               onMouseLeave={() => isDesktop && setIsStartupsDropdownOpen(false)}
// //             >
// //               <DropdownMenu open={isDesktop ? isStartupsDropdownOpen : undefined} onOpenChange={setIsStartupsDropdownOpen}>
// //                 <DropdownMenuTrigger asChild>
// //                   <button
// //                     className={cn(
// //                       "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1",
// //                       isStartupsActive
// //                         ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
// //                         : "text-white/70 hover:text-white hover:bg-white/10"
// //                     )}
// //                     tabIndex={0} // KEY: so it can be focused
// //                   >
// //                     Startups
// //                   </button>
// //                 </DropdownMenuTrigger>
// //                 <DropdownMenuContent
// //                   className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
// //                   align="center"
// //                 >
// //                   {startupsDropdownItems.map((item) => (
// //                     <DropdownMenuItem key={item.name} asChild>
// //                       <Link
// //                         to={item.href}
// //                         className={cn(
// //                           "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
// //                           location.pathname === item.href && "text-brand-purple"
// //                         )}
// //                       >
// //                         {item.name}
// //                       </Link>
// //                     </DropdownMenuItem>
// //                   ))}
// //                 </DropdownMenuContent>
// //               </DropdownMenu>
// //             </motion.div>

// //             {/* Resources Dropdown - open on hover, no arrow */}
// //             <motion.div
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               onMouseEnter={() => isDesktop && setIsResourcesDropdownOpen(true)}
// //               onMouseLeave={() => isDesktop && setIsResourcesDropdownOpen(false)}
// //             >
// //               <DropdownMenu open={isDesktop ? isResourcesDropdownOpen : undefined} onOpenChange={setIsResourcesDropdownOpen}>
// //                 <DropdownMenuTrigger asChild>
// //                   <button
// //                     className={cn(
// //                       "relative px-2 xl:px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center gap-1",
// //                       isResourcesActive
// //                         ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
// //                         : "text-white/70 hover:text-white hover:bg-white/10"
// //                     )}
// //                     tabIndex={0}
// //                   >
// //                     Resources
// //                   </button>
// //                 </DropdownMenuTrigger>
// //                 <DropdownMenuContent
// //                   className="bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl z-[60] rounded-2xl"
// //                   align="center"
// //                 >
// //                   {resourcesDropdownItems.map((item) => (
// //                     <DropdownMenuItem key={item.name} asChild>
// //                       <Link
// //                         to={item.href}
// //                         className={cn(
// //                           "text-white/70 hover:text-white focus:text-white cursor-pointer px-3 py-2 rounded-xl",
// //                           location.pathname === item.href && "text-brand-purple"
// //                         )}
// //                       >
// //                         {item.name}
// //                       </Link>
// //                     </DropdownMenuItem>
// //                   ))}
// //                 </DropdownMenuContent>
// //               </DropdownMenu>
// //             </motion.div>
// //           </div>

// //           {/* Mobile Right Section - Optimized Layout */}
// //           <div className="flex items-center space-x-2 flex-shrink-0">
// //             {/* Desktop Auth Buttons */}
// //             <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
// //               <Link
// //                 to="/login"
// //                 className="text-white/70 hover:text-white font-medium transition-colors px-3 xl:px-4 py-2 rounded-full hover:bg-white/10 text-sm whitespace-nowrap"
// //               >
// //                 Login
// //               </Link>
// //               <Link to="/signup">
// //                 <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 rounded-full px-4 xl:px-6 shadow-lg text-sm whitespace-nowrap min-h-[40px]">
// //                   Sign Up
// //                 </Button>
// //               </Link>
// //             </div>

// //             {/* Profile Button - Mobile Optimized */}
// //             <Link to="/profile">
// //               <motion.div
// //                 className="relative"
// //                 onHoverStart={() => setIsProfileHovered(true)}
// //                 onHoverEnd={() => setIsProfileHovered(false)}
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //               >
// //                 <motion.button
// //                   className="rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center relative overflow-hidden border border-white/20 transition-all duration-500"
// //                   animate={{
// //                     backgroundColor: isProfileHovered ? "#000000" : "rgba(255, 255, 255, 0.1)"
// //                   }}
// //                   transition={{ duration: 0.3 }}
// //                   aria-label="Profile"
// //                 >
// //                   <motion.div
// //                     className="absolute inset-0 flex items-center justify-center"
// //                     animate={{
// //                       opacity: isProfileHovered ? 0 : 1,
// //                       rotate: isProfileHovered ? -90 : 0,
// //                       scale: isProfileHovered ? 0.8 : 1
// //                     }}
// //                     transition={{ duration: 0.3, ease: "easeInOut" }}
// //                   >
// //                     <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
// //                   </motion.div>

// //                   <motion.div
// //                     className="absolute inset-0 flex items-center justify-center"
// //                     animate={{
// //                       opacity: isProfileHovered ? 1 : 0,
// //                       rotate: isProfileHovered ? 0 : 90,
// //                       scale: isProfileHovered ? 1 : 0.8
// //                     }}
// //                     transition={{ duration: 0.3, ease: "easeInOut" }}
// //                   >
// //                     <X className="h-4 w-4 sm:h-5 sm:w-5 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
// //                       style={{
// //                         filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5))',
// //                         backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
// //                         WebkitBackgroundClip: 'text',
// //                         WebkitTextFillColor: 'transparent'
// //                       }} />
// //                   </motion.div>
// //                 </motion.button>
// //               </motion.div>
// //             </Link>

// //             {/* Mobile Menu Button - Better Spacing */}
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               className="lg:hidden rounded-full text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 border border-white/20"
// //               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             >
// //               {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
// //             </Button>
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Mobile Menu - Completely Redesigned */}
// //       <AnimatePresence>
// //         {isMobileMenuOpen && (
// //           <motion.div
// //             className="lg:hidden mt-2 mx-3 sm:mx-6 z-[55]"
// //             initial={{ opacity: 0, y: -20, scale: 0.95 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: -20, scale: 0.95 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <div className="bg-black/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-4 w-full max-w-sm mx-auto">
// //               {/* Main Navigation */}
// //               <div className="space-y-2">
// //                 {navItems.map((item) => (
// //                   <Link
// //                     key={item.name}
// //                     to={item.href}
// //                     className={cn(
// //                       "block px-4 py-3 rounded-xl font-medium transition-all duration-300 text-center text-sm",
// //                       location.pathname === item.href
// //                         ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
// //                         : "text-white/80 hover:text-white hover:bg-white/10"
// //                     )}
// //                   >
// //                     {item.name}
// //                   </Link>
// //                 ))}
// //               </div>

// //               {/* Startups Section */}
// //               <div className="mt-4 pt-3 border-t border-white/10">
// //                 <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
// //                   Startups
// //                 </div>
// //                 <div className="space-y-1">
// //                   {startupsDropdownItems.map((item) => (
// //                     <Link
// //                       key={item.name}
// //                       to={item.href}
// //                       className={cn(
// //                         "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
// //                         location.pathname === item.href
// //                           ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
// //                           : "text-white/70 hover:text-white hover:bg-white/10"
// //                       )}
// //                     >
// //                       {item.name}
// //                     </Link>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Resources Section */}
// //               <div className="mt-4 pt-3 border-t border-white/10">
// //                 <div className="text-white/60 text-xs font-medium px-2 py-1 mb-2 uppercase tracking-wider">
// //                   Resources
// //                 </div>
// //                 <div className="space-y-1 max-h-48 overflow-y-auto">
// //                   {resourcesDropdownItems.map((item) => (
// //                     <Link
// //                       key={item.name}
// //                       to={item.href}
// //                       className={cn(
// //                         "block px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
// //                         location.pathname === item.href
// //                           ? "text-white bg-gradient-to-r from-brand-purple to-brand-pink shadow-lg"
// //                           : "text-white/70 hover:text-white hover:bg-white/10"
// //                       )}
// //                     >
// //                       {item.name}
// //                     </Link>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Auth Section */}
// //               <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
// //                 <Link
// //                   to="/login"
// //                   className="block px-4 py-3 text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center text-sm"
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link to="/signup" className="block">
// //                   <Button className="bg-gradient-to-r from-brand-purple to-brand-pink w-full rounded-xl shadow-lg py-3 text-sm font-medium">
// //                     Sign Up
// //                   </Button>
// //                 </Link>
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </motion.nav>
// //   );
// // };

// // export default Navbar;
