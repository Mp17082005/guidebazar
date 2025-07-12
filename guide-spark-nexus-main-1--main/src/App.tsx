// // import React, { useState, useEffect } from "react";
// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import {
// //   BrowserRouter,
// //   Routes,
// //   Route,
// //   Navigate,
// //   useLocation,
// // } from "react-router-dom";
// // import useScrollToTop from "@/hooks/useScrollToTop";
// // import Index from "./pages/Index";
// // import Finance from "./pages/Finance";
// // import Events from "./pages/Events";
// // import Startups from "./pages/Startups";
// // import Marketplace from "./pages/Marketplace";
// // import Internships from "./pages/Internships";
// // import Blogs from "./pages/Blogs";
// // import Scholarships from "./pages/Scholarships";
// // import Courses from "./pages/Courses";
// // import PaidCourses from "./pages/PaidCourses";
// // import FreeCourses from "./pages/FreeCourses";
// // import CourseMaterials from "./pages/CourseMaterials";
// // import StartupSchemes from "./pages/StartupSchemes";
// // import SignIn from "./pages/SignIn";
// // import SignUp from "./pages/SignUp";
// // import Profile from "./pages/Profile";
// // import Network from "./pages/Network";
// // import NotFound from "./pages/NotFound";
// // import YouTubeShorts from "./pages/YouTubeShorts";
// // import Podcasts from "./pages/Podcasts";
// // import StudentDiscounts from "./pages/StudentDiscounts";
// // import AIBotFab from "@/components/ui/AIBotFab";
// // import Navbar from "@/components/Navbar"; // Make sure Navbar is imported here for MainLayout

// // // IMPORTANT: Ensure this import is correct and present
// // import { AuthContextProvider, useAuth } from "@/context/AuthContext";
// // import AdminDashboard from "./pages/AdminDashboard"; // Adjust path as needed

// // const queryClient = new QueryClient();

// // const LoadingScreen: React.FC = () => (
// //   <div className="flex items-center justify-center min-h-screen bg-black text-white text-2xl">
// //     Loading authentication...
// //   </div>
// // );

// // // MainLayout will wrap common components like Navbar and Footer for non-admin pages
// // const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   useScrollToTop();
// //   console.log("MainLayout: Rendering children.");
// //   return (
// //     <>
// //       <Navbar />
// //       {children}
// //       <AIBotFab />
// //     </>
// //   );
// // };

// // const RoleBasedRouter: React.FC = () => {
// //   const { currentUser, loading } = useAuth();
// //   const location = useLocation();

// //   console.log(
// //     `RoleBasedRouter: Rendering. currentUser: ${
// //       currentUser?.uid ? "Object" : "null"
// //     } loading: ${loading} pathname: ${location.pathname}`
// //   );

// //   // useEffect for redirection logic
// //   useEffect(() => {
// //     if (!loading) {
// //       console.log(
// //         `RoleBasedRouter useEffect: Auth state determined. currentUser.role: ${currentUser?.role} Current path: ${location.pathname}`
// //       );

// //       // If user is not logged in and tries to access a protected route, redirect to signin
// //       const protectedPaths = [
// //         "/profile",
// //         "/network",
// //         "/admin",
// //         "/admin/*", // Add other protected paths if any
// //       ];
// //       const isAdminPath = location.pathname.startsWith("/admin");
// //       const isProtectedPath = protectedPaths.some((path) =>
// //         path.endsWith("/*")
// //           ? location.pathname.startsWith(path.slice(0, -1))
// //           : location.pathname === path
// //       );

// //       if (!currentUser && isProtectedPath) {
// //         if (location.pathname !== "/login" && location.pathname !== "/signup") {
// //           console.log(
// //             "RoleBasedRouter useEffect: No current user and on protected path, redirecting to /login"
// //           );
// //           // Use window.location.replace for full page reload to clear state and prevent history issues
// //           window.location.replace("/login");
// //         }
// //       } else if (currentUser) {
// //         if (currentUser.role === "admin") {
// //           // If admin is on a non-admin path (and not login/signup), redirect to admin dashboard
// //           if (
// //             !isAdminPath &&
// //             location.pathname !== "/login" &&
// //             location.pathname !== "/signup"
// //           ) {
// //             console.log(
// //               "RoleBasedRouter useEffect: Redirecting admin to /admin"
// //             );
// //             // Use Navigate component for React Router redirects, or window.location.replace if a hard refresh is desired
// //             // For a smooth SPA experience, use Navigate
// //             window.location.replace("/admin");
// //           }
// //         } else if (currentUser.role === "user") {
// //           // If user is on an admin path, redirect to home
// //           if (isAdminPath) {
// //             console.log("RoleBasedRouter useEffect: Redirecting user to /");
// //             window.location.replace("/");
// //           }
// //           // If user is on login/signup, redirect to home
// //           else if (
// //             location.pathname === "/login" ||
// //             location.pathname === "/signup"
// //           ) {
// //             console.log("RoleBasedRouter useEffect: Redirecting user to /");
// //             window.location.replace("/");
// //           }
// //         }
// //       }
// //     }
// //   }, [currentUser, loading, location.pathname]);

// //   if (loading) {
// //     console.log(
// //       "RoleBasedRouter: Auth loading is true, showing loading screen."
// //     );
// //     return <LoadingScreen />;
// //   }

// //   // --- Render based on user role ---
// //   if (currentUser) {
// //     console.log(
// //       `RoleBasedRouter: currentUser.uid: ${currentUser.uid} currentUser.role: ${currentUser.role}`
// //     );
// //     console.log(
// //       "RoleBasedRouter: Current user exists, rendering role-based routes. Role: ",
// //       currentUser.role
// //     );

// //     if (currentUser.role === "admin") {
// //       return (
// //         <Routes>
// //           <Route path="/admin/*" element={<AdminDashboard />} />
// //           {/* Redirect any other path to admin dashboard if logged in as admin */}
// //           <Route path="*" element={<Navigate to="/admin" replace />} />
// //         </Routes>
// //       );
// //     } else {
// //       // currentUser.role === 'user'
// //       return (
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={
// //               <MainLayout>
// //                 <Index />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/finance"
// //             element={
// //               <MainLayout>
// //                 <Finance />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/events"
// //             element={
// //               <MainLayout>
// //                 <Events />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/startups"
// //             element={
// //               <MainLayout>
// //                 <Startups />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/marketplace"
// //             element={
// //               <MainLayout>
// //                 <Marketplace />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/internships"
// //             element={
// //               <MainLayout>
// //                 <Internships />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/blogs"
// //             element={
// //               <MainLayout>
// //                 <Blogs />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/scholarships"
// //             element={
// //               <MainLayout>
// //                 <Scholarships />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/courses"
// //             element={
// //               <MainLayout>
// //                 <Courses />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/paid-courses"
// //             element={
// //               <MainLayout>
// //                 <PaidCourses />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/free-courses"
// //             element={
// //               <MainLayout>
// //                 <FreeCourses />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/course-materials"
// //             element={
// //               <MainLayout>
// //                 <CourseMaterials />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/startup-schemes"
// //             element={
// //               <MainLayout>
// //                 <StartupSchemes />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/profile"
// //             element={
// //               <MainLayout>
// //                 <Profile />
// //               </MainLayout>
// //             }
// //           />{" "}
// //           {/* Profile might not need MainLayout for full control */}
// //           <Route
// //             path="/network"
// //             element={
// //               <MainLayout>
// //                 <Network />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/youtube-shorts"
// //             element={
// //               <MainLayout>
// //                 <YouTubeShorts />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/podcasts"
// //             element={
// //               <MainLayout>
// //                 <Podcasts />
// //               </MainLayout>
// //             }
// //           />
// //           <Route
// //             path="/student-discounts"
// //             element={
// //               <MainLayout>
// //                 <StudentDiscounts />
// //               </MainLayout>
// //             }
// //           />
// //           {/* Catch-all for non-existent routes */}
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       );
// //     }
// //   } else {
// //     console.log("RoleBasedRouter: No current user, rendering public routes.");
// //     return (
// //       <Routes>
// //         <Route
// //           path="/"
// //           element={
// //             <MainLayout>
// //               <Index />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/finance"
// //           element={
// //             <MainLayout>
// //               <Finance />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/events"
// //           element={
// //             <MainLayout>
// //               <Events />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/startups"
// //           element={
// //             <MainLayout>
// //               <Startups />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/marketplace"
// //           element={
// //             <MainLayout>
// //               <Marketplace />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/internships"
// //           element={
// //             <MainLayout>
// //               <Internships />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/blogs"
// //           element={
// //             <MainLayout>
// //               <Blogs />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/scholarships"
// //           element={
// //             <MainLayout>
// //               <Scholarships />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/courses"
// //           element={
// //             <MainLayout>
// //               <Courses />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/paid-courses"
// //           element={
// //             <MainLayout>
// //               <PaidCourses />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/free-courses"
// //           element={
// //             <MainLayout>
// //               <FreeCourses />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/course-materials"
// //           element={
// //             <MainLayout>
// //               <CourseMaterials />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/startup-schemes"
// //           element={
// //             <MainLayout>
// //               <StartupSchemes />
// //             </MainLayout>
// //           }
// //         />
// //         <Route path="/login" element={<SignIn />} />
// //         <Route path="/signup" element={<SignUp />} />
// //         <Route
// //           path="/youtube-shorts"
// //           element={
// //             <MainLayout>
// //               <YouTubeShorts />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/podcasts"
// //           element={
// //             <MainLayout>
// //               <Podcasts />
// //             </MainLayout>
// //           }
// //         />
// //         <Route
// //           path="/student-discounts"
// //           element={
// //             <MainLayout>
// //               <StudentDiscounts />
// //             </MainLayout>
// //           }
// //         />
// //         {/* If no current user, direct access to /profile, /network, /admin should lead to NotFound or redirect to login */}
// //         <Route path="/profile" element={<Navigate to="/login" replace />} />
// //         <Route path="/network" element={<Navigate to="/login" replace />} />
// //         <Route path="/admin/*" element={<Navigate to="/login" replace />} />
// //         <Route path="*" element={<NotFound />} />
// //       </Routes>
// //     );
// //   }
// // };

// // const App: React.FC = () => {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <TooltipProvider>
// //         <Toaster />
// //         <Sonner />
// //         <BrowserRouter>
// //           {/* IMPORTANT: AuthContextProvider must wrap components that use useAuth */}
// //           <AuthContextProvider>
// //             <RoleBasedRouter />
// //           </AuthContextProvider>
// //         </BrowserRouter>
// //       </TooltipProvider>
// //     </QueryClientProvider>
// //   );
// // };

// // export default App;

// // // import React, { useEffect, useState, createContext, useContext } from "react";
// // // import { Toaster } from "@/components/ui/toaster";
// // // import { Toaster as Sonner } from "@/components/ui/sonner";
// // // import { TooltipProvider } from "@/components/ui/tooltip";
// // // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // // import {
// // //   BrowserRouter,
// // //   Routes,
// // //   Route,
// // //   Navigate,
// // //   useNavigate,
// // // } from "react-router-dom";
// // // import useScrollToTop from "@/hooks/useScrollToTop";

// // // // Import your pages
// // // import Index from "./pages/Index"; // This will be the main content for regular users
// // // import Finance from "./pages/Finance";
// // // import Events from "./pages/Events";
// // // import Startups from "./pages/Startups";
// // // import Marketplace from "./pages/Marketplace";
// // // import Internships from "./pages/Internships";
// // // import Blogs from "./pages/Blogs";
// // // import Scholarships from "./pages/Scholarships";
// // // import Courses from "./pages/Courses";
// // // import PaidCourses from "./pages/PaidCourses";
// // // import FreeCourses from "./pages/FreeCourses";
// // // import CourseMaterials from "./pages/CourseMaterials";
// // // import StartupSchemes from "./pages/StartupSchemes";
// // // import SignIn from "./pages/SignIn";
// // // import SignUp from "./pages/SignUp";
// // // import Profile from "./pages/Profile";
// // // import Network from "./pages/Network";
// // // import NotFound from "./pages/NotFound";
// // // import YouTubeShorts from "./pages/YouTubeShorts";
// // // import Podcasts from "./pages/Podcasts";
// // // import StudentDiscounts from "./pages/StudentDiscounts";
// // // import AIBotFab from "@/components/ui/AIBotFab";

// // // // Import auth utilities and AuthUser type (CORRECTED: Ensures use of alias)
// // // import { onAuthChange, signOutUser, AuthUser } from "@/utils/auth"; // <--- THIS IS THE LINE IN QUESTION

// // // const queryClient = new QueryClient();

// // // // --- NEW: User Context for global access to auth state ---
// // // interface AuthContextType {
// // //   currentUser: AuthUser | null;
// // //   loadingAuth: boolean;
// // //   signOut: () => Promise<void>;
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (!context) {
// // //     throw new Error("useAuth must be used within an AuthProvider");
// // //   }
// // //   return context;
// // // };

// // // // --- NEW: AuthProvider to manage auth state and provide to children ---
// // // const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
// // //   children,
// // // }) => {
// // //   const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
// // //   const [loadingAuth, setLoadingAuth] = useState(true);

// // //   useEffect(() => {
// // //     console.log("AuthProvider: Setting up auth state listener.");
// // //     const unsubscribe = onAuthChange((user) => {
// // //       setCurrentUser(user);
// // //       setLoadingAuth(false);
// // //       console.log(
// // //         "AuthProvider: Auth state changed. User:",
// // //         user ? user.email + " (Role: " + user.role + ")" : "none"
// // //       );
// // //     });

// // //     return () => {
// // //       console.log("AuthProvider: Cleaning up auth state listener.");
// // //       unsubscribe();
// // //     };
// // //   }, []);

// // //   const handleSignOut = async () => {
// // //     try {
// // //       await signOutUser();
// // //     } catch (error) {
// // //       console.error("Failed to sign out:", error);
// // //       alert("Failed to sign out. Please try again."); // Consider a custom modal for better UX
// // //     }
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{ currentUser, loadingAuth, signOut: handleSignOut }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // // --- NEW: ProtectedRoute component ---
// // // const ProtectedRoute: React.FC<{
// // //   children: React.ReactNode;
// // //   requiredRole?: "user" | "admin";
// // // }> = ({ children, requiredRole }) => {
// // //   const { currentUser, loadingAuth } = useAuth();
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     if (!loadingAuth) {
// // //       if (!currentUser) {
// // //         // Not authenticated, redirect to signin
// // //         navigate("/signin", { replace: true });
// // //       } else if (requiredRole && currentUser.role !== requiredRole) {
// // //         // Authenticated but wrong role, redirect to home or forbidden page
// // //         navigate("/", { replace: true }); // Redirect to home for unauthorized roles
// // //       }
// // //     }
// // //   }, [currentUser, loadingAuth, requiredRole, navigate]);

// // //   if (loadingAuth) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
// // //         <p className="text-lg">Loading authentication state...</p>
// // //       </div>
// // //     );
// // //   }

// // //   // Only render children if authenticated and has correct role (or no role required)
// // //   if (currentUser && (!requiredRole || currentUser.role === requiredRole)) {
// // //     return <>{children}</>;
// // //   }

// // //   return null; // Will be redirected by useEffect
// // // };

// // // // --- NEW: Admin Dashboard Component Placeholder ---
// // // const AdminDashboard: React.FC = () => {
// // //   const { currentUser, signOut } = useAuth();
// // //   return (
// // //     <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8">
// // //       <h1 className="text-4xl font-extrabold text-red-500 mb-4">
// // //         Admin Dashboard
// // //       </h1>
// // //       <p className="text-lg text-gray-300 mb-8">
// // //         Welcome, {currentUser?.displayName || currentUser?.email || "Admin"}!
// // //       </p>
// // //       <p className="text-md text-gray-400 mb-8">
// // //         This is where admin-specific content and tools would go.
// // //       </p>
// // //       <button onClick={signOut} className="px-6 py-3 bg-red-700 text-white rounded-md shadow-md hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
// // //         Sign Out
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // // --- NEW: User Dashboard Component (Wraps your existing Index page) ---
// // // const UserDashboard: React.FC = () => {
// // //   // Index page already has Navbar and Footer, so we don't need them here.
// // //   return <Index />;
// // // };

// // // const AppContent: React.FC = () => {
// // //   useScrollToTop();
// // //   // No need to access currentUser/signOut directly here, as AuthProvider handles it
// // //   // and ProtectedRoute ensures authentication for child routes.

// // //   return (
// // //     <Routes>
// // //       {/* Public Routes */}
// // //       <Route path="/signin" element={<SignIn />} />
// // //       <Route path="/signup" element={<SignUp />} />

// // //       {/* Protected User Dashboard (main content) */}
// // //       <Route
// // //         path="/"
// // //         element={
// // //           <ProtectedRoute requiredRole="user">
// // //             <UserDashboard />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/home"
// // //         element={
// // //           <ProtectedRoute requiredRole="user">
// // //             <UserDashboard />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       {/* Protected Admin Dashboard */}
// // //       <Route
// // //         path="/admin"
// // //         element={
// // //           <ProtectedRoute requiredRole="admin">
// // //             <AdminDashboard />
// // //           </ProtectedRoute>
// // //         }
// // //       />

// // //       {/* Other Protected Routes that use the main layout */}
// // //       {/* These routes will also be protected and will render within the context of the main app */}
// // //       <Route
// // //         path="/finance"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Finance />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/events"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Events />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/startups"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Startups />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/marketplace"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Marketplace />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/internships"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Internships />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/blogs"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Blogs />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/scholarships"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Scholarships />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/courses"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Courses />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/paid-courses"
// // //         element={
// // //           <ProtectedRoute>
// // //             <PaidCourses />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/free-courses"
// // //         element={
// // //           <ProtectedRoute>
// // //             <FreeCourses />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/course-materials"
// // //         element={
// // //           <ProtectedRoute>
// // //             <CourseMaterials />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/startup-schemes"
// // //         element={
// // //           <ProtectedRoute>
// // //             <StartupSchemes />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/profile"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Profile />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/network"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Network />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/youtube-shorts"
// // //         element={
// // //           <ProtectedRoute>
// // //             <YouTubeShorts />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/podcasts"
// // //         element={
// // //           <ProtectedRoute>
// // //             <Podcasts />
// // //           </ProtectedRoute>
// // //         }
// // //       />
// // //       <Route
// // //         path="/student-discounts"
// // //         element={
// // //           <ProtectedRoute>
// // //             <StudentDiscounts />
// // //           </ProtectedRoute>
// // //         }
// // //       />

// // //       {/* Catch-all route for 404 - should ideally be outside ProtectedRoute if you want unauth users to see 404 */}
// // //       <Route path="*" element={<NotFound />} />
// // //     </Routes>
// // //   );
// // // };

// // // const App: React.FC = () => {
// // //   return (
// // //     <QueryClientProvider client={queryClient}>
// // //       <TooltipProvider>
// // //         <Toaster />
// // //         <Sonner />
// // //         <BrowserRouter>
// // //           <AuthProvider>
// // //             {" "}
// // //             {/* Wrap AppContent with AuthProvider */}
// // //             <AppContent />
// // //           </AuthProvider>
// // //         </BrowserRouter>
// // //         <AIBotFab />
// // //       </TooltipProvider>
// // //     </QueryClientProvider>
// // //   );
// // // };

// // // export default App;

// // // // import React from "react";
// // // // import { Toaster } from "@/components/ui/toaster";
// // // // import { Toaster as Sonner } from "@/components/ui/sonner";
// // // // import { TooltipProvider } from "@/components/ui/tooltip";
// // // // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // // // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // // // import useScrollToTop from "@/hooks/useScrollToTop";
// // // // import Index from "./pages/Index";
// // // // import Finance from "./pages/Finance";
// // // // import Events from "./pages/Events";
// // // // import Startups from "./pages/Startups";
// // // // import Marketplace from "./pages/Marketplace";
// // // // import Internships from "./pages/Internships";
// // // // import Blogs from "./pages/Blogs";
// // // // import Scholarships from "./pages/Scholarships";
// // // // import Courses from "./pages/Courses";
// // // // import PaidCourses from "./pages/PaidCourses";
// // // // import FreeCourses from "./pages/FreeCourses";
// // // // import CourseMaterials from "./pages/CourseMaterials";
// // // // import StartupSchemes from "./pages/StartupSchemes";
// // // // import SignIn from "./pages/SignIn";
// // // // import SignUp from "./pages/SignUp";
// // // // import Profile from "./pages/Profile";
// // // // import Network from "./pages/Network";
// // // // import NotFound from "./pages/NotFound";
// // // // import YouTubeShorts from "./pages/YouTubeShorts";
// // // // import Podcasts from "./pages/Podcasts";
// // // // import StudentDiscounts from "./pages/StudentDiscounts";
// // // // import AIBotFab from "@/components/ui/AIBotFab";

// // // // const queryClient = new QueryClient();

// // // // const AppContent: React.FC = () => {
// // // //   useScrollToTop();

// // // //   return (
// // // //     <Routes>
// // // //       <Route path="/" element={<Index />} />
// // // //       <Route path="/home" element={<Index />} />
// // // //       <Route path="/finance" element={<Finance />} />
// // // //       <Route path="/events" element={<Events />} />
// // // //       <Route path="/startups" element={<Startups />} />
// // // //       <Route path="/marketplace" element={<Marketplace />} />
// // // //       <Route path="/internships" element={<Internships />} />
// // // //       <Route path="/blogs" element={<Blogs />} />
// // // //       <Route path="/scholarships" element={<Scholarships />} />
// // // //       <Route path="/courses" element={<Courses />} />
// // // //       <Route path="/paid-courses" element={<PaidCourses />} />
// // // //       <Route path="/free-courses" element={<FreeCourses />} />
// // // //       <Route path="/course-materials" element={<CourseMaterials />} />
// // // //       <Route path="/startup-schemes" element={<StartupSchemes />} />
// // // //       <Route path="/login" element={<SignIn />} />
// // // //       <Route path="/signup" element={<SignUp />} />
// // // //       <Route path="/profile" element={<Profile />} />
// // // //       <Route path="/network" element={<Network />} />
// // // //       <Route path="/youtube-shorts" element={<YouTubeShorts />} />
// // // //       <Route path="/podcasts" element={<Podcasts />} />
// // // //       <Route path="/student-discounts" element={<StudentDiscounts />} />
// // // //       {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
// // // //       <Route path="*" element={<NotFound />} />
// // // //     </Routes>
// // // //   );
// // // // };

// // // // const App: React.FC = () => {
// // // //   return (
// // // //     <QueryClientProvider client={queryClient}>
// // // //       <TooltipProvider>
// // // //         <Toaster />
// // // //         <Sonner />
// // // //         <BrowserRouter>
// // // //           <AppContent />
// // // //         </BrowserRouter>
// // // //         <AIBotFab />
// // // //       </TooltipProvider>
// // // //     </QueryClientProvider>
// // // //   );
// // // // };




// import React, { useEffect, useState } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useLocation,
//   Outlet,
// } from "react-router-dom"; // Import Outlet
// import useScrollToTop from "@/hooks/useScrollToTop";

// // Import your pages
// import Index from "./pages/Index";
// import Finance from "./pages/Finance";
// import Events from "./pages/Events";
// import Startups from "./pages/Startups";
// import Marketplace from "./pages/Marketplace";
// import Internships from "./pages/Internships";
// import Blogs from "./pages/Blogs";
// import Scholarships from "./pages/Scholarships";
// import Courses from "./pages/Courses";
// import PaidCourses from "./pages/PaidCourses";
// import FreeCourses from "./pages/FreeCourses";
// import CourseMaterials from "./pages/CourseMaterials";
// import StartupSchemes from "./pages/StartupSchemes";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Profile from "./pages/Profile";
// import Network from "./pages/Network";
// import NotFound from "./pages/NotFound";
// import YouTubeShorts from "./pages/YouTubeShorts";
// import Podcasts from "./pages/Podcasts";
// import StudentDiscounts from "./pages/StudentDiscounts";
// import Community from "./pages/Community"; // Ensure Community is imported
// import AIBotFab from "@/components/ui/AIBotFab";
// import Navbar from "@/components/Navbar"; // Ensure Navbar is imported
// import Footer from "@/components/Footer"; // Ensure Footer is imported

// // IMPORTANT: Import AuthProvider and useAuth from the centralized context file
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import AdminDashboard from "./pages/AdminDashboard"; // Adjust path as needed

// const queryClient = new QueryClient();

// // --- ProtectedRoute component ---
// const ProtectedRoute: React.FC<{
//   children: React.ReactNode;
//   requiredRole?: "user" | "admin";
// }> = ({ children, requiredRole }) => {
//   const { currentUser, loadingAuth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   React.useEffect(() => {
//     if (!loadingAuth) {
//       if (!currentUser) {
//         // Not authenticated, redirect to signin
//         console.log(
//           "ProtectedRoute: Not authenticated, redirecting to /signin"
//         );
//         // Only navigate if not already on signin/signup to prevent loop
//         if (
//           location.pathname !== "/signin" &&
//           location.pathname !== "/signup"
//         ) {
//           navigate("/signin", { replace: true });
//         }
//       } else if (requiredRole && currentUser.role !== requiredRole) {
//         // Authenticated but wrong role, redirect to home or forbidden page
//         console.log(
//           `ProtectedRoute: User ${currentUser.email} (role: ${currentUser.role}) tried to access role-restricted content for ${requiredRole}. Redirecting to /`
//         );
//         navigate("/", { replace: true }); // Redirect to home for unauthorized roles
//       }
//     }
//   }, [currentUser, loadingAuth, requiredRole, navigate, location.pathname]);

//   if (loadingAuth) {
//     // Only show loading if auth is still determining state
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
//         <p className="text-lg">Loading authentication state...</p>
//       </div>
//     );
//   }

//   // If not loading and not authorized, it means a redirect is happening or has happened.
//   // Don't render children until the user is correctly authorized.
//   if (!currentUser || (requiredRole && currentUser.role !== requiredRole)) {
//     return null;
//   }

//   return <>{children}</>;
// };

// // --- User Dashboard Layout Component ---
// // This component provides the common layout (Navbar, AIBotFab, Footer) for all regular user pages.
// const UserLayout: React.FC = () => {
//   // Removed 'children: React.ReactNode' prop
//   useScrollToTop();
//   console.log("UserLayout: Rendering. Now using Outlet for children."); // Debug log updated
//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Navbar />
//       <div className="pt-20 pb-16">
//         {" "}
//         {/* Adjust padding based on Navbar height */}
//         <Outlet />{" "}
//         {/* THIS IS THE NEW CRUCIAL LINE - Renders nested route content */}
//       </div>
//       <AIBotFab />
//       <Footer />
//     </div>
//   );
// };

// const AppContent: React.FC = () => {
//   const { currentUser, loadingAuth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useScrollToTop();

//   // This useEffect handles redirects for logged-in users trying to access signin/signup pages
//   useEffect(() => {
//     if (!loadingAuth) {
//       if (currentUser) {
//         // If user is logged in
//         if (
//           location.pathname === "/signin" ||
//           location.pathname === "/signup"
//         ) {
//           if (currentUser.role === "admin") {
//             console.log(
//               "AppContent useEffect: Logged in admin on public auth page, redirecting to /admin"
//             );
//             navigate("/admin", { replace: true });
//           } else {
//             // user role
//             console.log(
//               "AppContent useEffect: Logged in user on public auth page, redirecting to /"
//             );
//             navigate("/", { replace: true });
//           }
//         } else if (location.pathname === "/") {
//           // If logged in user lands on root '/'
//           if (currentUser.role === "admin") {
//             console.log(
//               "AppContent useEffect: Admin on root '/', redirecting to /admin"
//             );
//             navigate("/admin", { replace: true });
//           }
//           // No need to redirect user if they are already on '/', as it's their home.
//         }
//       } else {
//         // If no user is logged in
//         // If they are on a protected route, redirect to signin
//         // This is largely handled by ProtectedRoute, but good to have a fallback
//         const protectedPaths = [
//           "/",
//           "/home",
//           "/finance",
//           "/events",
//           "/startups",
//           "/marketplace",
//           "/internships",
//           "/blogs",
//           "/scholarships",
//           "/courses",
//           "/paid-courses",
//           "/free-courses",
//           "/course-materials",
//           "/startup-schemes",
//           "/profile",
//           "/network",
//           "/youtube-shorts",
//           "/podcasts",
//           "/student-discounts",
//           "/community",
//         ];
//         if (
//           protectedPaths.includes(location.pathname) &&
//           !location.pathname.startsWith("/admin")
//         ) {
//           console.log(
//             "AppContent useEffect: Unauthenticated user on protected path, redirecting to /signin"
//           );
//           navigate("/signin", { replace: true });
//         }
//       }
//     }
//   }, [loadingAuth, currentUser, location.pathname, navigate]);

//   if (loadingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
//         <p className="text-lg">Loading application...</p>
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       {/* Public Routes - Accessible to anyone */}
//       <Route path="/signin" element={<SignIn />} />
//       <Route path="/signup" element={<SignUp />} />

//       {/* Authenticated Routes */}
//       {/* User Specific Routes - Wrapped by ProtectedRoute and UserLayout */}
//       {/* UserLayout now acts as an Outlet container for its children */}
//       <Route
//         element={
//           <ProtectedRoute requiredRole="user">
//             <UserLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Index />} />{" "}
//         {/* Use index for the default child route */}
//         <Route path="home" element={<Index />} />
//         <Route path="finance" element={<Finance />} />
//         <Route path="events" element={<Events />} />
//         <Route path="startups" element={<Startups />} />
//         <Route path="marketplace" element={<Marketplace />} />
//         <Route path="internships" element={<Internships />} />
//         <Route path="blogs" element={<Blogs />} />
//         <Route path="scholarships" element={<Scholarships />} />
//         <Route path="courses" element={<Courses />} />
//         <Route path="paid-courses" element={<PaidCourses />} />
//         <Route path="free-courses" element={<FreeCourses />} />
//         <Route path="course-materials" element={<CourseMaterials />} />
//         <Route path="startup-schemes" element={<StartupSchemes />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="network" element={<Network />} />
//         <Route path="youtube-shorts" element={<YouTubeShorts />} />
//         <Route path="podcasts" element={<Podcasts />} />
//         <Route path="student-discounts" element={<StudentDiscounts />} />
//         <Route path="community" element={<Community />} />{" "}
//         {/* Added Community route */}
//         {/* Catch-all for any other path if user is logged in as 'user' and not matching above */}
//         <Route path="*" element={<NotFound />} />
//       </Route>

//       {/* Admin Specific Routes - Wrapped by ProtectedRoute, AdminDashboard handles its own layout */}
//       <Route
//         path="/admin/*" // Use /* for nested admin routes
//         element={
//           <ProtectedRoute requiredRole="admin">
//             <AdminDashboard /> {/* AdminDashboard itself is the element */}
//           </ProtectedRoute>
//         }
//       />

//       {/* Fallback for any unmatched routes if not caught by ProtectedRoute (e.g., if user signs out and lands on /) */}
//       {/* This ensures that if a user is not authenticated and tries to access any path not explicitly /signin or /signup, they are redirected. */}
//       {/* This should be the LAST route for unauthenticated users */}
//       {!currentUser && !loadingAuth && (
//         <Route path="*" element={<Navigate to="/signin" replace />} />
//       )}

//       {/* Final catch-all for any truly unhandled routes (e.g., authenticated user with unrecognized role, or a path that doesn't exist) */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           {/* AuthProvider now comes from AuthContext.tsx and wraps the entire AppContent */}
//           <AuthProvider>
//             <AppContent />
//           </AuthProvider>
//         </BrowserRouter>
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom"; // Import Outlet
import useScrollToTop from "@/hooks/useScrollToTop";
import { motion } from "framer-motion"; // Import motion for background animations

// Import your pages
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Events from "./pages/Events";
import Startups from "./pages/Startups";
import Marketplace from "./pages/Marketplace";
import Internships from "./pages/Internships";
import Blogs from "./pages/Blogs";
import Scholarships from "./pages/Scholarships";
import Courses from "./pages/Courses";
import PaidCourses from "./pages/PaidCourses";
import FreeCourses from "./pages/FreeCourses";
import CourseMaterials from "./pages/CourseMaterials";
import StartupSchemes from "./pages/StartupSchemes";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";
import YouTubeShorts from "./pages/YouTubeShorts";
import Podcasts from "./pages/Podcasts";
import StudentDiscounts from "./pages/StudentDiscounts";
import Community from "./pages/Community"; // Ensure Community is imported
import ResourcesHub from "./pages/ResourcesHub"; // Add ResourcesHub import
import AIBotFab from "@/components/ui/AIBotFab";
import Navbar from "@/components/Navbar"; // Ensure Navbar is imported
import Footer from "@/components/Footer"; // Ensure Footer is imported

// IMPORTANT: Import AuthProvider and useAuth from the centralized context file
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard"; // Adjust path as needed

const queryClient = new QueryClient();

// --- ProtectedRoute component ---
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}> = ({ children, requiredRole }) => {
  const { currentUser, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!loadingAuth) {
      if (!currentUser) {
        // Not authenticated, redirect to signin
        console.log(
          "ProtectedRoute: Not authenticated, redirecting to /signin"
        );
        // Only navigate if not already on signin/signup to prevent loop
        if (
          location.pathname !== "/signin" &&
          location.pathname !== "/signup"
        ) {
          navigate("/signin", { replace: true });
        }
      } else if (requiredRole && currentUser.role !== requiredRole) {
        // Authenticated but wrong role, redirect to home or forbidden page
        console.log(
          `ProtectedRoute: User ${currentUser.email} (role: ${currentUser.role}) tried to access role-restricted content for ${requiredRole}. Redirecting to /`
        );
        navigate("/", { replace: true }); // Redirect to home for unauthorized roles
      }
    }
  }, [currentUser, loadingAuth, requiredRole, navigate, location.pathname]);

  if (loadingAuth) {
    // Only show loading if auth is still determining state
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <p className="text-lg">Loading authentication state...</p>
      </div>
    );
  }

  // If not loading and not authorized, it means a redirect is happening or has happened.
  // Don't render children until the user is correctly authorized.
  if (!currentUser || (requiredRole && currentUser.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

// --- User Dashboard Layout Component ---
// This component provides the common layout (Navbar, AIBotFab, Footer) for all regular user pages.
const UserLayout: React.FC = () => {
  useScrollToTop();
  console.log("UserLayout: Rendering. Now using Outlet for children.");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {" "}
      {/* Added relative and overflow-x-hidden */}
      {/* Background elements moved from Index.tsx */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-purple/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Enhanced gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(142, 68, 173, 0.4), transparent)",
              "radial-gradient(circle, rgba(240, 98, 146, 0.4), transparent)",
              "radial-gradient(circle, rgba(142, 68, 173, 0.4), transparent)",
            ],
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          animate={{
            background: [
              "radial-gradient(circle, rgba(240, 98, 146, 0.4), transparent)",
              "radial-gradient(circle, rgba(142, 68, 173, 0.4), transparent)",
              "radial-gradient(circle, rgba(240, 98, 146, 0.4), transparent)",
            ],
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Animated border gradients */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(142, 68, 173, 0.5), transparent)",
              "linear-gradient(90deg, transparent, rgba(240, 98, 146, 0.5), transparent)",
              "linear-gradient(90deg, transparent, rgba(142, 68, 173, 0.5), transparent)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <Navbar />
      <div className="pt-20 pb-16 relative z-10">
        {" "}
        {/* Added relative z-10 to ensure content is above background */}
        <Outlet />
      </div>
      <AIBotFab />
      <Footer />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentUser, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useScrollToTop();

  // This useEffect handles redirects for logged-in users trying to access signin/signup pages
  useEffect(() => {
    if (!loadingAuth) {
      if (currentUser) {
        // If user is logged in
        if (
          location.pathname === "/signin" ||
          location.pathname === "/signup"
        ) {
          if (currentUser.role === "admin") {
            console.log(
              "AppContent useEffect: Logged in admin on public auth page, redirecting to /admin"
            );
            navigate("/admin", { replace: true });
          } else {
            // user role
            console.log(
              "AppContent useEffect: Logged in user on public auth page, redirecting to /"
            );
            navigate("/", { replace: true });
          }
        } else if (location.pathname === "/") {
          // If logged in user lands on root '/'
          if (currentUser.role === "admin") {
            console.log(
              "AppContent useEffect: Admin on root '/', redirecting to /admin"
            );
            navigate("/admin", { replace: true });
          }
          // No need to redirect user if they are already on '/', as it's their home.
        }
      } else {
        // If no user is logged in
        // If they are on a protected route, redirect to signin
        // This is largely handled by ProtectedRoute, but good to have a fallback
        const protectedPaths = [
          "/",
          "/home",
          "/finance",
          "/events",
          "/startups",
          "/marketplace",
          "/internships",
          "/blogs",
          "/scholarships",
          "/courses",
          "/paid-courses",
          "/free-courses",
          "/course-materials",
          "/startup-schemes",
          "/profile",
          "/network",
          "/youtube-shorts",
          "/podcasts",
          "/student-discounts",
          "/community",
        ];
        if (
          protectedPaths.includes(location.pathname) &&
          !location.pathname.startsWith("/admin")
        ) {
          console.log(
            "AppContent useEffect: Unauthenticated user on protected path, redirecting to /signin"
          );
          navigate("/signin", { replace: true });
        }
      }
    }
  }, [loadingAuth, currentUser, location.pathname, navigate]);

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <p className="text-lg">Loading application...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes - Accessible to anyone */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Authenticated Routes */}
      {/* User Specific Routes - Wrapped by ProtectedRoute and UserLayout */}
      {/* UserLayout now acts as an Outlet container for its children */}
      <Route
        element={
          <ProtectedRoute requiredRole="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Index />} />{" "}
        {/* Use index for the default child route */}
        <Route path="home" element={<Index />} />
        <Route path="finance" element={<Finance />} />
        <Route path="events" element={<Events />} />
        <Route path="startups" element={<Startups />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="internships" element={<Internships />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="scholarships" element={<Scholarships />} />
        <Route path="courses" element={<Courses />} />
        <Route path="paid-courses" element={<PaidCourses />} />
        <Route path="free-courses" element={<FreeCourses />} />
        <Route path="course-materials" element={<CourseMaterials />} />
        <Route path="startup-schemes" element={<StartupSchemes />} />
        <Route path="profile" element={<Profile />} />
        <Route path="network" element={<Network />} />
        <Route path="youtube-shorts" element={<YouTubeShorts />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="student-discounts" element={<StudentDiscounts />} />
        <Route path="resources" element={<ResourcesHub />} />
        <Route path="community" element={<Community />} />
        {/* Catch-all for any other path if user is logged in as 'user' and not matching above */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Specific Routes - Wrapped by ProtectedRoute, AdminDashboard handles its own layout */}
      <Route
        path="/admin/*" // Use /* for nested admin routes
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard /> {/* AdminDashboard itself is the element */}
          </ProtectedRoute>
        }
      />

      {/* Fallback for any unmatched routes if not caught by ProtectedRoute (e.g., if user signs out and lands on /) */}
      {/* This ensures that if a user is not authenticated and tries to access any path not explicitly /signin or /signup, they are redirected. */}
      {/* This should be the LAST route for unauthenticated users */}
      {!currentUser && !loadingAuth && (
        <Route path="*" element={<Navigate to="/signin" replace />} />
      )}

      {/* Final catch-all for any truly unhandled routes (e.g., authenticated user with unrecognized role, or a path that doesn't exist) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* AuthProvider now comes from AuthContext.tsx and wraps the entire AppContent */}
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
