import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-xl w-full p-6 mb-48">
        <div className="flex justify-end mb-2">
          {user ? (
            <button
              onClick={signOut}
              className="text-sm text-gray-500 hover:underline"
            >
              Sair ({user.email})
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="text-sm text-gray-500 hover:underline"
            >
              Entrar
            </button>
          )}
        </div>

        {children}

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </main>
  );
}
