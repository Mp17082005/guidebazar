// // src/context/AuthContext.tsx
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { onAuthChange, AuthUser } from "@/utils/auth"; // Adjust path if necessary

// interface AuthContextType {
//   currentUser: AuthUser | null;
//   loading: boolean;
// }

// // Create the context with a default undefined value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// // IMPORTANT: Ensure 'export' keyword is here
// export const AuthContextProvider: React.FC<AuthProviderProps> = ({
//   children,
// }) => {
//   const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
//   const [loading, setLoading] = useState(true); // Initially true as we are loading auth state

//   console.log(
//     "AuthContextProvider: Initializing. Current loading state:",
//     loading
//   );

//   useEffect(() => {
//     console.log("AuthContextProvider: useEffect triggered.");
//     const unsubscribe = onAuthChange((user) => {
//       console.log(
//         "AuthContextProvider: onAuthChange callback received user:",
//         user
//       );
//       setCurrentUser(user);
//       setLoading(false); // Set loading to false once the initial auth state is determined
//       console.log(
//         "AuthContextProvider: State updated. currentUser:",
//         user,
//         "loading:",
//         false
//       );
//     });

//     // Cleanup the subscription when the component unmounts
//     return () => {
//       console.log(
//         "AuthContextProvider: Cleaning up onAuthChange subscription."
//       );
//       unsubscribe();
//     };
//   }, []); // Empty dependency array means this effect runs once on mount

//   console.log(
//     "AuthContextProvider: Rendering with currentUser:",
//     currentUser,
//     "loading:",
//     loading
//   );

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // IMPORTANT: Ensure 'export' keyword is here
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     console.error("useAuth called outside of AuthContextProvider!");
//     throw new Error("useAuth must be used within an AuthContextProvider");
//   }
//   console.log(
//     "useAuth hook: Returning context. currentUser:",
//     context.currentUser,
//     "loading:",
//     context.loading
//   );
//   return context;
// };
// src/context/AuthContext.tsx
// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthChange, signOutUser, AuthUser } from "@/utils/auth"; // Import auth utilities and AuthUser type

// --- User Context Type Definition ---
interface AuthContextType {
  currentUser: AuthUser | null;
  loadingAuth: boolean;
  signOut: () => Promise<void>;
}

// --- Create the AuthContext ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- AuthProvider Component ---
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    console.log("AuthContext.tsx: AuthProvider - Setting up auth state listener.");
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
      console.log("AuthContext.tsx: AuthProvider - Auth state changed. User:", user ? user.email + " (Role: " + user.role + ")" : "none");
    });

    return () => {
      console.log("AuthContext.tsx: AuthProvider - Cleaning up auth state listener.");
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("AuthContext.tsx: AuthProvider - Failed to sign out:", error);
      // Using alert for simplicity, consider a custom modal for better UX
      alert("Failed to sign out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loadingAuth, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Custom useAuth Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error indicates useAuth is called outside of AuthProvider
    console.error("AuthContext.tsx: useAuth called outside of AuthProvider!");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
