import axios from "axios";
import { RedirectType, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images,
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

  async function uploadImages(event) {
    const files = event.target?.files;

    if (files?.length > 0) {
      //need to send as form data
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      //this endpoint is just going to give us links to the images after we have uploaded them
      const res = await axios.post("/api/upload", data);

      //we will grab the data from the response
      console.log(res.data);
    }
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

      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24 border flex justify-center items-center cursor-pointer text-gray-400 gap-1 rounded-lg bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>

        {!images?.length && <div>No Photos</div>}
      </div>

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
