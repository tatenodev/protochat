import Link from "next/link";

export default function Top() {
  return (
    <main>
      <h1>proto chat</h1>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/channels/me">Channel me</Link>
        </li>
      </ul>
    </main>
  );
}
