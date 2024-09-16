import Layout from "@/components/Layout";

export default function Categories() {
  return (
    <Layout>
      <h1>Categories</h1>

      <label>Category</label>
      <div className="flex">
        <input type="text" placeholder="Category Name" />
        <button className="btn-primary">Save</button>
      </div>
    </Layout>
  );
}
