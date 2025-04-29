import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import Title from "@/components/Title";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import Link from "next/link";
import styled from "styled-components";

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  /* background-color: lightcyan; */
  display: flex;
  align-items: center;
  gap: 15px;
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  a {
    color: #555;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px;
  /* background-color: lightblue; */
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 160px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  text-decoration: none;
`;

export default function CategoriesPage(props) {
  return (
    <>
      <Header />
      <Center>
        {props.mainCategories.map((cat) => (
          <CategoryWrapper>
            <CategoryTitle>
              <h2>{cat.name}</h2>
              <div>
                <Link href={"/category/" + cat._id}>Show all</Link>
              </div>
            </CategoryTitle>
            <CategoriesGrid>
              {props.categoryProductsMap[cat._id].map((p) => (
                <ProductBox {...p} />
              ))}
              <ShowAllSquare href={"/category/" + cat._id}>
                Show all &rarr;
              </ShowAllSquare>
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
