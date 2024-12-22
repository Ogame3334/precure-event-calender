"use client"

import { useEffect, useState } from "react";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [canSignUp, setCanSignUp] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPushedButton, setIsPushedButton] = useState<boolean>(false);
  const [isSended, setIsSended] = useState<boolean>(false);

  useEffect(()=>{
    setCanSignUp(email !== "" && isValidEmail(email));
  }, [email]);

  const handleTempSignUp = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsPushedButton(true);

    const res = await fetch('/api/tempregist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if(res.status != 200){
      setErrorMessage("エラーが発生しました。");
      setIsPushedButton(false);
    }

    const {code, message} = await res.json() as {code: number, message: string};

    if(code == 0) setIsSended(true);
    else{
      setErrorMessage(message);
      setIsPushedButton(false);
    }
  }

  return (
    <>
      <div className="p-5 text-xl text-center">
        アカウント登録
      </div>
      {isSended ? <div className="text-center">メールを送信しました。<br/>メールに記載されているURLからアカウント登録を行ってください。</div> : 
      (isPushedButton ? <div className="text-center">メールを送信中です......</div> :
        <>
      <div className="text-xs px-2">
        メールアドレス
      </div>
      <div className="p-2">
        <input
          type="text"
          className="w-full p-2 text-sm rounded-sm ountline ountline-1 outline-pink-100"
          value={email}
          placeholder="otter@example.com"
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="h-10 text-red-500">
        {errorMessage}
      </div>
      <div className="p-2 flex justify-center items-center">
        <button
          className={
            (canSignUp ? "bg-pink-300 outline-pink-400 active:translate-y-0.5 active:shadow-none" : "bg-gray-300 outline-gray-400")
            + " px-6 py-2 rounded-xl outline outline-1 shadow-md transition"
          }
          disabled={!canSignUp}
          onClick={e => handleTempSignUp(e)}
        >
          登録
        </button>
      </div>
      </>)
      }
    </>
  )
}
