import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (file, key) => {
  if (!file || !key) {
    throw new Error("File and key are required for S3 upload");
  }

  let buffer;
  if (file instanceof Buffer) {
    buffer = file;
  } else if (file instanceof ArrayBuffer) {
    buffer = Buffer.from(file);
  } else if (file instanceof Blob) {
    buffer = Buffer.from(await file.arrayBuffer());
  } else {
    throw new Error("Invalid file type for S3 upload");
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
     await s3Client.send(command);
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
