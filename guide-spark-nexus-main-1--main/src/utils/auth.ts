// src/utils/auth.ts
import { auth, db } from "@/firebase"; // Import db (Firestore)
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

// --- Type Definition for User (UPDATED to include role) ---
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "user" | "admin"; // Add role property
}

// --- Helper to convert Firebase User object to our AuthUser interface ---
// Now fetches user profile from the correct Firestore collection ('users' or 'admins')
const mapFirebaseUserToAuthUser = async (
  user: User | null
): Promise<AuthUser | null> => {
  if (user) {
    // Try to get user document from 'users' collection first
    const userDocInUsersRef = doc(db, "users", user.uid);
    const userDocInUsersSnap = await getDoc(userDocInUsersRef);

    if (userDocInUsersSnap.exists()) {
      // Found in 'users' collection, so the role is 'user'
      const userData = userDocInUsersSnap.data();
      return {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName || user.displayName, // Prefer stored display name, fallback to auth
        photoURL: userData.photoURL || user.photoURL, // Prefer stored photoURL, fallback to auth
        role: "user", // Explicitly set role based on collection
      };
    }

    // If not found in 'users', try 'admins' collection
    const userDocInAdminsRef = doc(db, "admins", user.uid);
    const userDocInAdminsSnap = await getDoc(userDocInAdminsRef);

    if (userDocInAdminsSnap.exists()) {
      // Found in 'admins' collection, so the role is 'admin'
      const userData = userDocInAdminsSnap.data();
      return {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName || user.displayName,
        photoURL: userData.photoURL || user.photoURL,
        role: "admin", // Explicitly set role based on collection
      };
    }

    // If user document doesn't exist in either collection (e.g., first time Google sign-in
    // or a legacy account not created via your signup flow), default to 'user' and create doc.
    console.warn(
      "User document not found in 'users' or 'admins' collections for UID:",
      user.uid,
      ". Creating default 'user' profile."
    );
    const defaultUserDocRef = doc(db, "users", user.uid);
    await setDoc(defaultUserDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split("@")[0] || "New User",
      createdAt: new Date(),
      role: "user", // Explicitly set role for this default creation
    });
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "user",
    };
  }
  return null;
};

// --- Helper function to get friendly error messages ---
export const getFriendlyErrorMessage = (error: any): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "The email address is not valid. Please check and try again.";
      case "auth/user-disabled":
        return "Your account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "No user found with this email. Please check your email or sign up.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already registered. Please sign in or use a different email.";
      case "auth/weak-password":
        return "Password is too weak. Please use a stronger password.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in is not enabled. Please contact support.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection and try again.";
      case "auth/too-many-requests":
        return "Too many login attempts. Please try again later.";
      case "auth/popup-closed-by-user":
        return "Authentication process cancelled. Please try again.";
      default:
        return (
          error.message
            .replace("Firebase: ", "")
            .replace(/\(auth\/.*\)\.?/, "")
            .trim() || "An unexpected error occurred. Please try again."
        );
    }
  }
  return error.message || "An unknown error occurred. Please try again.";
};

// --- Email/Password Sign Up (UPDATED to save to 'users' or 'admins' collection) ---
export const signUpWithEmail = async (
  email: string,
  password: string,
  role: "user" | "admin" // Accept role parameter
): Promise<AuthUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!userCredential.user) {
      throw new Error("User creation failed.");
    }
    const userId = userCredential.user.uid;

    let collectionName: string;
    if (role === "admin") {
      collectionName = "admins";
      console.log(
        `Attempting to save admin user to '${collectionName}' collection: ${email}`
      );
    } else {
      collectionName = "users";
      console.log(
        `Attempting to save regular user to '${collectionName}' collection: ${email}`
      );
    }

    const userDocRef = doc(db, collectionName, userId);

    await setDoc(userDocRef, {
      uid: userId,
      email: userCredential.user.email,
      displayName: userCredential.user.email?.split("@")[0] || "New User",
      createdAt: new Date(),
      role: role, // Store role field, even if collection path indicates it (good for redundancy/easier queries)
    });
    console.log(
      `New user profile created in Firestore for: ${userCredential.user.email} with role: ${role} in collection: ${collectionName}`
    );

    // Return the full AuthUser object with the assigned role by fetching it
    return (await mapFirebaseUserToAuthUser(userCredential.user))!;
  } catch (error: any) {
    console.error("Error signing up with email:", error);
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// --- Email/Password Sign In (No changes needed here, role is fetched by mapFirebaseUserToAuthUser) ---
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!userCredential.user) {
      throw new Error("User sign-in failed.");
    }
    // Return the full AuthUser object with the fetched role
    return (await mapFirebaseUserToAuthUser(userCredential.user))!;
  } catch (error: any) {
    console.error("Error signing in with email:", error);
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// --- Google Sign In (Keeping for completeness, role handled by mapFirebaseUserToAuthUser) ---
export const signInWithGoogle = async (): Promise<AuthUser> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (!result.user) {
      throw new Error("Google sign-in failed.");
    }
    return (await mapFirebaseUserToAuthUser(result.user))!; // Fetch the full AuthUser with role
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    throw new Error(getFriendlyErrorMessage(error));
  }
};

// --- Sign Out ---
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
  } catch (error: any) {
    console.error("Error signing out:", error);
    throw new Error(error.message || "Failed to sign out.");
  }
};

// --- Auth State Listener (UPDATED to handle potential Firestore read delays) ---
export const onAuthChange = (callback: (user: AuthUser | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      let authUserWithRole: AuthUser | null = null;
      let retries = 0;
      const maxRetries = 5;
      const delayMs = 500; // 500ms delay between retries

      while (retries < maxRetries) {
        try {
          authUserWithRole = await mapFirebaseUserToAuthUser(user);
          if (authUserWithRole && authUserWithRole.role) {
            // Ensure role is present
            // If user data with role is successfully fetched, break the loop
            break;
          }
        } catch (error) {
          console.error(
            `Attempt ${retries + 1} to fetch user role failed:`,
            error
          );
        }
        retries++;
        if (retries < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs)); // Wait before retrying
        }
      }

      if (!authUserWithRole || !authUserWithRole.role) {
        console.error(
          "Failed to retrieve user role after multiple retries. Defaulting to null."
        );
        callback(null); // Explicitly pass null if role couldn't be determined
      } else {
        callback(authUserWithRole);
      }
    } else {
      callback(null);
    }
  });
};

// // src/utils/auth.ts
// import { auth, db } from "@/firebase"; // CORRECTED: Ensures use of alias
// import { FirebaseError } from "firebase/app";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signOut,
//   onAuthStateChanged,
//   User,
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// // --- Type Definition for User (UPDATED to include role) ---
// export interface AuthUser {
//   uid: string;
//   email: string | null;
//   displayName: string | null;
//   photoURL: string | null;
//   role: "user" | "admin"; // Add role property
// }

// // --- Helper to convert Firebase User object to our AuthUser interface ---
// // Now also fetches user profile from Firestore
// const mapFirebaseUserToAuthUser = async (
//   user: User | null
// ): Promise<AuthUser | null> => {
//   if (user) {
//     const userDocRef = doc(db, "users", user.uid);
//     const userDocSnap = await getDoc(userDocRef);

//     let role: "user" | "admin" = "user"; // Default role

//     if (userDocSnap.exists()) {
//       const userData = userDocSnap.data();
//       // Ensure role is valid, default to 'user' if not explicitly 'admin'
//       role = userData.role === "admin" ? "admin" : "user";
//     } else {
//       // If user document doesn't exist (e.g., first time sign-in via Google, or old user)
//       // Create a new document with default role
//       await setDoc(userDocRef, {
//         uid: user.uid,
//         email: user.email,
//         displayName:
//           user.displayName || user.email?.split("@")[0] || "New User",
//         createdAt: new Date(),
//         role: "user", // Assign default role 'user'
//       });
//       console.log("New user profile created in Firestore for:", user.email);
//     }

//     return {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       role: role,
//     };
//   }
//   return null;
// };

// // --- Helper function to get friendly error messages ---
// export const getFriendlyErrorMessage = (error: any): string => {
//   if (error instanceof FirebaseError) {
//     switch (error.code) {
//       case "auth/invalid-email":
//         return "The email address is not valid. Please check and try again.";
//       case "auth/user-disabled":
//         return "Your account has been disabled. Please contact support.";
//       case "auth/user-not-found":
//         return "No user found with this email. Please check your email or sign up.";
//       case "auth/wrong-password":
//         return "Incorrect password. Please try again.";
//       case "auth/email-already-in-use":
//         return "This email is already registered. Please sign in or use a different email.";
//       case "auth/weak-password":
//         return "Password is too weak. Please use a stronger password.";
//       case "auth/operation-not-allowed":
//         return "Email/password sign-in is not enabled. Please contact support.";
//       case "auth/network-request-failed":
//         return "Network error. Please check your internet connection and try again.";
//       case "auth/too-many-requests":
//         return "Too many login attempts. Please try again later.";
//       case "auth/popup-closed-by-user":
//         return "Authentication process cancelled. Please try again.";
//       default:
//         return (
//           error.message
//             .replace("Firebase: ", "")
//             .replace(/\(auth\/.*\)\.?/, "")
//             .trim() || "An unexpected error occurred. Please try again."
//         );
//     }
//   }
//   return error.message || "An unknown error occurred. Please try again.";
// };

// // --- Email/Password Sign Up (UPDATED to create Firestore profile) ---
// export const signUpWithEmail = async (
//   email: string,
//   password: string
// ): Promise<AuthUser> => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     if (!userCredential.user) {
//       throw new Error("User creation failed.");
//     }
//     // Create user profile in Firestore immediately after successful signup
//     const userDocRef = doc(db, "users", userCredential.user.uid);
//     await setDoc(userDocRef, {
//       uid: userCredential.user.uid,
//       email: userCredential.user.email,
//       displayName: userCredential.user.email?.split("@")[0] || "New User", // Default display name
//       createdAt: new Date(),
//       role: "user", // Assign default role 'user'
//     });
//     console.log(
//       "New user profile created in Firestore for:",
//       userCredential.user.email
//     );

//     // Return the full AuthUser object with the assigned role
//     return (await mapFirebaseUserToAuthUser(userCredential.user))!;
//   } catch (error: any) {
//     console.error("Error signing up with email:", error);
//     throw new Error(getFriendlyErrorMessage(error));
//   }
// };

// // --- Email/Password Sign In (UPDATED to fetch Firestore profile) ---
// export const signInWithEmail = async (
//   email: string,
//   password: string
// ): Promise<AuthUser> => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     if (!userCredential.user) {
//       throw new Error("User sign-in failed.");
//     }
//     // Return the full AuthUser object with the fetched role
//     return (await mapFirebaseUserToAuthUser(userCredential.user))!;
//   } catch (error: any) {
//     console.error("Error signing in with email:", error);
//     throw new Error(getFriendlyErrorMessage(error));
//   }
// };

// // --- Google Sign In (Keeping for completeness, though not used in UI currently) ---
// export const signInWithGoogle = async (): Promise<AuthUser> => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     if (!result.user) {
//       throw new Error("Google sign-in failed.");
//     }
//     return (await mapFirebaseUserToAuthUser(result.user))!; // Fetch the full AuthUser with role
//   } catch (error: any) {
//     console.error("Error signing in with Google:", error);
//     throw new Error(getFriendlyErrorMessage(error));
//   }
// };

// // --- Sign Out ---
// export const signOutUser = async (): Promise<void> => {
//   try {
//     await signOut(auth);
//     console.log("User signed out successfully.");
//   } catch (error: any) {
//     console.error("Error signing out:", error);
//     throw new Error(getFriendlyErrorMessage(error));
//   }
// };

// // --- Auth State Listener (UPDATED to fetch Firestore profile) ---
// export const onAuthChange = (callback: (user: AuthUser | null) => void) => {
//   return onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const authUserWithRole = await mapFirebaseUserToAuthUser(user);
//       callback(authUserWithRole);
//     } else {
//       callback(null);
//     }
//   });
// };

// // // src/utils/auth.ts
// // import { auth } from "../../firebase"; // ✅ CORRECT
// // import { FirebaseError } from "firebase/app";
// // // Import the initialized auth instance
// // import {
// //   createUserWithEmailAndPassword,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// //   GoogleAuthProvider,
// //   signOut,
// //   onAuthStateChanged,
// //   User,
// // } from "firebase/auth";

// // // --- Type Definition for User ---
// // // This interface can be expanded if you store more user data in Firestore
// // export interface AuthUser {
// //   uid: string;
// //   email: string | null;
// //   displayName: string | null;
// //   photoURL: string | null;
// // }

// // // --- Helper to convert Firebase User object to our AuthUser interface ---
// // const mapFirebaseUserToAuthUser = (user: User | null): AuthUser | null => {
// //   if (user) {
// //     return {
// //       uid: user.uid,
// //       email: user.email,
// //       displayName: user.displayName,
// //       photoURL: user.photoURL,
// //     };
// //   }
// //   return null;
// // };

// // // --- Email/Password Sign Up ---
// // export const signUpWithEmail = async (
// //   email: string,
// //   password: string
// // ): Promise<AuthUser> => {
// //   try {
// //     const userCredential = await createUserWithEmailAndPassword(
// //       auth,
// //       email,
// //       password
// //     );
// //     if (!userCredential.user) {
// //       throw new Error("User creation failed.");
// //     }
// //     return mapFirebaseUserToAuthUser(userCredential.user)!; // Non-null assertion as user should exist
// //   } catch (error: any) {
// //     console.error("Error signing up with email:", error);
// //     throw new Error(error.message || "Failed to sign up with email.");
// //   }
// // };

// // // --- NEW: Helper function to get friendly error messages ---
// // export const getFriendlyErrorMessage = (error: any): string => {
// //   if (error instanceof FirebaseError) {
// //     switch (error.code) {
// //       case 'auth/invalid-email':
// //         return 'The email address is not valid. Please check and try again.';
// //       case 'auth/user-disabled':
// //         return 'Your account has been disabled. Please contact support.';
// //       case 'auth/user-not-found':
// //         return 'No user found with this email. Please check your email or sign up.';
// //       case 'auth/wrong-password':
// //         return 'Incorrect password. Please try again.';
// //       case 'auth/email-already-in-use':
// //         return 'This email is already registered. Please sign in or use a different email.';
// //       case 'auth/weak-password':
// //         return 'Password is too weak. Please use a stronger password.'; // Less likely to hit due to client-side validation, but good to have.
// //       case 'auth/operation-not-allowed':
// //         return 'Email/password sign-in is not enabled. Please contact support.';
// //       case 'auth/network-request-failed':
// //         return 'Network error. Please check your internet connection and try again.';
// //       case 'auth/too-many-requests':
// //         return 'Too many login attempts. Please try again later.';
// //       case 'auth/popup-closed-by-user': // Although Google sign-in is removed, keeping this for robustness
// //         return 'Authentication process cancelled. Please try again.';
// //       default:
// //         // For unknown Firebase errors, try to clean up the message
// //         return error.message.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim() || 'An unexpected error occurred. Please try again.';
// //     }
// //   }
// //   // For non-Firebase errors or generic JS errors
// //   return error.message || 'An unknown error occurred. Please try again.';
// // };

// // // --- Email/Password Sign In ---
// // export const signInWithEmail = async (
// //   email: string,
// //   password: string
// // ): Promise<AuthUser> => {
// //   try {
// //     const userCredential = await signInWithEmailAndPassword(
// //       auth,
// //       email,
// //       password
// //     );
// //     if (!userCredential.user) {
// //       throw new Error("User sign-in failed.");
// //     }
// //     return mapFirebaseUserToAuthUser(userCredential.user)!;
// //   } catch (error: any) {
// //     console.error("Error signing in with email:", error);
// //     throw new Error(error.message || "Failed to sign in with email.");
// //   }
// // };

// // // --- Google Sign In (using Popup) ---
// // export const signInWithGoogle = async (): Promise<AuthUser> => {
// //   try {
// //     const provider = new GoogleAuthProvider();
// //     const result = await signInWithPopup(auth, provider);
// //     if (!result.user) {
// //       throw new Error("Google sign-in failed.");
// //     }
// //     return mapFirebaseUserToAuthUser(result.user)!;
// //   } catch (error: any) {
// //     console.error("Error signing in with Google:", error);
// //     // Handle specific Google auth errors if needed (e.g., popup closed by user)
// //     throw new Error(error.message || "Failed to sign in with Google.");
// //   }
// // };

// // // --- Sign Out ---
// // export const signOutUser = async (): Promise<void> => {
// //   try {
// //     await signOut(auth);
// //     console.log("User signed out successfully.");
// //   } catch (error: any) {
// //     console.error("Error signing out:", error);
// //     throw new Error(error.message || "Failed to sign out.");
// //   }
// // };

// // // --- Auth State Listener (for managing user session in React context/state) ---
// // // This function is not directly exported for use in components,
// // // but rather the onAuthStateChanged listener itself is used in App.tsx
// // // or a dedicated AuthContext.
// // export const onAuthChange = (callback: (user: AuthUser | null) => void) => {
// //   return onAuthStateChanged(auth, (user) => {
// //     callback(mapFirebaseUserToAuthUser(user));
// //   });
// // };
