"use client"

import { Session } from "next-auth"
import Image from "next/image"
import { ReactNode, useState } from "react"
import './CustomHeader.css'
import Link from "next/link"
import { useRouter } from "next/navigation"

interface LinkButtonProps{
  href: string;
  children: ReactNode;
}


const CustomHeader = ({ session }: { session: Session | null }) => {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  const LinkButton = (props: LinkButtonProps) => {
    const router = useRouter();
  
    return (
      <div className="w-full p-5">
        <button className="w-full text-3xl" onClick={()=>{
          router.push(props.href);
          setIsOpenedMenu(false);
        }}>
          {props.children}
        </button>
      </div>
    )
  }

  return (
    <header className="fixed h-14 w-full border-b p-1 page-header z-50">
      {/* <h1 className="text-center font-bold text-base md:text-2xl text-gray-700">
                    プリキュアイベントカレンダー
                </h1> */}
      <div className="flex justify-between">
        <Link className="flex items-center"
         href={"/"}>
          <Image
            src="/precale_logo.png"
            width={120}
            height={72}
            alt="precale logo"
          />
        </Link>
        <div className="flex items-center">
          <button onClick={() => { setIsOpenedMenu(!isOpenedMenu) }}>
            <div
              className={"burgerbtn " + (isOpenedMenu ? "active" : "")}
              onClick={() => { setIsOpenedMenu(!isOpenedMenu) }}
            >
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </div>
      {/* z-indexが上手くいかないよ～～～ */}
      <div className={`fixed top-14 ${isOpenedMenu ? "left-0" : "left-full"} w-full h-full header-menu z-40 transition-all duration-500`}>
        <div className="m-10 flex flex-col">
          <LinkButton href="/">
            TOP
          </LinkButton>
          <LinkButton href="/mypage">
            マイページ
          </LinkButton>
        </div>
      </div>
    </header>
  )
}

export { CustomHeader }
