import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a post request");
  }
  await mongooseConnect();

  //products is a string of IDS (comma seperated)
  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;

  const productIds = products?.split(",");

  //i need to find unique ids
  //two products with the same id means i want two quantity of that product

  const uniqueIds = [...new Set(productIds)];

  const productInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const productID of uniqueIds) {
    const productInfo = productInfos.find(
      (prod) => prod._id.toString() === productID
    );
    const quantity = productIds.filter((id) => id === productID)?.length || 0;

    if (quantity > 0) {
      line_items.push({
        quantity,
        price_data: {
          currency: "PKR",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }

  res.json({ line_items });
}
