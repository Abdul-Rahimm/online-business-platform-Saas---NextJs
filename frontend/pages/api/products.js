import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  await mongooseConnect();

  const { categories, sort, phrase, ...filters } = req.query;

  let [sortField, sortOrder] = (sort || "_id desc").split(" ");
  // if (!sortField) sortField = "_id";
  // if (!sortOrder) sortOrder = "desc";

  const productQuery = {};
  if (categories) {
    productQuery.category = categories.split(",");
  }
  if (phrase) {
    productQuery["$or"] = [
      { title: { $regex: phrase, $options: "i" } },
      { description: { $regex: phrase, $options: "i" } },
    ];
  }

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      const value = filters[filterName];
      productQuery["properties." + filterName] = value;
    });
  }

  res.json(
    await Product.find(productQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
