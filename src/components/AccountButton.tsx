import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function AccountButton({session}: {session: Session | null}){
    return (
        <div>
            {session ? (
                <div>
                    <Link href={session.user?.name || "/user/ogame"}>
                        <Image 
                            width={40}
                            height={40}
                            alt="icon"
                            // src={"/sample/img/icon.png"}
                            src={session.user?.image ?? ""}
                            className="rounded-full"
                        />
                    </Link>
                </div>
            ) : (
                <div>
                    <Link href={"/signin"}>ログイン</Link>
                </div>
            )}
        </div>
    )
}
