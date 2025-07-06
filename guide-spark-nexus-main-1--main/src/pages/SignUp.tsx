// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../utils/auth"; // Corrected relative import path
import { Eye, EyeOff } from "lucide-react"; // Import eye icons
import { useAuth } from "@/context/AuthContext"; // IMPORT useAuth from centralized context

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, loadingAuth } = useAuth(); // Use useAuth to check current user state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Password validation states
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumericChar, setHasNumericChar] = useState(false); // New state for numeric character

  // If already authenticated, redirect away from sign-up page
  React.useEffect(() => {
    if (!loadingAuth && currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [currentUser, loadingAuth, navigate]);

  // Function to validate password against rules
  const validatePassword = (pass: string) => {
    setHasMinLength(pass.length >= 8);
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(pass));
    setHasUpperCase(/[A-Z]/.test(pass));
    setHasLowerCase(/[a-z]/.test(pass));
    setHasNumericChar(/\d/.test(pass)); // New validation for at least one digit
  };

  // Check if all password requirements are met
  const arePasswordRequirementsMet =
    hasMinLength &&
    hasSpecialChar &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumericChar; // Updated condition

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword); // Validate as user types
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!arePasswordRequirementsMet) {
      setError("Password does not meet all requirements.");
      setLoading(false);
      return;
    }

    try {
      // For simplicity, sign up as 'user' by default. You can add a role selection later.
      await signUpWithEmail(email, password, "user");
      // Redirection is now handled by the useEffect above, which listens to currentUser changes
    } catch (err: any) {
      setError(err.message);
      console.error("Email sign-up error:", err);
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
          Sign Up
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
        <form onSubmit={handleEmailSignUp} className="space-y-4">
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
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 block w-full px-3 py-2 pr-10 border-gray-600 rounded-md shadow-sm
                         bg-gray-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={password}
              onChange={handlePasswordChange}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
              style={{ top: "1.75rem" }}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password Requirements Feedback */}
          <div className="text-xs text-gray-400 space-y-1">
            <p className={hasMinLength ? "text-green-400" : "text-red-400"}>
              {hasMinLength ? "✓" : "✗"} Minimum 8 characters
            </p>
            <p className={hasSpecialChar ? "text-green-400" : "text-red-400"}>
              {hasSpecialChar ? "✓" : "✗"} At least one special character
              (!@#$...)
            </p>
            <p className={hasUpperCase ? "text-green-400" : "text-red-400"}>
              {hasUpperCase ? "✓" : "✗"} At least one uppercase letter (A-Z)
            </p>
            <p className={hasLowerCase ? "text-green-400" : "text-red-400"}>
              {hasLowerCase ? "✓" : "✗"} At least one lowercase letter (a-z)
            </p>
            <p className={hasNumericChar ? "text-green-400" : "text-red-400"}>
              {hasNumericChar ? "✓" : "✗"} At least one number (0-9)
            </p>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className="mt-1 block w-full px-3 py-2 pr-10 border-gray-600 rounded-md shadow-sm
                         bg-gray-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
              style={{ top: "1.75rem" }}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                       text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={
              loading ||
              !arePasswordRequirementsMet ||
              password !== confirmPassword
            }
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
            disabled={loading}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

// // src/pages/SignUp.tsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signUpWithEmail } from "@/utils/auth"; // CORRECTED: Ensures use of alias
// import { Eye, EyeOff } from "lucide-react"; // Import eye icons

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility

//   // Password validation states
//   const [hasMinLength, setHasMinLength] = useState(false);
//   const [hasSpecialChar, setHasSpecialChar] = useState(false);
//   const [hasUpperCase, setHasUpperCase] = useState(false);
//   const [hasLowerCase, setHasLowerCase] = useState(false);
//   const [hasNumericChar, setHasNumericChar] = useState(false); // New state for numeric character

//   // Function to validate password against rules
//   const validatePassword = (pass: string) => {
//     setHasMinLength(pass.length >= 8);
//     setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(pass));
//     setHasUpperCase(/[A-Z]/.test(pass));
//     setHasLowerCase(/[a-z]/.test(pass));
//     setHasNumericChar(/\d/.test(pass)); // New validation for at least one digit
//   };

//   // Check if all password requirements are met
//   const arePasswordRequirementsMet =
//     hasMinLength &&
//     hasSpecialChar &&
//     hasUpperCase &&
//     hasLowerCase &&
//     hasNumericChar; // Updated condition

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     validatePassword(newPassword); // Validate as user types
//   };

//   const handleConfirmPasswordChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setConfirmPassword(e.target.value);
//   };

//   const handleEmailSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }

//     if (!arePasswordRequirementsMet) {
//       setError("Password does not meet all requirements.");
//       setLoading(false);
//       return;
//     }

//     try {
//       await signUpWithEmail(email, password);
//       navigate("/signin"); // Navigate to Sign In page after successful Sign Up
//     } catch (err: any) {
//       setError(err.message);
//       console.error("Email sign-up error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
//       <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-purple-700">
//         <h2 className="text-3xl font-bold text-center text-white mb-6">
//           Sign Up
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
//         <form onSubmit={handleEmailSignUp} className="space-y-4">
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
//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-600 rounded-md shadow-sm
//                          bg-gray-700 text-white placeholder-gray-400
//                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//               value={password}
//               onChange={handlePasswordChange} // Use new handler
//               required
//               disabled={loading}
//             />
//             <button
//               type="button" // Important: type="button" to prevent form submission
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
//               style={{ top: "1.75rem" }} // Adjust icon position if needed, or remove for default alignment
//               disabled={loading}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {/* Password Requirements Feedback */}
//           <div className="text-xs text-gray-400 space-y-1">
//             <p className={hasMinLength ? "text-green-400" : "text-red-400"}>
//               {hasMinLength ? "✓" : "✗"} Minimum 8 characters
//             </p>
//             <p className={hasSpecialChar ? "text-green-400" : "text-red-400"}>
//               {hasSpecialChar ? "✓" : "✗"} At least one special character
//               (!@#$...)
//             </p>
//             <p className={hasUpperCase ? "text-green-400" : "text-red-400"}>
//               {hasUpperCase ? "✓" : "✗"} At least one uppercase letter (A-Z)
//             </p>
//             <p className={hasLowerCase ? "text-green-400" : "text-red-400"}>
//               {hasLowerCase ? "✓" : "✗"} At least one lowercase letter (a-z)
//             </p>
//             <p className={hasNumericChar ? "text-green-400" : "text-red-400"}>
//               {hasNumericChar ? "✓" : "✗"} At least one number (0-9)
//             </p>
//           </div>

//           <div className="relative">
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-300"
//             >
//               Confirm Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="confirmPassword"
//               className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-600 rounded-md shadow-sm
//                          bg-gray-700 text-white placeholder-gray-400
//                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange} // Use new handler
//               required
//               disabled={loading}
//             />
//             <button
//               type="button" // Important: type="button" to prevent form submission
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
//               style={{ top: "1.75rem" }} // Adjust icon position if needed, or remove for default alignment
//               disabled={loading}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
//                        text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
//                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             disabled={
//               loading ||
//               !arePasswordRequirementsMet ||
//               password !== confirmPassword
//             } // Disable if requirements not met or passwords don't match
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-400">
//           Already have an account?{" "}
//           <button
//             onClick={() => navigate("/signin")}
//             className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
//             disabled={loading}
//           >
//             Sign In
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// // // src/pages/SignUp.tsx
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { signUpWithEmail } from "./utils/auth"; // getFriendlyErrorMessage is used internally by signUpWithEmail
// // import { Eye, EyeOff } from 'lucide-react'; // Import eye icons

// // const SignUp: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [error, setError] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false); // State for password visibility

// //   // Password validation states
// //   const [hasMinLength, setHasMinLength] = useState(false);
// //   const [hasSpecialChar, setHasSpecialChar] = useState(false);
// //   const [hasUpperCase, setHasUpperCase] = useState(false);
// //   const [hasLowerCase, setHasLowerCase] = useState(false);
// //   const [hasNumericChar, setHasNumericChar] = useState(false); // New state for numeric character

// //   // Function to validate password against rules
// //   const validatePassword = (pass: string) => {
// //     setHasMinLength(pass.length >= 8);
// //     setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(pass));
// //     setHasUpperCase(/[A-Z]/.test(pass));
// //     setHasLowerCase(/[a-z]/.test(pass));
// //     setHasNumericChar(/\d/.test(pass)); // New validation for at least one digit
// //   };

// //   // Check if all password requirements are met
// //   const arePasswordRequirementsMet =
// //     hasMinLength && hasSpecialChar && hasUpperCase && hasLowerCase && hasNumericChar; // Updated condition

// //   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const newPassword = e.target.value;
// //     setPassword(newPassword);
// //     validatePassword(newPassword); // Validate as user types
// //   };

// //   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setConfirmPassword(e.target.value);
// //   };

// //   const handleEmailSignUp = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError(null);
// //     setLoading(true);

// //     if (password !== confirmPassword) {
// //       setError("Passwords do not match.");
// //       setLoading(false);
// //       return;
// //     }

// //     if (!arePasswordRequirementsMet) {
// //       setError("Password does not meet all requirements.");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       await signUpWithEmail(email, password);
// //       navigate('/signin'); // Navigate to Sign In page after successful Sign Up
// //     } catch (err: any) {
// //       // err.message will now directly contain the friendly message from auth.ts
// //       setError(err.message);
// //       console.error("Email sign-up error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
// //       <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md border border-purple-700">
// //         <h2 className="text-3xl font-bold text-center text-white mb-6">
// //           Sign Up
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
// //         <form onSubmit={handleEmailSignUp} className="space-y-4">
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
// //               disabled={loading}
// //             />
// //           </div>
// //           <div className="relative">
// //             <label
// //               htmlFor="password"
// //               className="block text-sm font-medium text-gray-300"
// //             >
// //               Password
// //             </label>
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               id="password"
// //               className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-600 rounded-md shadow-sm
// //                          bg-gray-700 text-white placeholder-gray-400
// //                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
// //               value={password}
// //               onChange={handlePasswordChange} // Use new handler
// //               required
// //               disabled={loading}
// //             />
// //             <button
// //               type="button" // Important: type="button" to prevent form submission
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
// //               style={{ top: '1.75rem' }} // Adjust icon position if needed, or remove for default alignment
// //               disabled={loading}
// //             >
// //               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //             </button>
// //           </div>

// //           {/* Password Requirements Feedback */}
// //           <div className="text-xs text-gray-400 space-y-1">
// //             <p className={hasMinLength ? 'text-green-400' : 'text-red-400'}>
// //               {hasMinLength ? '✓' : '✗'} Minimum 8 characters
// //             </p>
// //             <p className={hasSpecialChar ? 'text-green-400' : 'text-red-400'}>
// //               {hasSpecialChar ? '✓' : '✗'} At least one special character (!@#$...)
// //             </p>
// //             <p className={hasUpperCase ? 'text-green-400' : 'text-red-400'}>
// //               {hasUpperCase ? '✓' : '✗'} At least one uppercase letter (A-Z)
// //             </p>
// //             <p className={hasLowerCase ? 'text-green-400' : 'text-red-400'}>
// //               {hasLowerCase ? '✓' : '✗'} At least one lowercase letter (a-z)
// //             </p>
// //             <p className={hasNumericChar ? 'text-green-400' : 'text-red-400'}>
// //               {hasNumericChar ? '✓' : '✗'} At least one number (0-9)
// //             </p>
// //           </div>

// //           <div className="relative">
// //             <label
// //               htmlFor="confirmPassword"
// //               className="block text-sm font-medium text-gray-300"
// //             >
// //               Confirm Password
// //             </label>
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               id="confirmPassword"
// //               className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-600 rounded-md shadow-sm
// //                          bg-gray-700 text-white placeholder-gray-400
// //                          focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
// //               value={confirmPassword}
// //               onChange={handleConfirmPasswordChange} // Use new handler
// //               required
// //               disabled={loading}
// //             />
// //             <button
// //               type="button" // Important: type="button" to prevent form submission
// //               onClick={() => setShowPassword(!showPassword)}
// //               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
// //               style={{ top: '1.75rem' }} // Adjust icon position if needed, or remove for default alignment
// //               disabled={loading}
// //             >
// //               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //             </button>
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
// //                        text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
// //                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //             disabled={loading || !arePasswordRequirementsMet || password !== confirmPassword} // Disable if requirements not met or passwords don't match
// //           >
// //             {loading ? "Signing Up..." : "Sign Up"}
// //           </button>
// //         </form>

// //         <p className="mt-6 text-center text-sm text-gray-400">
// //           Already have an account?{" "}
// //           <button
// //             onClick={() => navigate('/signin')}
// //             className="font-medium text-purple-400 hover:text-purple-300 focus:outline-none focus:underline transition-colors"
// //             disabled={loading}
// //           >
// //             Sign In
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUp;
