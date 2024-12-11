import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/product";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a post request");
  }
  await mongooseConnect();

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  const productIds = cartProducts;

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
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDocument = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDocument._id.toString(), test: "ok" },
  });

  // console.log("RL", session.url);
  res.json({
    url: session.url,
  });

  // res.json({ line_items });
}
