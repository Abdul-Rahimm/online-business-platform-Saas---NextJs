import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.3rem;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(
    debounce((phrase) => SearchProducts(phrase), 500),
    []
  );
  // const [debouncedSearch, setDebouncedSearch] = useState(() => {});

  useEffect(() => {
    if (phrase.length > 0) {
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  // useEffect(() => {
  //   // first mount
  //   setDebouncedSearch(debounce(SearchProducts, 500));
  // }, []);

  function SearchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((res) => {
        setProducts(res.data);
      });
  }

  return (
    <>
      <Header />

      <Center>
        <SearchInput
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          autoFocus
          placeholder="Search for products..."
        />
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}
