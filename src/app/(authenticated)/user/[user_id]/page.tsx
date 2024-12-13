"use client"

import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(){
    const [user, setUser] = useState<User>();
    const [links, setLinks] = useState<string[]>([
        "", "", ""
    ]);
    const [events, setEvents] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [isPastEvent, setIsPastEvent] = useState<boolean>(false);

    const params = useParams();

    const user_id = params.user_id;

    useEffect(()=>{
        const fetchUser = async () => {
            const response = await fetch("/api/user");
            const tempUser = await response.json();
            setUser(tempUser);
            console.log(tempUser);
        };
        fetchUser();
    }, []);
    
    return (
        <div className="flex flex-col">
            <div className="p-5 flex flex-row-reverse">
                <Link href={""} className="p-2 outline outline-1 outline-black rounded-full">
                    フォローする
                </Link>
            </div>
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
            <div className="my-2">
                <div className="flex flex-row justify-center">
                    <Link href={""} className="mx-3">
                        <div>
                            100 フォロー
                        </div>
                    </Link>
                    <Link href={""} className="mx-3">
                        <div>
                            100 フォロワー
                        </div>
                    </Link>
                </div>
            </div>
            <div className="m-2 p-2 outline outline-1 outline-gray-400 rounded-lg bg-white">
                キュアアムール大好きおがめです！！<br/>
                仲良くしてね
            </div>
            <div className="py-5">
                <div className="text-xl text-center">
                    Links
                </div>
                <div className="flex justify-center">
                    {links.map(links=>(
                        <div className="p-2">
                            <Image alt="link_icon" src={"/ogame.jpg"} width={60} height={60} />
                        </div>
                        ))}
                </div>
            </div>
            <div className="py-5">
                <div className="text-xl text-center">
                    イベント 15
                </div>
                <div className="py-2 flex justify-center">
                    <div onClick={()=>setIsPastEvent(false)} className={"p-1 transition-all " + (isPastEvent ? " border-none" : " border-b border-b-pink-400")}>
                        参加予定
                    </div>
                    <div onClick={()=>setIsPastEvent(true)} className={"p-1 transition-all " + (!isPastEvent ? " border-none" : " border-b border-b-pink-400")}>
                        過去のイベント
                    </div>
                </div>
                <div className="p-2">
                    {events.map(event => (
                        <Link href={`/event/${event}`}>
                        <div
                             className="p-2 my-2 outline outline-1 outline-gray-400 rounded-md bg-white active:bg-gray-100 transition-colors">
                            <div className="text-xl">
                                イベント名
                            </div>
                            <div className="text-sm text-right">
                                2024/12/25
                            </div>
                            <div className="text-sm">
                                ほげほげホール
                            </div>
                            <div></div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
