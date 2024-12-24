import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  try {
    // トークンをデータベースで検索
    const foundToken = await prisma.tokens.findUnique({
      where: { value: token },
    });

    // トークンが存在しない、または有効期限が過ぎている場合
    if (!foundToken || foundToken.expiresAt < new Date()) {
      return NextResponse.json({ valid: false, email: "", message: "Invalid or expired token" });
    }

    // トークンが有効である場合
    return NextResponse.json({ valid: true, email: foundToken.email, message: "Token is valid" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ valid: false, email: "", message: "Server error" }, { status: 500 });
  }
}
