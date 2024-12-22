"use client"

import { Session } from "next-auth"
import { useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"

const SideBarButton = (props: {requireSession: boolean, session: Session | null, src: string, alt: string, href: string}) => {
    if((!props.session) && props.requireSession) return <></>;
    else{
        return (
            <Link href={props.href} className="w-12 h-12">
                <Image 
                    src={props.src}
                    alt={props.alt}
                    width={26}
                    height={26}
                    className="m-[11px]"
                />
            </Link>
        )
    }
}

const Sidebar = () => {
    const {data: session, status} = useSession();
    
    return (
        <>
        <div className="fixed right-0 w-12 h-full bg-pink-200">
        <div className="h-14" />
            <SideBarButton 
                href="/"
                alt="calendar"
                src="/img/logos/sidebar/calendar.svg"
                session={session}
                requireSession={false}
            />
            <SideBarButton 
                href="/setting"
                alt="setting"
                src="/img/logos/sidebar/setting.svg"
                session={session}
                requireSession={true}
            />
        </div>
        </>
    )
}

export {Sidebar}
