import { useRouter } from "next/router";
import { css } from "@emotion/css";
import { supabase } from "utils/supabaseClient";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function ChannelsTemplate() {
  const router = useRouter();
  const { channelId } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const handleLogout = async () => {
    setIsLoadingLogout(true);
    const { error } = await supabase.auth.signOut();
    console.log(error);
    setIsLoadingLogout(false);
    router.replace("/");
  };

  return (
    <div className={Container}>
      <nav className={Nav}>
        <div>{user?.user_metadata.name}</div>
        <ul>
          <li>todo</li>
          <li>idea</li>
        </ul>
        <div>
          {isLoadingLogout ? (
            <div>ログアウト中</div>
          ) : (
            <button type="button" onClick={handleLogout}>
              ログアウト
            </button>
          )}
        </div>
      </nav>
      <main className={Main}>
        <h1>チャンネルタイトル</h1>
        <div>text log</div>
        <div>text log</div>
        <div>text log</div>
        <div>text log</div>
        <div>text log</div>
        <div>
          <input type="text" />
        </div>
      </main>
    </div>
  );
}

const Container = css`
  display: flex;
`;
const Nav = css`
  flex-shrink: 0;
`;
const Main = css`
  width: 100%;
`;
