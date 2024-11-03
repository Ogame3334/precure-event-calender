"use client"

import { User } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(){
    const [displayName, setDisplayName] = useState("ユーザー");
    const [user, setUser] = useState<User>();
    
    const params = useParams();

    const user_id = params.user_id;

    useEffect(()=>{
        const fetchUser = async () => {
            const response = await fetch("/api/user");
            const tempUser = await response.json();
            setDisplayName(tempUser.name);
            setUser(tempUser);
            console.log(tempUser);
        };
        fetchUser();
    }, []);
    
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
                {user?.name}
            </div>
            <div className="text-center text-gray-500 my-1">
                @{user?.user_id}
            </div>
        </div>
    )
}
