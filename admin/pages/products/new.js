import Layout from "@/components/Layout";
import axios from "axios";
import { RedirectType, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  async function createProduct(event) {
    event.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
    //redirect to products page
    setRedirect(true);
  }

  if (redirect) {
    router.push("/products");
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>

        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          title={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Add Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="$ Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
    </Layout>
  );
}
