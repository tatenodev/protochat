import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setIsLoadingSession } from "store/userSlice";
import { supabase } from "utils/supabaseClient";

export default function LoginTemplate() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoadingSession } = useAppSelector((state) => state.userInfo);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

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
    dispatch(setIsLoadingSession(true));
    supabase.auth.getSession().then((res) => {
      if (!res.data.session) return dispatch(setIsLoadingSession(false));
      router.replace("/channels/0000");
    });
  }, [router, dispatch]);

  if (isLoadingSession) return <div>Page Loading...</div>;

  return (
    <main>
      <section>
        <h1>ログイン</h1>
        <div>
          {isLoadingLogin ? (
            <div>ログイン中...</div>
          ) : (
            <button onClick={handleLogin}>googleログイン</button>
          )}
        </div>
      </section>
    </main>
  );
}
