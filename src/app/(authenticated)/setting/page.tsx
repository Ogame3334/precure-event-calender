"use client"

import { signOut } from "next-auth/react"

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
