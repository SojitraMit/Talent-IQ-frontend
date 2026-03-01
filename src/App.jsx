import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserAvatar,
  UserButton,
  UserProfile,
} from "@clerk/clerk-react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Welcome to Talent IQ</h1>
      <SignedOut>
        <SignInButton mode="model" />
      </SignedOut>
      <SignedIn>
        <SignOutButton mode="model">Sign Out</SignOutButton>
        <UserAvatar></UserAvatar>
      </SignedIn>
      <UserButton />
    </>
  );
}

export default App;
