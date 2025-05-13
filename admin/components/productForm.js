import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [redirect, setRedirect] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategoriesData(result.data);
    });
  }, []);

  async function saveProduct(event) {
    event.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

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
    //The Icon should show when the image is being uploaded

    if (files?.length > 0) {
      setIsImageUploading(true);
      //need to send as form data
      const data = new FormData();

      for (const file of files) {
        data.append("file", file);
      }

      //this endpoint is just going to give us links to the images after we have uploaded them
      const res = await axios.post("/api/upload", data);

      setImages((oldImages) => {
        return [...oldImages, ...res.data.LinksArray];
      });

      //image has been uploaded
      setIsImageUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function setProductProps(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  //for a particular product, it will show the parent categories as well
  const propertiesToFill = [];
  if (categoriesData.length > 0 && category) {
    let CatInfo = categoriesData.find(({ _id }) => _id === category);
    propertiesToFill.push(...CatInfo.properties);

    while (CatInfo?.parent?._id) {
      const parentCat = categoriesData.find(
        ({ _id }) => _id === CatInfo?.parent?._id
      );

      propertiesToFill.push(...parentCat.properties);
      CatInfo = parentCat;
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

      <label>Category</label>
      <select
        value={category}
        onChange={(ev) => {
          setCategory(ev.target.value);
        }}
      >
        <option value="">No Category</option>
        {categoriesData.length > 0 &&
          categoriesData.map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
      </select>

      {propertiesToFill.map((p) => (
        <div className="">
          <label>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</label>
          {/* values is an array */}
          <div>
            <select
              value={productProperties[p.name]}
              onChange={(ev) => setProductProps(p.name, ev.target.value)}
            >
              {p.values.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {/* images are displayed below */}

        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 p-2 bg-white shadow-sm rounded-md border border-gray-200"
              >
                <img src={link} alt="Image" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>

        {isImageUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}

        <label className="w-24 h-24 border flex flex-col justify-center items-center cursor-pointer text-primary gap-1 rounded-lg bg-white shadow-md">
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
          <div>Add Images</div>
          <input type="file" className="hidden" onChange={uploadImages} />
        </label>
      </div>

      <label>Description</label>
      <textarea
        placeholder="Add Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label>Price (in PKR)</label>
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
