import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream"; // Node.js の標準モジュール

// S3クライアントの初期化
const s3 = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: `https://${process.env.WASABI_ENDPOINT}`,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY!,
    secretAccessKey: process.env.WASABI_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export async function GET(req: NextRequest, { params }: { params: { fileName: string } }) {
  const bucketName = process.env.WASABI_BUCKET_NAME; // S3バケット名を環境変数から取得

  if (!bucketName) {
    return NextResponse.json({ error: 'Bucket name is not configured' }, { status: 500 });
  }

  const { fileName } = params;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: `icons/${fileName}`,
    });

    const s3Response = await s3.send(command);

    if (!s3Response.Body) {
      return NextResponse.json({ error: 'File not found or empty response' }, { status: 404 });
    }

    // ストリームをReadableStreamに変換して返却
    const readableStream = s3Response.Body as Readable;
    const stream = new ReadableStream({
      start(controller) {
        readableStream.on('data', (chunk) => controller.enqueue(chunk));
        readableStream.on('end', () => controller.close());
        readableStream.on('error', (err) => controller.error(err));
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': s3Response.ContentType || 'application/octet-stream',
      },
    });
  } catch (error) {
    console.error('Error fetching file from S3:', error);
    return NextResponse.json({ error: 'Failed to download the file' }, { status: 500 });
  }
}
