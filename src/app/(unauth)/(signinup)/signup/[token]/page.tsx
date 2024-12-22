"use client"

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useBeforeUnload } from "react-router-dom"

function isUserId(userId: string): boolean {
  const userIdRegex = /^[a-zA-Z0-9_]+$/;
  return userIdRegex.test(userId);
}

export default function LoginPage() {
  useBeforeUnload(
    useCallback(
      (event)=>{
        if(window.confirm("行った変更が保存されない可能性があります。") === false){
          event.preventDefault();
          event.returnValue = "";
        }
      }, []
    )
  )
  
  const [displayId, setDisplayId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [iconSrc, setIconSrc] = useState<string>("/img/sample/icon/default.png");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [state, setState] = useState<number>(0);

  const [buttonText, setButtonText] = useState<string>("次へ");
  const [canPushButton, setCanPushButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePushButton = async () => {
    switch (state) {
      case 0: {
        if (!isUserId(displayId)) {
          setErrorMessage("英数字とアンダーバーのみを用いることができます。(a~z, A~Z, 0~9, _)")
          return;
        }

        const result = await fetch(`/api/user/${displayId}`);
        const res = await result.json();

        console.log(res);

        if (res) {
          setErrorMessage("そのユーザーIDは既に使用されています。")
        }
        else {
          setErrorMessage("");
          setCanPushButton(false);
          setState(state + 1);
        }
      }
      break;
      case 1:{
        setCanPushButton(true);
        setState(state + 1);
        break;
      }
      case 2:{
        setCanPushButton(false);
        setButtonText("登録");
        setState(state + 1);
        break;
      }
      case 3:{
        if(password !== confirmPassword){
          setErrorMessage("パスワードが一致していません。");
          break;
        }
        else{
            setErrorMessage("");
            setCanPushButton(true);
            setButtonText("トップヘ");
            setState(state + 1);
          }
        }
        default:
        setCanPushButton(false);
        setState(state + 1);
        break;
    }
    // setState(state + 1);
  }

  useEffect(() => {
    switch (state) {
      case 0:
        setCanPushButton(displayId != "");
        break;
      case 1:
        setCanPushButton(name != "");
        break;
      case 3:
        setCanPushButton(password != "" && confirmPassword != "");
        break;
      case 4:
        setCanPushButton(true);
        break;
          

      default:
        setCanPushButton(false);
        break;
    }
  }, [displayId, name, iconSrc, password, confirmPassword])

  return (
    <>
      <div className="p-5 text-xl text-center">
        アカウント登録
      </div>
      {(() => {
        switch (state) {
          case 0:
            return <>
              <div className="p-2 text-md text-center">
                ユーザーID
              </div>
              <div className="pb-5 text-sm text-center">
                ユーザーIDは、ユーザーの識別に用いられる名前です。
                アルファベットと英数字のみで、一意である必要があります。
              </div>
              <div className="text-xs px-2">
                ユーザーID
              </div>
              <div className="p-2">
                <input
                  type="text"
                  className="w-full p-2 text-sm rounded-sm ountline ountline-1 outline-pink-100"
                  value={displayId}
                  placeholder="UserId"
                  onChange={e => setDisplayId(e.target.value)}
                />
              </div>
            </>
          case 1:
            return <>
              <div className="p-2 text-md text-center">
                名前
              </div>
              <div className="pb-5 text-sm text-center">
                表示名です。お好きな名前を付けましょう。
              </div>
              <div className="text-xs px-2">
                名前
              </div>
              <div className="p-2">
                <input
                  type="text"
                  className="w-full p-2 text-sm rounded-sm ountline ountline-1 outline-pink-100"
                  value={name}
                  placeholder="名前"
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </>
          case 2:
            return <>
              <div className="p-2 text-md text-center">
                アイコン
              </div>
              <div className="flex justify-center items-center">
                <button>
                  <Image
                    src={iconSrc}
                    alt="icon"
                    width={80}
                    height={80}
                    className="m-2 rounded-full"
                  />
                </button>
              </div>
              <div className="pb-5 text-sm text-center">
                アイコンはあなたの顔です。<br />設定しましょう！
              </div>
            </>
          case 3:
            return <>
              <div className="p-2 text-md text-center">
                パスワード
              </div>
              <div className="pb-5 text-sm text-center">
                パスワードは誰にもわからないようなものを付けましょう！
              </div>
              <div className="text-xs px-2">
                パスワード
              </div>
              <div className="p-2">
                <input
                  type="text"
                  className="w-full p-2 text-sm rounded-sm ountline ountline-1 outline-pink-100"
                  value={password}
                  placeholder="名前"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="text-xs px-2">
                パスワード(もう一度)
              </div>
              <div className="p-2">
                <input
                  type="text"
                  className="w-full p-2 text-sm rounded-sm ountline ountline-1 outline-pink-100"
                  value={confirmPassword}
                  placeholder="名前"
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          case 4:
            return <>
              <div className="p-2 text-md text-center">
                アカウント登録が完了しました。
              </div>
            </>

          default:
            break;
        }
      })()}

      <div className="h-10 text-red-500">
        {errorMessage}
      </div>
      <div className="p-2 flex flex-row-reverse items-center">
        <button
          className={
            (canPushButton ? "bg-pink-300 outline-pink-400 active:translate-y-0.5 active:shadow-none" : "bg-gray-300 outline-gray-400")
            + " px-6 py-2 rounded-xl outline outline-1 shadow-md transition"
          }
          disabled={!canPushButton}
          onClick={e => handlePushButton()}
        >
          {buttonText}
        </button>
      </div>
    </>
  )
}
