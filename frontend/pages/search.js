import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  /* margin: 30px 0 30px; */
  font-size: 1.3rem;
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 70px;
  padding: 10px 0;
  margin: 20px 0;
  background-color: #eeeeeeaa;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const debouncedSearch = useCallback(
    debounce((phrase) => SearchProducts(phrase), 500),
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  // const [debouncedSearch, setDebouncedSearch] = useState(() => {});

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
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
        setIsLoading(false);
      });
  }

  return (
    <>
      <Header />

      <Center>
        <InputWrapper>
          <SearchInput
            value={phrase}
            onChange={(ev) => setPhrase(ev.target.value)}
            autoFocus
            placeholder="Search for products..."
          />
        </InputWrapper>
        {!isLoading && products.length === 0 && phrase !== "" && (
          <h2>No products found for query "{phrase}" </h2>
        )}
        {isLoading && <Spinner fullWidth={true} />}

        {isLoading === false && <ProductsGrid products={products} />}
      </Center>
    </>
  );
}
