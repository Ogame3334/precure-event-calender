"use client"

import Image from "next/image"
import './CustomHeader.css'
import Link from "next/link"
import AccountButton from "./AccountButton"
import { useSession } from "next-auth/react"


const CustomHeader = () => {
  const {data: session, status} = useSession();

  return (
    <header className="fixed h-14 w-full border-b p-1 page-header z-50">
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
          <AccountButton session={session} status={status}/>

        </div>
      </div>
    </header>
  )
}

export { CustomHeader }
