import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5em;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
  }
`;
export default function CategoryPage({
  category,
  subCategories,
  products: originalProducts,
}) {
  const [filterValue, setFilterValue] = useState(
    category.properties.map((p) => ({ name: p.name, value: "all" }))
  );
  const [products, setProducts] = useState(originalProducts);

  function handleFilterChange(filterName, filterValue) {
    setFilterValue((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
  }

  useEffect(() => {
    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));

    filterValue.forEach((f) => {
      if (f.value !== "all") params.set(f.name, f.value);
    });

    let url = "/api/products?" + params.toString();
    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, [filterValue]);

  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>

          <FiltersWrapper>
            {category.properties.map((p) => (
              <Filter key={p.name}>
                <span>{p.name}:</span>

                <select
                  value={filterValue.find((f) => f.name === p.name).value}
                  onChange={(event) =>
                    handleFilterChange(p.name, event.target.value)
                  }
                >
                  <option value="all">All</option>
                  {p.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
          </FiltersWrapper>
        </CategoryHeader>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  // const [] = useState();

  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
