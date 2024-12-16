import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { hashPassword } from "@/src/libs/CustomHash";

export async function GET(req: NextRequest, {params}: {params: {displayId: string}}) {
    if(params.displayId === "") return NextResponse.error();

    console.log("hoge: ", await hashPassword("password", 1));

    const prisma = new PrismaClient();

    const user = await prisma.users.findUnique({
        where: {
            displayId: params.displayId
        }
    });
    
    return NextResponse.json(user);
};