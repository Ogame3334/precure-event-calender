"use client"

import FollowButton from "@/src/components/FollowButton";
import { Users } from "@prisma/client";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(){
    const [user, setUser] = useState<Users>();
    const [events, setEvents] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [isPastEvent, setIsPastEvent] = useState<boolean>(false);
    const [session, setSession] = useState<Session | null>(null);

    const params = useParams();

    const user_id = params.user_id;

    const getDomain = (url: string): string | null => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.hostname; // ドメイン部分を取得
        } catch (error) {
            console.error('無効なURLです:', error);
            return null; // 無効なURLの場合はnullを返す
        }
    }

    const LinkIcon = (link: string): string => {
        const domain = getDomain(link);
        if(!domain) return "/img/logos/link.svg";
        else{
            switch(domain){
                case "x.com":
                case "twitter.com":
                    return "/img/logos/x.svg";
                default:
                    return "/img/logos/link.svg";
            }
        }
    }

    useEffect(()=>{
        const fetchUser = async () => {
            const response = await fetch(`/api/user/${user_id}`);
            const tempUser = await response.json();
            setUser(tempUser);
        };
        fetchUser();
        const fetchSession = async () => {
            setSession(await getSession());
        }
        fetchSession();
    }, []);
    
    return (
        <div className="flex flex-col">
            {session ? <FollowButton session={session} /> : <div className="h-10"/>}
            <div className="mx-auto">
                <Image 
                    src={user?.iconSrc || "/img/sample/icon/default.png"} 
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
                @{user?.displayId}
            </div>
            <div className="my-2">
                <div className="flex flex-row justify-center">
                    <Link href={""} className="mx-3">
                        <div>
                            {user?.follows.length} フォロー
                        </div>
                    </Link>
                    <Link href={""} className="mx-3">
                        <div>
                            {user?.followers.length} フォロワー
                        </div>
                    </Link>
                </div>
            </div>
            <div className="m-2 p-2 outline outline-1 outline-gray-400 rounded-lg bg-white">
                {user?.description}
            </div>
            <div className="py-5">
                <div className="text-xl text-center">
                    Links
                </div>
                <div className="flex justify-center">
                    {user?.links.map((link, i)=>(
                        <div className="p-2" key={i}>
                            <Link href={link} >
                                <Image alt="link_icon" src={LinkIcon(link)} width={60} height={60} />
                            </Link>
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
                    {events.map((event, i) => (
                        <Link href={`/event/${event}`} key={i}>
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
