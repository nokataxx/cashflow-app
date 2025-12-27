import { useState } from "react";
import { CashFlowInput } from "@/components/cashflow/CashFlow";
import { Header } from "@/components/layout/Header";
import { GuestBanner } from "@/components/layout/GuestBanner";
import { Footer } from "@/components/layout/Footer";
import { SignIn } from "@/components/auth/SignIn";
import { SignUp } from "@/components/auth/SignUp";
import { useAuth } from "@/hooks/useAuth";

function App() {
  const { user, signOut } = useAuth();
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleLogin = () => {
    setSignInOpen(true);
  };

  const handleSignUp = () => {
    setSignUpOpen(true);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleSwitchToSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const handleSwitchToSignIn = () => {
    setSignUpOpen(false);
    setSignInOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        user={user}
        onLoginClick={handleLogin}
        onSignUpClick={handleSignUp}
        onLogoutClick={handleLogout}
      />

      {!user && <GuestBanner />}

      <main className="flex-1 container mx-auto px-4 py-6">
        <CashFlowInput />
      </main>

      <Footer />

      <SignIn
        open={signInOpen}
        onOpenChange={setSignInOpen}
        onSwitchToSignUp={handleSwitchToSignUp}
      />

      <SignUp
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </div>
  );
}

export default App;
