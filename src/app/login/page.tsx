"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
const input = "mt-[15px] h-14 w-full rounded-lg border border-[#D8D8D8] bg-panel px-4 text-lg text-ink outline-none placeholder:text-faint focus:border-brand dark:border-line";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand px-4 py-12">
      <span className="pointer-events-none absolute -top-[18%] left-[38%] h-[70%] w-[24%] rounded-[45%] bg-white/[0.05]" />
      <span className="pointer-events-none absolute -top-[10%] -right-[8%] h-[95%] w-[48%] rounded-[48%] bg-white/[0.05]" />
      <span className="pointer-events-none absolute top-[25%] -left-[10%] h-[60%] w-[35%] rounded-[46%] bg-white/[0.05]" />
      <span className="pointer-events-none absolute -bottom-[25%] left-[45%] h-[45%] w-[20%] rounded-[45%] bg-white/[0.05]" />
      <form
        className="relative w-full max-w-[630px] rounded-3xl bg-surface px-6 py-16 sm:px-[57px] sm:py-[90px]"
        onSubmit={(event) => {
          event.preventDefault();
          router.replace("/dashboard");
        }}
      >
        <h1 className="text-center text-[32px] leading-[44px] font-bold tracking-[-0.11px] text-ink">Login to Account</h1>
        <p className="mt-[15px] text-center text-lg font-semibold text-muted">Please enter your username and password to continue</p>
        <label className="mt-[37px] block text-lg font-semibold text-muted">
          Username:
          <input autoComplete="username" placeholder="admin" className={input} value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label className="mt-[40px] block text-lg font-semibold text-muted">
          Password
          <input type="password" autoComplete="current-password" placeholder="••••••" className={input} value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label className="mt-6 flex items-center gap-3 text-lg font-semibold text-muted">
          <input type="checkbox" checked={remember} className="h-[18px] w-[18px] accent-brand" onChange={(event) => setRemember(event.target.checked)} />
          Remember Password
        </label>
        <div className="mt-[64px] flex justify-center">
          <button type="submit" className="h-14 w-full max-w-[418px] rounded-lg bg-brand/90 text-xl font-bold text-white hover:bg-brand">
            Sign In
          </button>
        </div>
        <p className="mt-[23px] text-center text-lg font-semibold text-muted">No account is checked. Sign in opens the mock.</p>
      </form>
    </div>
  );
}
