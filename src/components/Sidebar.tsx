import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"

const Sidebar = ({ session }: { session: Session | null }) => {
    return (
        <>
        <div className="fixed right-0 w-12 h-full bg-pink-200">
        <div className="h-14" />
            <Link href={"/"} className="w-12 h-12">
                <Image 
                    src={"/img/logos/calendar.svg"}
                    alt="calendar"
                    width={26}
                    height={26}
                    className="m-[11px]"
                />
            </Link>
            {/* <Link href={"/notification"} className="w-12 h-12">
                <Image 
                    src={"/ogame.jpg"}
                    alt="calendar"
                    width={30}
                    height={30}
                    className="m-[9px]"
                />
            </Link> */}
        </div>
        </>
    )
}

export {Sidebar}
