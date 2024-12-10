import React from "react";

const handler = (req, res) => {
  if (req.method !== "POST") {
    res.json("Should be a post request");
  }

  //products is a string of IDS (comma seperated)
  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;

  const productIds = products.split(",");

  //i need to find unique ids
  //two products with the same id means i want two quantity of that product
};

export default handler;
