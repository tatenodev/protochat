export default function Login() {
  const handleLogin = () => {
    alert("ログインする");
  };

  return (
    <main>
      <section>
        <h1>ログイン</h1>
        <div>
          <button onClick={handleLogin}>googleログイン</button>
        </div>
      </section>
    </main>
  );
}
