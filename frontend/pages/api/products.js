import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  await mongooseConnect();

  const { categories, sort, ...filters } = req.query;

  const [sortField, sortOrder] = sort.split(" ");

  const productQuery = { category: categories.split(",") };

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      const value = filters[filterName];
      productQuery["properties." + filterName] = value;
    });
  }
  // console.log("product query", productQuery);

  res.json(
    await Product.find(productQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
