// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// // Corrected Import Paths for admin-specific pages
// import AdminIndex from "./admin/AdminIndex"; // Corrected path
// import AdminFinance from "./admin/AdminFinance"; // Corrected path
// import AdminEvents from "./admin/AdminEvents"; // Corrected path
// import AdminStartups from "./admin/AdminStartups"; // Corrected path
// import AdminMarketplace from "./admin/AdminMarketplace"; // Corrected path
// import AdminInternships from "./admin/AdminInternships"; // Corrected path
// import AdminBlogs from "./admin/AdminBlogs"; // Corrected path
// import AdminScholarships from "./admin/AdminScholarships"; // Corrected path
// import AdminCourses from "./admin/AdminCourses"; // Corrected path
// import AdminPaidCourses from "./admin/AdminPaidCourses"; // Corrected path
// import AdminFreeCourses from "./admin/AdminFreeCourses"; // Corrected path
// import AdminCourseMaterials from "./admin/AdminCourseMaterials"; // Corrected path
// import AdminStartupSchemes from "./admin/AdminStartupSchemes"; // Corrected path
// import AdminProfile from "./admin/AdminProfile"; // Corrected path
// import AdminNetwork from "./admin/AdminNetwork"; // Corrected path
// import AdminYouTubeShorts from "./admin/AdminYouTubeShorts"; // Corrected path
// import AdminPodcasts from "./admin/AdminPodcasts"; // Corrected path
// import AdminStudentDiscounts from "./admin/AdminStudentDiscounts"; // Corrected path

// const AdminDashboard: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navbar and Footer are now rendered by MainLayout in App.tsx,
//           but if you want a *different* Navbar/Footer specifically for admin,
//           you would import and render them here. For now, assuming MainLayout handles it. */}
//       {/* <Navbar /> */}
//       <div className="pt-20 pb-16">
//         <Routes>
//           {/* Admin Home */}
//           <Route index element={<AdminIndex />} />
//           <Route path="/finance" element={<AdminFinance />} />
//           <Route path="/events" element={<AdminEvents />} />
//           <Route path="/startups" element={<AdminStartups />} />
//           <Route path="/marketplace" element={<AdminMarketplace />} />
//           <Route path="/internships" element={<AdminInternships />} />
//           <Route path="/blogs" element={<AdminBlogs />} />
//           <Route path="/scholarships" element={<AdminScholarships />} />
//           <Route path="/courses" element={<AdminCourses />} />
//           <Route path="/paid-courses" element={<AdminPaidCourses />} />
//           <Route path="/free-courses" element={<AdminFreeCourses />} />
//           <Route path="/course-materials" element={<AdminCourseMaterials />} />
//           <Route path="/startup-schemes" element={<AdminStartupSchemes />} />
//           <Route path="/profile" element={<AdminProfile />} />
//           <Route path="/network" element={<AdminNetwork />} />
//           <Route path="/youtube-shorts" element={<AdminYouTubeShorts />} />
//           <Route path="/podcasts" element={<AdminPodcasts />} />
//           <Route
//             path="/student-discounts"
//             element={<AdminStudentDiscounts />}
//           />

//           {/* Fallback for /admin/* - if no specific route matches, redirect to admin home */}
//           <Route path="*" element={<Navigate to="/admin" replace />} />
//         </Routes>
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// };

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar"; // Keep Navbar for admin
import Footer from "@/components/Footer"; // Keep Footer for admin

// Import your admin-specific pages
import AdminIndex from "./admin/AdminIndex";
import AdminFinance from "./admin/AdminFinance";
import AdminEvents from "./admin/AdminEvents";
import AdminStartups from "./admin/AdminStartups";
import AdminMarketplace from "./admin/AdminMarketplace"; // Corrected path to AdminMarketplace
import AdminInternships from "./admin/AdminInternships";
import AdminBlogs from "./admin/AdminBlogs";
import AdminScholarships from "./admin/AdminScholarships";
import AdminCourses from "./admin/AdminCourses";
import AdminPaidCourses from "./admin/AdminPaidCourses";
import AdminFreeCourses from "./admin/AdminFreeCourses";
import AdminCourseMaterials from "./admin/AdminCourseMaterials";
import AdminStartupSchemes from "./admin/AdminStartupSchemes";
import AdminProfile from "./admin/AdminProfile";
import AdminNetwork from "./admin/AdminNetwork";
import AdminYouTubeShorts from "./admin/AdminYouTubeShorts";
import AdminPodcasts from "./admin/AdminPodcasts";
import AdminStudentDiscounts from "./admin/AdminStudentDiscounts";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar /> {/* Admin Navbar */}
      <div className="pt-20 pb-16">
        <Routes>
          {/* Admin Home */}
          <Route index element={<AdminIndex />} />
          <Route path="/finance" element={<AdminFinance />} />
          <Route path="/events" element={<AdminEvents />} />
          <Route path="/startups" element={<AdminStartups />} />
          <Route path="/marketplace" element={<AdminMarketplace />} />
          <Route path="/internships" element={<AdminInternships />} />
          <Route path="/blogs" element={<AdminBlogs />} />
          <Route path="/scholarships" element={<AdminScholarships />} />
          <Route path="/courses" element={<AdminCourses />} />
          <Route path="/paid-courses" element={<AdminPaidCourses />} />
          <Route path="/free-courses" element={<AdminFreeCourses />} />
          <Route path="/course-materials" element={<AdminCourseMaterials />} />
          <Route path="/startup-schemes" element={<AdminStartupSchemes />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/network" element={<AdminNetwork />} />
          <Route path="/youtube-shorts" element={<AdminYouTubeShorts />} />
          <Route path="/podcasts" element={<AdminPodcasts />} />
          <Route
            path="/student-discounts"
            element={<AdminStudentDiscounts />}
          />

          {/* Fallback for /admin/* - if no specific route matches, redirect to admin home */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
      <Footer /> {/* Admin Footer */}
    </div>
  );
};

export default AdminDashboard;


