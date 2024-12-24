"use client"

import { signIn, useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";

export default function Home(){
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  )
}

function LoginPage() {
  const { data: session, status } = useSession();

  const [displayIdOrEmail, setDisplayIdOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canLogin, setCanLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();


  useEffect(() => {
    if (status == "authenticated") {
      setIsRedirecting(true);
      router.push(redirectUrl);
    }
  }, [session, status]);

  useEffect(() => {
    if (displayIdOrEmail !== "" && password !== "")
      setCanLogin(true);
    else
      setCanLogin(false);
  }, [displayIdOrEmail, password])

  const handleLogin = async (event: React.MouseEvent) => {
    console.log("logining");
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      id: displayIdOrEmail,
      password: password,
      callbackUrl: redirectUrl
    });
    if (result?.ok) {
      setIsRedirecting(true);
      // router.push(redirectUrl);
    }
    else {
      setErrorMessage(result?.error || "");
    }
  }

  if(isRedirecting){
    return (
      <div className="text-center text-xl">
        リダイレクト中……
      </div>
    )
  }

  return (
    <>
      <div className="p-5 text-xl text-center">
        ログイン
      </div>
      <div className="text-sm px-2">
        ユーザーID <span className="text-xs">または</span> メールアドレス 
      </div>
      <div className="p-2">
        <input
          type="text"
          className="w-full p-2 text-sm rounded-sm outline outline-1 outline-pink-100"
          value={displayIdOrEmail}
          placeholder="UserID or user@example.com"
          onChange={e => setDisplayIdOrEmail(e.target.value)}
        />
      </div>
      <div className="text-sm px-2">
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
