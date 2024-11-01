"use client"

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function Home(){
    const [displayName, setDisplayName] = useState("ユーザー");
    
    const params = useParams();

    const user_id = params.user_id;
    
    return (
        <div className="flex flex-col my-10">
            <div className="mx-auto">
                <Image 
                    src={"/sample/img/icon.png"} 
                    width={100} 
                    height={100} 
                    alt="icon"
                    objectFit="contain"
                    className="rounded-full"
                />
            </div>
            <div className="text-center text-xl my-1">
                {displayName}
            </div>
            <div className="text-center text-gray-500 my-1">
                @{user_id}
            </div>
        </div>
    )
}
