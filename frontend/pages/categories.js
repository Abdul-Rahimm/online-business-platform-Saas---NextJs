import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

export default function CategoriesPage(props) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Categories</Title>
        {props.mainCategories.map((cat) => (
          <div>
            <h2>{cat.name}</h2>
            <div>
              {props.categoryProductsMap[cat._id].map((p) => (
                <div>{p.title}</div>
              ))}
            </div>
          </div>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);

  // catID -> [Products]
  const categoryProductsMap = {};

  for (const mainCategory of mainCategories) {
    const mainCategoryId = mainCategory._id.toString();
    console.log(mainCategoryId);
    const childCategoryIds = categories
      .filter((c) => c?.parent?.toString() === mainCategoryId)
      .map((c) => c._id);

    const categoryIDs = [mainCategoryId, ...childCategoryIds];

    const products = await Product.find({ category: categoryIDs }, null, {
      limit: 3,
      sort: { _id: -1 }, // latest products first. descending sort
    });

    categoryProductsMap[mainCategory._id] = products;
  }

  return {
    props: {
      // catogeries and product photos
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoryProductsMap: JSON.parse(JSON.stringify(categoryProductsMap)),
    },
  };
}
