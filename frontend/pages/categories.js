import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import styled from "styled-components";

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 10px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

export default function CategoriesPage(props) {
  return (
    <>
      <Header />
      <Center>
        {props.mainCategories.map((cat) => (
          <CategoryWrapper>
            <CategoryTitle>{cat.name}</CategoryTitle>
            <CategoriesGrid>
              {props.categoryProductsMap[cat._id].map((p) => (
                <ProductBox {...p} />
              ))}
            </CategoriesGrid>
          </CategoryWrapper>
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
    const childCategoryIds = categories
      .filter((c) => c?.parent?.toString() === mainCategoryId)
      .map((c) => c._id.toString());

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
