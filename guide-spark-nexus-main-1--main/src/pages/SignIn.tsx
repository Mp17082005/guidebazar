// src/pages/SignIn.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmail } from "../utils/auth"; // Corrected relative import path
import { useAuth } from "@/context/AuthContext"; // IMPORT useAuth from centralized context

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, loadingAuth } = useAuth(); // Use useAuth to check current user state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect away from sign-in page
  React.useEffect(() => {
    if (!loadingAuth && currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [currentUser, loadingAuth, navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      // Redirection is now handled by the useEffect above, which listens to currentUser changes
    } catch (err: any) {
      setError(err.message);
      console.error("Email sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  // If loading auth state, show a loading message
  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  // If already logged in, this component should not render (handled by useEffect)
  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-purple-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Sign In
        </h2>
        {error && (
          <div
            className="bg-red-700 bg-opacity-30 border border-red-500 text-red-100 px-4 py-3 rounded-md relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm
                         bg-gray-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm
                         bg-gray-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                       text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
            disabled={loading}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

// // src/pages/SignIn.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmail } from "@/utils/auth"; // CORRECTED: Ensures use of alias

// const SignIn: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleEmailSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       await signInWithEmail(email, password);
//       navigate("/"); // Navigate to home page on successful Sign In
//     } catch (err: any) {
//       setError(err.message);
//       console.error("Email sign-in error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
//       <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-purple-700">
//         <h2 className="text-3xl font-bold text-center text-white mb-6">
//           Sign In
//         </h2>
//         {error && (
//           <div
//             className="bg-red-700 bg-opacity-30 border border-red-500 text-red-100 px-4 py-3 rounded-md relative mb-4"
//             role="alert"
//           >
//             <strong className="font-bold">Error!</strong>
//             <span className="block sm:inline"> {error}</span>
//           </div>
//         )}
//         <form onSubmit={handleEmailSignIn} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm
//                          bg-gray-700 text-white placeholder-gray-400
//                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               disabled={loading}
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm
//                          bg-gray-700 text-white placeholder-gray-400
//                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               disabled={loading}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
//                        text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
//                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-400">
//           Don't have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
//             disabled={loading}
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// // // src/pages/SignIn.tsx
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { signInWithEmail } from "./utils/auth";
// // ; // getFriendlyErrorMessage is used internally by signInWithEmail

// // const SignIn: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleEmailSignIn = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError(null);
// //     setLoading(true);
// //     try {
// //       await signInWithEmail(email, password);
// //       navigate("/"); // Navigate to home page on success
// //     } catch (err: any) {
// //       // err.message will now directly contain the friendly message from auth.ts
// //       setError(err.message);
// //       console.error("Email sign-in error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center p-4
// //                     bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
// //     >
// //       <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-purple-700">
// //         <h2 className="text-3xl font-bold text-center text-white mb-6">
// //           Sign In
// //         </h2>
// //         {error && (
// //           <div
// //             className="bg-red-700 bg-opacity-30 border border-red-500 text-red-100 px-4 py-3 rounded-md relative mb-4"
// //             role="alert"
// //           >
// //             <strong className="font-bold">Error!</strong>
// //             <span className="block sm:inline"> {error}</span>
// //           </div>
// //         )}
// //         <form onSubmit={handleEmailSignIn} className="space-y-4">
// //           <div>
// //             <label
// //               htmlFor="email"
// //               className="block text-sm font-medium text-gray-300"
// //             >
// //               Email
// //             </label>
// //             <input
// //               type="email"
// //               id="email"
// //               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm
// //                          bg-gray-700 text-white placeholder-gray-400
// //                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               // disabled={loading} // Re-enabled for consistency
// //             />
// //           </div>
// //           <div>
// //             <label
// //               htmlFor="password"
// //               className="block text-sm font-medium text-gray-300"
// //             >
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               id="password"
// //               className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm
// //                          bg-gray-700 text-white placeholder-gray-400
// //                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               // disabled={loading} // Re-enabled for consistency
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
// //                        text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
// //                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //             disabled={loading}
// //           >
// //             {loading ? "Signing In..." : "Sign In"}
// //           </button>
// //         </form>

// //         <p className="mt-6 text-center text-sm text-gray-400">
// //           Don't have an account?{" "}
// //           <button
// //             onClick={() => navigate("/signup")}
// //             className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
// //             disabled={loading}
// //           >
// //             Sign Up
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignIn;
