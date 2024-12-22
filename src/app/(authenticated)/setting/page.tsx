"use client"

import RoundedButton from "@/src/components/RoundedButton"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router";

export default function Home() {
    return (
        <div>
            <div>
                せってぃんぐ
            </div>
            <div className="p-5 flex justify-between">
                <button className="bg-white outline outline-1" 
                        onClick={()=>{signOut({callbackUrl: '/calendar'});}}>
                    ログアウト
                </button>
            </div>
        </div>
    )
}
