import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function AccountButton({session, status}: {session: Session | null, status: "loading" | "authenticated" | "unauthenticated"}){
    console.log(session?.user);
    return (
        <div>
            {status == "authenticated" ? (
                <div>
                    <Link href={`/user/${session!.user.displayId}`}>
                        <Image 
                            width={40}
                            height={40}
                            alt="icon"
                            // src={"/sample/img/icon.png"}
                            src={session!.user.iconSrc}
                            className="rounded-full"
                        />
                    </Link>
                </div>
            ) : (status == "unauthenticated" ? (
                
                <div>
                    <Link href={"/signin"}>ログイン</Link>
                </div>
            ) : (<></>))}
        </div>
    )
}
