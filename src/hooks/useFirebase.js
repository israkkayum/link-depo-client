import { useState, useEffect, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import initializeAuthentication from "../components/Security/Firebase/firebase.init";
import { render } from "react-dom";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authInfo, setAuthInfo] = useState("");
  const [admin, setAdmin] = useState(false);
  const [getuser, setGetuser] = useState([]);
  const isHave = useRef(false);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password, name, navigate) => {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        setAuthInfo("");

        const newUser = { email, displayName: name };
        setUser(newUser);
        saveUser(email, name, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        navigate("/");
      })
      .catch((error) => {
        setAuthInfo("");
        setAuthError("This email already registered.");
      })
      .finally(() => setIsLoading(false));
  };

  const loginUser = (email, password, location, navigate) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        setAuthInfo("");

        const destination = location?.state?.from || "/";
        navigate(destination);
      })
      .catch((error) => {
        setAuthInfo("");
        setAuthError("Email address or password are incorrect.");
      })
      .finally(() => setIsLoading(false));
  };

  const signInWithGoogle = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        getuser.map((check) => {
          if (check.email == user.email) {
            isHave.current = true;
          }
        });

        if (isHave.current) {
          saveUser(user.email, user.displayName, "PUT");
        } else {
          saveUser(user.email, user.displayName, "POST");
        }

        if (location.state) {
          let from = location.state.from.pathname || "/";
          navigate(from, { replace: true });
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setAuthError("");
        setAuthInfo(
          "Your request successfully submitted! Please check your email ..."
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const emailVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  const deleteUserAccount = () => {
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  useEffect(() => {
    fetch(`http://localhost:65000/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("http://localhost:65000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  useEffect(() => {
    fetch("http://localhost:65000/users")
      .then((res) => res.json())
      .then((data) => setGetuser(data));
  }, []);

  return {
    user,
    isLoading,
    authError,
    authInfo,
    admin,
    registerUser,
    loginUser,
    logout,
    resetPassword,
    emailVerification,
    deleteUserAccount,
    signInWithGoogle,
  };
};

export default useFirebase;
