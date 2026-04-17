import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export function useUserPlatforms() {
  const { user } = useAuth();
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      setPlatforms([]);
      setLoaded(true);
      return;
    }
    supabase
      .from("user_platforms")
      .select("platform")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setPlatforms((data ?? []).map((r: any) => r.platform));
        setLoaded(true);
      });
  }, [user]);

  const togglePlatform = async (platform: string) => {
    const isSelected = platforms.includes(platform);
    if (isSelected) {
      setPlatforms(prev => prev.filter(p => p !== platform));
      if (user) {
        await supabase
          .from("user_platforms")
          .delete()
          .eq("user_id", user.id)
          .eq("platform", platform);
      }
    } else {
      setPlatforms(prev => [...prev, platform]);
      if (user) {
        await supabase
          .from("user_platforms")
          .insert({ user_id: user.id, platform });
      }
    }
  };

  return { platforms, togglePlatform, loaded };
}
