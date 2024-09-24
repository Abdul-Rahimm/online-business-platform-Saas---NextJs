import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [isEdit, setIsEdited] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    //Update the Categories to the latest ones
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(event) {
    event.preventDefault();
    await axios.post("/api/categories", { name, parentCategory });
    setName("");
    setParentCategory("");
    fetchCategories();
  }

  function handleEdit(category) {
    setIsEdited(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
  }

  return (
    <Layout>
      <h1>Categories</h1>

      <label>{isEdit ? `Edit ${isEdit.name}` : "New "} Category</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value={0}>No Parent Category</option>
          {categories.map((category) => (
            <option value={category._id}>{category.name}</option>
          ))}
        </select>
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr className="flex">
            <td className="flex-1">Category Name</td>
            <td className="flex-1">Parent Category</td>
            <td className="w-40"></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <tr className="flex">
                  <td className="flex-1 ">{category.name}</td>
                  <td className="flex-1 b">{category?.parent?.name}</td>
                  <div className="flex-none w-40 ">
                    <td className="flex gap-1 justify-center">
                      <button
                        className="btn-primary"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button className="btn-primary">Delete</button>
                    </td>
                  </div>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
