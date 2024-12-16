"use client"

import { signIn, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


export default function LoginPage() {
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canLogin, setCanLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("callbackUrl") || "/";


  useEffect(() => {
    if (status == "authenticated") {
      redirect(redirectUrl);
    }
  }, [session, status]);

  useEffect(() => {
    if (email !== "" && password !== "")
      setCanLogin(true);
    else
      setCanLogin(false);
  }, [email, password])

  const handleLogin = async (event: React.MouseEvent) => {
    console.log("logining");
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      id: email,
      password: password,
      callbackUrl: redirectUrl
    });
    if (result?.ok) {
      redirect(redirectUrl);
    }
    else {
      setErrorMessage(result?.error || "");
    }
  }

  return (
    <>
      <div className="p-5 text-xl text-center">
        ログイン
      </div>
      <div className="text-xs px-2">
        メールアドレス
      </div>
      <div className="p-2">
        <input
          type="text"
          className="w-full p-2 text-sm rounded-sm outline outline-1 outline-pink-100"
          value={email}
          placeholder="otter@example.com"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="text-xs px-2">
        パスワード
      </div>
      <div className="p-2">
        <input
          type="password"
          className="w-full p-2 text-sm rounded-sm outline outline-1 outline-pink-100"
          value={password}
          placeholder="パスワード"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="h-10 text-red-500">
        {errorMessage}
      </div>
      <div className="p-2 flex justify-center items-center">
        <button
          className={
            (canLogin ? "bg-pink-300 outline-pink-400 active:translate-y-0.5 active:shadow-none" : "bg-gray-300 outline-gray-400")
            + " px-6 py-2 rounded-xl outline outline-1 shadow-md transition"
          }
          disabled={!canLogin}
          onClick={e => handleLogin(e)}
        >
          ログイン
        </button>
      </div>
      <div className="text-sm py-2">
        パスワードを忘れた方はこちら
      </div>
      <div className="border-b border-pink-500 py-3 my-3" />
      <div className="p-2 flex justify-center items-center">
        <Link href={"/signup"}
          className="bg-pink-300 outline-pink-400 active:translate-y-0.5 active:shadow-none px-6 py-2 rounded-xl outline outline-1 shadow-md transition"
        >
          アカウント登録
        </Link>
      </div>
    </>
  )
}
