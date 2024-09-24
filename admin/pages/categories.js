import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
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

  return (
    <Layout>
      <h1>Categories</h1>

      <label>Category</label>
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
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <tr>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
