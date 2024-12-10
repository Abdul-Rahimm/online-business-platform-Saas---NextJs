import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.json("Should be a post request");
  }
  await mongooseConnect();

  //products is a string of IDS (comma seperated)
  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;

  const productIds = products.split(",");

  //i need to find unique ids
  //two products with the same id means i want two quantity of that product

  const uniqueIds = [...new Set(productIds)];

  const productInfos = await Product.find({ _id: uniqueIds });
};

export default handler;
