import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

// S3クライアントの初期化
const s3 = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: `https://${process.env.WASABI_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY!,
    secretAccessKey: process.env.WASABI_SECRET_KEY!,
  },
  forcePathStyle: true, // Wasabiの場合は、path styleを強制する必要があります
});

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content-type. Use multipart/form-data." },
        { status: 400 }
      );
    }

    // リクエストのボディを取得
    const formData = await req.formData();
    const file = formData.get("icon");

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Invalid file. Please provide a valid file." },
        { status: 400 }
      );
    }

    // ファイル名を生成（例: 現在のタイムスタンプを使用）
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));
    const fileName = `icon-${Date.now()}-${randomUUID()}${fileExtension}`;

    // Wasabiへのアップロードパラメータ
    const uploadParams = {
      Bucket: process.env.WASABI_BUCKET_NAME!,
      Key: `icons/${fileName}`,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    };

    // PutObjectCommandでファイルアップロード
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const url = `/api/contents/images/icons/${fileName}`;

    return NextResponse.json(
      { message: "File uploaded successfully", url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload the file" },
      { status: 500 }
    );
  }
}
