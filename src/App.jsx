import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserAvatar,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/clerk-react";

import { Toaster } from "react-hot-toast";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <Home /> : navigate("/dashboard")}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <Dashboard /> : navigate("/")}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
