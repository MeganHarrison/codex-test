import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useUser } from '../lib/useUser';

export default function Home() {
  const { session } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
  };

  const signUp = async () => {
    setLoading(true);
    await supabase.auth.signUp({ email, password });
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn} disabled={loading}>Sign In</button>
        <button onClick={signUp} disabled={loading}>Sign Up</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome {session.user.email}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
