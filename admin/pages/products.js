import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
      <Link
        href={"/products/new"}
        className="bg-blue-900 text-white rounded-md px-2 py-1"
      >
        Add New Product
      </Link>
    </Layout>
  );
}
