import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [isEdit, setIsEdited] = useState(null); //contains the object which is being edited
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

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
    const data = {
      name,
      parentCategory,
      //converting the comma seperated string to array of strings
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.split(","),
      })),
    };

    if (isEdit) {
      data._id = isEdit._id;
      await axios.put("/api/categories", data);
      setIsEdited(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  function handleEdit(category) {
    setIsEdited(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
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

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((item, index) => {
        return index !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>

      {/* category name and parent category line */}
      <label>{isEdit ? `Edit ${isEdit.name}` : "New "} Category</label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <select
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
        </div>

        {/* Properties div */}
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default text-sm mb-2"
            onClick={addProperty}
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2">
                <input
                  type="text"
                  className="mb-0"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="property name (eg: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  placeholder="values (comma seperated)"
                />
                <button
                  className="btn-red"
                  onClick={() => removeProperty(index)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>

        {/* save and cancelbutton */}
        <div className="flex gap-1">
          {isEdit && (
            <button
              className="btn-default"
              type="button"
              onClick={() => {
                setIsEdited(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
          <button className="btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>

      {/* table which displays all categories with parents */}
      {!isEdit && (
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
                          className="btn-default"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
                          className="btn-red"
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
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
