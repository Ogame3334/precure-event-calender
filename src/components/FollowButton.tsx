import { Session } from "next-auth";
import Link from "next/link";

export default function FollowButton({session}: {session: Session}){
    return (
        <div className="p-5 flex flex-row-reverse">
            <Link href={""} className="p-2 outline outline-1 outline-black rounded-full">
                フォローする
            </Link>
        </div>
    )
}
