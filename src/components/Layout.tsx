import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onFavoritesPage = location.pathname === "/favorites";

  const handleSignOut = async () => {
    await signOut();
    if (location.pathname !== "/") navigate("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-xl w-full p-6 mb-48">
        <div className="flex justify-between items-center mb-2">
          {user && (
            <button
              onClick={() => navigate(onFavoritesPage ? "/" : "/favorites")}
              className="text-sm text-gray-500 hover:underline"
            >
              {onFavoritesPage ? "← Buscar filmes" : "★ Favoritos"}
            </button>
          )}
          <div className="ml-auto">
            {user ? (
              <button onClick={handleSignOut} className="text-sm text-gray-500 hover:underline">
                Sair ({user.email})
              </button>
            ) : (
              <button onClick={() => setShowAuth(true)} className="text-sm text-gray-500 hover:underline">
                Entrar
              </button>
            )}
          </div>
        </div>

        {children}

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    </main>
  );
}
