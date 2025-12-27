import { type User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onLogoutClick: () => void;
}

export function Header({
  user,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Cash Flow Statement
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button
                onClick={onLogoutClick}
                variant="ghost"
                size="sm"
                className="text-xs"
              >
                <LogOut className="h-4 w-4" />
                ログアウト
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={onSignUpClick}
                variant="ghost"
                size="sm"
                className="text-xs me-2"
              >
                <UserPlus className="h-4 w-4" />
                アカウント登録
              </Button>
              <Button onClick={onLoginClick} size="sm" className="text-xs">
                <LogIn className="h-4 w-4" />
                ログイン
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
