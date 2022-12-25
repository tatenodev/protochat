import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";

export function useSession() {
  const router = useRouter();
  const [isLoadingSession, setIsLoadingSession] = useState(false);

  useEffect(() => {
    setIsLoadingSession(true);
    supabase.auth
      .getSession()
      .then((res) => {
        if (res.data.session) return setIsLoadingSession(false);
        router.replace("/login");
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        setIsLoadingSession(false);
      });
  }, [router]);

  return {
    isLoadingSession,
  };
}
