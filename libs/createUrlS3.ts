import { PutObjectCommand } from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from "file-type";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

export function createUrlS3(key: string) {
  const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`;
  return url;
}

export async function createCommand(value: string) {
  const decodedData = Buffer.from(value, "base64");

  const type = await fileTypeFromBuffer(decodedData);

  const resizeBuffer =
    type?.mime === "application/pdf"
      ? decodedData
      : await processImageWithSharp(decodedData);

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: uuidv4(),
    Body: resizeBuffer,
    ContentType: type ? type.mime : "application/octet-stream",
  });

  async function processImageWithSharp(decodedData: Buffer) {
    try {
      return await sharp(decodedData, { failOnError: false }).webp().toBuffer();
    } catch (error) {
      return decodedData;
    }
  }

  return command;
}
