import { Session } from "next-auth";
import Link from "next/link";

export default function FollowEditButton({session, displayId}: {session: Session, displayId: string}){
    
    
    return (
        <>
        {session.user.displayId == displayId ? 
        <div className="p-5 flex flex-row-reverse">
            <Link href={`/user/${displayId}/edit`} className="p-2 outline outline-1 outline-black rounded-full">
                編集する
            </Link>
        </div>
        :
        <div className="p-5 flex flex-row-reverse">
            <Link href={""} className="p-2 outline outline-1 outline-black rounded-full">
                フォローする
            </Link>
        </div>
        }
        </>
    )
}
