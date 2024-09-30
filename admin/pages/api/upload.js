import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

const bucketName = "next-ecommerce-rahim";

export default async function handle(req, res) {
  //we want to tell nextJS not to parse our req
  //we will parse it ourselves
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const LinksArray = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFileName = Date.now() + "." + ext;

    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );

    //as a respomse we wanna grab the link of the uploaded file
    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    LinksArray.push(link);
  }

  return res.json({ LinksArray });
}

// this will not parse our request to JSON
export const config = {
  api: {
    bodyParser: false,
  },
};
