import axios from "axios";
import { RedirectType, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  async function saveProduct(event) {
    event.preventDefault();
    const data = { title, description, price };

    if (_id) {
      //updating a product
      axios.put("/api/products", { ...data, _id });
    } else {
      //creating a product
      await axios.post("/api/products", data);
    }

    //redirect to products page
    setRedirect(true);
  }

  if (redirect) {
    router.push("/products");
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
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
  );
}
