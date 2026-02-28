import { SignInButton } from "@clerk/clerk-react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Welcome to Talent IQ</h1>
      <SignInButton mode="model" />
    </>
  );
}

export default App;
