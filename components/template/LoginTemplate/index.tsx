import { useState } from "react";
import { supabase } from "utils/supabaseClient";

export default function LoginTemplate() {
  const [loading, setLoading] = useState(false);

  console.log(supabase.auth.getUser().then((res) => res));

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      console.log(result);
    } catch (err) {
      console.log(`err: ${err}`);
    } finally {
      setLoading(false);
    }
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
