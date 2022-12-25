import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";

export default function LoginTemplate() {
  const router = useRouter();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const handleLogin = () => {
    setIsLoadingLogin(true);
    supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/channels/0000",
        },
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        setIsLoadingLogin(false);
      });
  };

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      if (!res.data.session) return setIsLoadingSession(false);
      router.replace("/channels/0000");
    });
  }, [router]);

  if (isLoadingSession) return <div>Page Loading...</div>;

  return (
    <main>
      <section>
        <h1>ログイン</h1>
        <div>
          {!isLoadingLogin ? (
            <button onClick={handleLogin}>googleログイン</button>
          ) : (
            <div>ログイン中...</div>
          )}
        </div>
      </section>
    </main>
  );
}
