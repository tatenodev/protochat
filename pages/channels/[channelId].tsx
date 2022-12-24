import { useRouter } from "next/router";

export default function Channel() {
  const router = useRouter();
  const { channelId } = router.query;
  console.log(`channelId: ${channelId}`);

  return (
    <div>
      <nav>
        <div>ユーザー名</div>
        <ul>
          <li>todo</li>
          <li>idea</li>
        </ul>
      </nav>
      <main>
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
