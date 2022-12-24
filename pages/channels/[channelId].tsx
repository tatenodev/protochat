import { useRouter } from "next/router";
import { css } from "@emotion/css";

export default function Channel() {
  const router = useRouter();
  const { channelId } = router.query;
  console.log(`channelId: ${channelId}`);

  return (
    <div className={Container}>
      <nav className={Nav}>
        <div>ユーザー名</div>
        <ul>
          <li>todo</li>
          <li>idea</li>
        </ul>
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
