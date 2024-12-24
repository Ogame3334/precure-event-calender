import { hashPassword } from "@/src/libs/CustomHash";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const {displayId, name, iconUrl, email, password} = await req.json();

    if(displayId == null || name == null || iconUrl == null || email == null || password == null){
        console.log(displayId, name, iconUrl, email, password);
        console.log("yaa");
        return NextResponse.json({status: -1, message: "パラメータが足りません。"}, {status: 400})
    }
    

    const user = await prisma.users.create({
        data: {
            displayId: displayId,
            name: name,
            iconSrc: iconUrl,
            description: "",
            follows: [],
            followers: [],
            links: [],
            events: {create: []},
            authentication: {
                create: {
                    email: email,
                    passwordHash: await hashPassword("password", 0)
                }
            }
        }
    });

    await prisma.userAuthentications.update({
        where: {userId: user.id},
        data: {
            passwordHash: await hashPassword(password, user.id)
        }
    })

    return NextResponse.json({status: 0, message: "ユーザーの登録が完了しました！"});
}
