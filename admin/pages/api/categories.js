import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import mongoose from "mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method == "GET") {
    res.json(await Category.find());
  }

  if (method === "POST") {
    const { name } = req.body;
    //create a category object inside DB
    const categoryDoc = await Category.create({ name });
    res.json(categoryDoc);
  }
}
