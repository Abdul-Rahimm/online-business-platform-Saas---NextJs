import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [isEdit, setIsEdited] = useState(null); //contains the object which is being edited
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

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = { name, parentCategory };

    if (isEdit) {
      data._id = isEdit._id;
      await axios.put("/api/categories", data);
      setIsEdited(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    fetchCategories();
  }

  function handleEdit(category) {
    setIsEdited(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
  }

  function handleDelete(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name} category?`,
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "red",
        reverseButtons: true,
      })
      .then(async (result) => {
        // when confirmed and promise resolved...
        const { isConfirmed } = result;
        const { _id } = category; //the _id which should be deleted

        if (isConfirmed) {
          await axios.delete(`/api/categories?_id=` + _id);
          //sometimes the user can click edit and then delete
          setName("");
          setParentCategory("");
          setIsEdited(null);
          fetchCategories();
        }
      });
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
          <option value="">No Parent Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
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
                      <button
                        onClick={() => handleDelete(category)}
                        className="btn-primary"
                      >
                        Delete
                      </button>
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

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
