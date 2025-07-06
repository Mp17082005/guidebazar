// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { ArrowRight, X } from "lucide-react"; // Import X for the close button

// const TrendingContent = () => {
//   const navigate = useNavigate();

//   // State for managing the video modal
//   const [showVideoModal, setShowVideoModal] = useState(false);
//   const [currentVideoUrl, setCurrentVideoUrl] = useState('');

//   // Function to open the video modal
//   const openVideoModal = (videoUrl: string) => {
//     setCurrentVideoUrl(videoUrl);
//     setShowVideoModal(true);
//   };

//   // Function to close the video modal
//   const closeVideoModal = () => {
//     setCurrentVideoUrl('');
//     setShowVideoModal(false);
//   };

//   // Sample data for YouTube Shorts (unchanged from previous version)
//   const [youtubeShorts] = useState([
//     {
//       id: 1,
//       title: "How to Land Your First Tech Internship",
//       thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
//       views: "2.3M",
//       creator: "ApnaCollegeOfficial",
//       videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" // Added autoplay & mute for shorts
//     },
//     {
//       id: 2,
//       title: "5 Financial Hacks Every Student Should Know",
//       thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
//       views: "366K",
//       creator: "Student internships",
//       videoUrl: "https://www.youtube.com/embed/J11Qme3vAio?autoplay=1&mute=1"
//     },
//     {
//       id: 3,
//       title: "Day in the Life of a Student Entrepreneur",
//       thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
//       views: "221K",
//       creator: "Online Internships",
//       videoUrl: "https://www.youtube.com/embed/P6iRc0P9sKo?autoplay=1&mute=1"
//     },
//     {
//       id: 4,
//       title: "Quick Tips for Better Productivity",
//       thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
//       views: "67K",
//       creator: "free internships",
//       videoUrl: "https://www.youtube.com/embed/etj9K4g58kQ?autoplay=1&mute=1"
//     },
//     {
//       id: 5,
//       title: "Best Study Techniques for Exams",
//       thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
//       views: "156K",
//       creator: "Job Feedback",
//       videoUrl: "https://www.youtube.com/embed/khGjvu5jWtE?autoplay=1&mute=1"
//     }
//   ]);

//   // Extended YouTube Shorts data (unchanged from previous version)
//   const extendedYoutubeShorts = youtubeShorts.concat([
//     {
//       id: 6,
//       title: "How to Ace Technical Interviews",
//       thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
//       views: "98K",
//       creator: "StartUp success",
//       videoUrl: "https://www.youtube.com/embed/bNpx7gpSqbY?autoplay=1&mute=1"
//     },
//     {
//       id: 7,
//       title: "Scholarships You Shouldn't Miss",
//       thumbnail: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
//       views: "112K",
//       creator: "Being Successful Entrepreneur",
//       videoUrl: "https://www.youtube.com/embed/eHJnEHyyN1Y?autoplay=1&mute=1"
//     },
//     {
//       id: 8,
//       title: "Balancing Studies & Side Hustles",
//       thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
//       views: "76K",
//       creator: "How to Create Successful Company",
//       videoUrl: "https://www.youtube.com/embed/Qa_4c9zrxf0?autoplay=1&mute=1"
//     }
//   ]);

//   // Sample data for Blogs (unchanged from previous version)
//   const [blogs] = useState([
//   {
//     id: 1,
//     title: "Building Your Personal Brand While in College",
//     image: "https://images.unsplash.com/photo-1493612276216-ee3925520721",
//     readTime: "3 min read",
//     author: "Emma Johnson",
//     link: "https://blog.hubspot.com/marketing/personal-branding"
//   },
//   {
//     id: 2,
//     title: "Top 10 SaaS Tools with Student Discounts",
//     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
//     readTime: "5 min read",
//     author: "Tech Student Hub",
//     link: "https://collegeinfogeek.com/student-discounts-software/"
//   },
//   {
//     id: 3,
//     title: "How I Started Investing with Just ₹500",
//     image: "https://images.unsplash.com/photo-1559526324-593bc073d938",
//     readTime: "4 min read",
//     author: "Finance First",
//     link: "https://zerodha.com/varsity/module/introduction-to-stock-markets/"
//   },
//   {
//     id: 4,
//     title: "Mastering Time Management in College",
//     image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
//     readTime: "6 min read",
//     author: "Study Guru",
//     link: "https://www.northeastern.edu/graduate/blog/time-management-tips/"
//   },
//   {
//     id: 5,
//     title: "Side Hustles for College Students",
//     image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
//     readTime: "4 min read",
//     author: "Hustle Hub",
//     link: "https://collegeinfogeek.com/make-money/"
//   }
// ]);


//   // Updated Sample data for Podcasts with actual YouTube embed URLs and consistent image property
//   const [podcasts] = useState([
//   {
//     id: 1,
//     title: "Top 5 AI Tools for Students",
//     image: "https://i.ytimg.com/vi/ZWM_f0ZYfOY/hqdefault.jpg",
//     duration: "1:00",
//     host: "StudyX",
//     videoUrl: "https://www.youtube.com/embed/ZWM_f0ZYfOY?autoplay=1"
//   },
//   {
//     id: 2,
//     title: "Student Entrepreneurs: Success Stories",
//     image: "https://i.ytimg.com/vi/KscA8DA9Ckw/hqdefault.jpg",
//     duration: "12:34",
//     host: "YEA Stories",
//     videoUrl: "https://www.youtube.com/embed/KscA8DA9Ckw?autoplay=1"
//   },
//   {
//     id: 3,
//     title: "Decoding Financial Independence (FIRE)",
//     image: "https://i.ytimg.com/vi/IOSO-0n-R2U/hqdefault.jpg",
//     duration: "7:45",
//     host: "FIRE Explored",
//     videoUrl: "https://www.youtube.com/embed/IOSO-0n-R2U?autoplay=1"
//   },
//   {
//     id: 4,
//     title: "Building Mental Resilience",
//     image: "https://i.ytimg.com/vi/8j40I2JZ_MI/hqdefault.jpg",
//     duration: "15:20",
//     host: "Mind Matters",
//     videoUrl: "https://www.youtube.com/embed/8j40I2JZ_MI?autoplay=1"
//   },
//   {
//     id: 5,
//     title: "The Future of Work",
//     image: "https://i.ytimg.com/vi/EuDnSqAo784/hqdefault.jpg",
//     duration: "2:05",
//     host: "WEF Insights",
//     videoUrl: "https://www.youtube.com/embed/EuDnSqAo784?autoplay=1"
//   }
// ]);


//   return (
//     <section className="py-20 bg-black text-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trending Content</h2>
//         <p className="text-lg text-center text-muted-foreground mb-12">Stay updated with the latest and most popular content</p>

//         <div className="space-y-16">
//           {/* YouTube Shorts Section */}
//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <div className="flex items-center">
//                 <span className="bg-red-600 text-white p-2 rounded-lg mr-3">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.713 11.333l-5.6-3.233a.5.5 0 00-.713.433v6.467a.5.5 0 00.713.433l5.6-3.233a.5.5 0 000-.867z" />
//                   </svg>
//                 </span>
//                 <span className="text-xl font-semibold">YouTube Shorts</span>
//               </div>
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/shorts')} // Assuming a shorts page
//                 className="flex items-center gap-2 text-white border-gray-700 hover:bg-gray-800"
//               >
//                 Show More
//                 <ArrowRight className="h-4 w-4" />
//               </Button>
//             </div>
//             <ScrollArea className="w-full whitespace-nowrap">
//               <div className="flex space-x-8 pb-4">
//                 {extendedYoutubeShorts.map((short) => (
//                   <div key={short.id} className="group cursor-pointer flex-shrink-0 w-[72px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] flex flex-col items-center">
//                     <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black" style={{ aspectRatio: '9/16', minHeight: 120 }}>
//                       <iframe
//                         src={short.videoUrl}
//                         title={short.title}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                         className="absolute top-0 left-0 w-full h-full object-cover"
//                       ></iframe>
//                       <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none">
//                         <div className="flex justify-end p-1">
//                           <span className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">{short.views} views</span>
//                         </div>
//                         <div className="flex flex-col items-start p-2 bg-gradient-to-t from-black/70 to-transparent w-full">
//                           <span className="text-white text-xs font-semibold line-clamp-2 mb-1 drop-shadow-md">{short.title}</span>
//                           <span className="text-white/80 text-[10px] font-medium drop-shadow-sm">{short.creator}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>
//           </div>

//           {/* Popular Blogs Section */}
// <div>
//   <div className="flex justify-between items-center mb-2">
//     <div className="flex items-center">
//       <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//           <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//         </svg>
//       </span>
//       <span className="text-xl font-semibold">Popular Blogs</span>
//     </div>
//     <Button
//       variant="outline"
//       onClick={() => navigate('/blogs')}
//       className="flex items-center gap-2 text-white border-gray-700 hover:bg-gray-800"
//     >
//       Show More
//       <ArrowRight className="h-4 w-4" />
//     </Button>
//   </div>
//   <ScrollArea className="w-full whitespace-nowrap">
//     <div className="flex space-x-8 pb-4">
//       {blogs.map((blog) => (
//         <a
//           key={blog.id}
//           href={blog.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="group cursor-pointer flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
//         >
//           <div className="relative overflow-hidden rounded-2xl shadow-lg">
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="w-full h-32 object-cover transition-transform group-hover:scale-105"
//             />
//           </div>
//           <h4 className="font-medium mt-2 line-clamp-2 group-hover:text-purple-500 transition-colors text-xs md:text-sm">
//             {blog.title}
//           </h4>
//           <div className="flex justify-between text-xs text-muted-foreground">
//             <span>{blog.author}</span>
//             <span>{blog.readTime}</span>
//           </div>
//         </a>
//       ))}
//     </div>
//     <ScrollBar orientation="horizontal" />
//   </ScrollArea>
// </div>

//           {/* Highlighted Podcast Clips Section - UPDATED */}
//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <div className="flex items-center">
//                 <span className="bg-purple-600 text-white p-2 rounded-lg mr-3">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M18 8a6 6 0 0 0-12 0v12h12V8z" />
//                     <path d="M6 18v-2a6 6 0 0 1 12 0v2" />
//                   </svg>
//                 </span>
//                 <span className="text-xl font-semibold">Highlighted Podcast Clips</span>
//               </div>
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/podcasts')}
//                 className="flex items-center gap-2 text-white border-gray-700 hover:bg-gray-800"
//               >
//                 Show More
//                 <ArrowRight className="h-4 w-4" />
//               </Button>
//             </div>
//             <ScrollArea className="w-full whitespace-nowrap">
//               <div className="flex space-x-8 pb-4">
//                 {podcasts.map((podcast) => (
//                   <div
//                     key={podcast.id}
//                     className="group cursor-pointer flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
//                     onClick={() => openVideoModal(podcast.videoUrl)} // Open modal on click
//                   >
//                     <div className="relative overflow-hidden rounded-2xl shadow-lg">
//                       <img
//                         src={podcast.image}
//                         alt={podcast.title}
//                         className="w-full h-32 object-cover transition-transform group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
//                         {/* Play button within the card, also opens modal */}
//                         <button className="bg-white rounded-full p-2 mr-2 hover:scale-110 transition-transform">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 00.5.866l3 1.732a1 1 0 001.5-.866V6.268a1 1 0 00-1.5-.866l-3 1.732z" clipRule="evenodd" />
//                           </svg>
//                         </button>
//                         <span className="text-white text-xs">{podcast.duration}</span>
//                       </div>
//                     </div>
//                     <h4 className="font-medium mt-2 line-clamp-2 group-hover:text-purple-500 transition-colors text-xs md:text-sm">{podcast.title}</h4>
//                     <p className="text-xs text-muted-foreground">{podcast.host}</p>
//                   </div>
//                 ))}
//               </div>
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>
//           </div>
//         </div>
//       </div>

//       {/* Video Modal Overlay */}
//       {showVideoModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4" onClick={closeVideoModal}>
//           <div
//             className="relative w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg overflow-hidden"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
//           >
//             <button
//               onClick={closeVideoModal}
//               className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
//               aria-label="Close video"
//             >
//               <X className="h-6 w-6" />
//             </button>
//             <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}> {/* 16:9 Aspect Ratio */}
//               <iframe
//                 src={currentVideoUrl}
//                 title="Podcast Video"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="absolute top-0 left-0 w-full h-full rounded-lg"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default TrendingContent;




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight, X } from "lucide-react"; // Import X for the close button

const TrendingContent = () => {
  const navigate = useNavigate();

  // State for managing the video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  // Function to open the video modal
  const openVideoModal = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  // Function to close the video modal
  const closeVideoModal = () => {
    setCurrentVideoUrl('');
    setShowVideoModal(false);
  };

  // Sample data for YouTube Shorts (unchanged from previous version)
  const [youtubeShorts] = useState([
    {
      id: 1,
      title: "How to Land Your First Tech Internship",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      views: "200k",
      creator: "Internship",
      videoUrl: "https://www.youtube.com/embed/imyQYtSZ-po" // Added autoplay & mute for shorts
    },
    {
      id: 2,
      title: "5 Financial Hacks Every Student Should Know",
      thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
      views: "366K",
      creator: "Student internships",
      videoUrl: "https://www.youtube.com/embed/J11Qme3vAio?autoplay=1&mute=1"
    },
    {
      id: 3,
      title: "Day in the Life of a Student Entrepreneur",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      views: "221K",
      creator: "Online Internships",
      videoUrl: "https://www.youtube.com/embed/P6iRc0P9sKo?autoplay=1&mute=1"
    },
    {
      id: 4,
      title: "Quick Tips for Better Productivity",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      views: "67K",
      creator: "free internships",
      videoUrl: "https://www.youtube.com/embed/etj9K4g58kQ?autoplay=1&mute=1"
    },
    {
      id: 5,
      title: "Best Study Techniques for Exams",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      views: "156K",
      creator: "Job Feedback",
      videoUrl: "https://www.youtube.com/embed/khGjvu5jWtE?autoplay=1&mute=1"
    }
  ]);

  // Extended YouTube Shorts data (unchanged from previous version)
  const extendedYoutubeShorts = youtubeShorts.concat([
    {
      id: 6,
      title: "How to Ace Technical Interviews",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      views: "98K",
      creator: "StartUp success",
      videoUrl: "https://www.youtube.com/embed/bNpx7gpSqbY?autoplay=1&mute=1"
    },
    {
      id: 7,
      title: "Scholarships You Shouldn't Miss",
      thumbnail: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
      views: "112K",
      creator: "Being Successful Entrepreneur",
      videoUrl: "https://www.youtube.com/embed/eHJnEHyyN1Y?autoplay=1&mute=1"
    },
    {
      id: 8,
      title: "Balancing Studies & Side Hustles",
      thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      views: "76K",
      creator: "How to Create Successful Company",
      videoUrl: "https://www.youtube.com/embed/Qa_4c9zrxf0?autoplay=1&mute=1"
    }
  ]);

  // Sample data for Blogs (unchanged from previous version)
  const [blogs] = useState([
  {
    id: 1,
    title: "Top Digital Marketing Trends in 2025",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721",
    readTime: "3 min read",
    author: "Maxwell Iskiev",
    link: "https://blog.hubspot.com/marketing/personal-branding"
  },
  {
    id: 2,
    title: "College Info Geek",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    readTime: "5 min read",
    author: "Thomas Frank",
    link: "https://collegeinfogeek.com/student-discounts-software/"
  },
  {
    id: 3,
    title: "Introduction to Stock Markets",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938",
    readTime: "4 min read",
    author: "Varsity by Zerodha",
    link: "https://zerodha.com/varsity/module/introduction-to-stock-markets/"
  },
  {
    id: 4,
    title: "7 Time Management tips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    readTime: "6 min read",
    author: "Shayna Joubert",
    link: "https://www.northeastern.edu/graduate/blog/time-management-tips/"
  },
  {
    id: 5,
    title: "Health Care",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    readTime: "4 min read",
    author: "Thomas",
    link: "https://collegeinfogeek.com/make-money/"
  }
]);


  // Updated Sample data for Podcasts with actual YouTube embed URLs and consistent image property
  const [podcasts] = useState([
  {
    id: 1,
    title: "Top 5 AI Tools for Students",
    image: "https://i.ytimg.com/vi/ZWM_f0ZYfOY/hqdefault.jpg",
    duration: "1:00",
    host: "StudyX",
    videoUrl: "https://www.youtube.com/embed/imyQYtSZ-po"
  },
  {
    id: 2,
    title: "Student Entrepreneurs: Success Stories",
    image: "https://i.ytimg.com/vi/KscA8DA9Ckw/hqdefault.jpg",
    duration: "12:34",
    host: "YEA Stories",
    videoUrl: "https://www.youtube.com/embed/KscA8DA9Ckw?autoplay=1"
  },
  {
    id: 3,
    title: "Decoding Financial Independence (FIRE)",
    image: "https://i.ytimg.com/vi/IOSO-0n-R2U/hqdefault.jpg",
    duration: "7:45",
    host: "FIRE Explored",
    videoUrl: "https://www.youtube.com/embed/IOSO-0n-R2U?autoplay=1"
  },
  {
    id: 4,
    title: "Building Mental Resilience",
    image: "https://i.ytimg.com/vi/8j40I2JZ_MI/hqdefault.jpg",
    duration: "15:20",
    host: "Mind Matters",
    videoUrl: "https://www.youtube.com/embed/8j40I2JZ_MI?autoplay=1"
  },
  {
    id: 5,
    title: "The Future of Work",
    image: "https://i.ytimg.com/vi/EuDnSqAo784/hqdefault.jpg",
    duration: "2:05",
    host: "WEF Insights",
    videoUrl: "https://www.youtube.com/embed/EuDnSqAo784?autoplay=1"
  }
]);


  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trending Content</h2>
        <p className="text-lg text-center text-muted-foreground mb-12">Stay updated with the latest and most popular content</p>

        <div className="space-y-16">
          {/* YouTube Shorts Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="bg-red-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.713 11.333l-5.6-3.233a.5.5 0 00-.713.433v6.467a.5.5 0 00.713.433l5.6-3.233a.5.5 0 000-.867z" />
                  </svg>
                </span>
                <span className="text-xl font-semibold">YouTube Shorts</span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/shorts')} // Assuming a shorts page
                className="flex items-center gap-2 text-white border-gray-700 hover:bg-gray-800"
              >
                Show More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-8 pb-4">
                {extendedYoutubeShorts.map((short) => (
                  <div key={short.id} className="group cursor-pointer flex-shrink-0 w-[72px] sm:w-[100px] md:w-[120px] lg:w-[140px] xl:w-[160px] flex flex-col items-center">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black" style={{ aspectRatio: '9/16', minHeight: 120 }}>
                      <iframe
                        src={short.videoUrl}
                        title={short.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      ></iframe>
                      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none">
                        <div className="flex justify-end p-1">
                          <span className="bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">{short.views} views</span>
                        </div>
                        <div className="flex flex-col items-start p-2 bg-gradient-to-t from-black/70 to-transparent w-full">
                          <span className="text-white text-xs font-semibold line-clamp-2 mb-1 drop-shadow-md">{short.title}</span>
                          <span className="text-white/80 text-[10px] font-medium drop-shadow-sm">{short.creator}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Popular Blogs Section */}
<div>
  <div className="flex justify-between items-center mb-2">
    <div className="flex items-center">
      <span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </span>
      <span className="text-xl font-semibold">Popular Blogs</span>
    </div>
    <Button
      variant="outline"
      onClick={() => navigate('/blogs')}
      className="flex items-center gap-2 text-white border-gray-700 hover:bg-gray-800"
    >
      Show More
      <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
  <ScrollArea className="w-full whitespace-nowrap">
    <div className="flex space-x-8 pb-4">
      {blogs.map((blog) => (
        <a
          key={blog.id}
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group cursor-pointer flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-32 object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <h4 className="font-medium mt-2 line-clamp-2 group-hover:text-purple-500 transition-colors text-xs md:text-sm">
            {blog.title}
          </h4>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{blog.author}</span>
            <span>{blog.readTime}</span>
          </div>
        </a>
      ))}
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</div>

          {/* Highlighted Podcast Clips Section - UPDATED */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="bg-purple-600 text-white p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 0 0-12 0v12h12V8z" />
                    <path d="M6 18v-2a6 6 0 0 1 12 0v2" />
                  </svg>
                </span>
                <span className="text-xl font-semibold">Highlighted Podcast Clips</span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/podcasts')}
                className="flex items-center gap-2 text-white border-gray-700 hover:bg-gray-800"
              >
                Show More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-8 pb-4">
                {podcasts.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="group cursor-pointer flex-shrink-0 w-[120px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
                    onClick={() => openVideoModal(podcast.videoUrl)} // Open modal on click
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={podcast.image}
                        alt={podcast.title}
                        className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                        {/* Play button within the card, also opens modal */}
                        <button className="bg-white rounded-full p-2 mr-2 hover:scale-110 transition-transform">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 00.5.866l3 1.732a1 1 0 001.5-.866V6.268a1 1 0 00-1.5-.866l-3 1.732z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="text-white text-xs">{podcast.duration}</span>
                      </div>
                    </div>
                    <h4 className="font-medium mt-2 line-clamp-2 group-hover:text-purple-500 transition-colors text-xs md:text-sm">{podcast.title}</h4>
                    <p className="text-xs text-muted-foreground">{podcast.host}</p>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4" onClick={closeVideoModal}>
          <div
            className="relative w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}> {/* 16:9 Aspect Ratio */}
              <iframe
                src={currentVideoUrl}
                title="Podcast Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrendingContent;
