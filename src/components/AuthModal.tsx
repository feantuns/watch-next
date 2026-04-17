import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabase";

interface AuthModalProps {
  onClose: () => void;
}

type Mode = "login" | "signup";

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onClose();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Verifique seu e-mail para confirmar o cadastro.");
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="p-2 border rounded outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="p-2 border rounded outline-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white py-2 rounded font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? "..." : mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <button
          onClick={() => { setMode(m => m === "login" ? "signup" : "login"); setError(null); setMessage(null); }}
          className="mt-3 text-sm text-gray-500 hover:underline w-full text-center"
        >
          {mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entre"}
        </button>
      </div>
    </div>
  );
}
