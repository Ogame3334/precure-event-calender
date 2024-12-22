import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as {email: string};

  if(!email) return NextResponse.json({ status: 400 });

  const users = await prisma.userAuthentications.findMany({
    where: {email: email}
  })

  if(users.length > 0) return NextResponse.json({ code: 2, message: "このメールアドレスは既に登録されています。" });

  const token = randomUUID();
  prisma.tokens.create({
    data: {
      value: token,
      expiresAt: new Date(Date.now() + 60*60*1000)
    }
  })

  try {
    // リクエストから送信する情報を取得

    // SMTP設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,  // 環境変数にGmailのアドレスを設定
        pass: process.env.GMAIL_PASS,  // 環境変数にGmailのアプリパスワードを設定
      },
    });

    // メールの内容
    const mailOptions = {
        from: process.env.GMAIL_USER,  // 送信元
        to: email,                           // 送信先
        subject: "あと少しで登録が完了します！",                      // 件名
        text: `こんにちは！
PreCaleへのご登録、ありがとうございます！
あと少しであなたのアカウントが完成します。

以下のURLからアカウント等®区を完了してください！
(このリンクは1時間で期限切れになります。)

https://localhost:3000/signup/${token} 

それでは、PreCaleでお会いできるのを楽しみにしています！

本メールに覚えがない場合は何もしないでください。`,                         // メール本文
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    // 成功時のレスポンス
    return NextResponse.json({ code: 0, message: "送信に成功しました。" });
  } catch (error) {
    // エラー時のレスポンス
    console.error('Error sending email:', error);
    return NextResponse.json({ code: 1, message: "メールの送信に失敗しました。" });
  }
}
