import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  // const id = router.query.id[0];
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState();

  function goBack() {
    router.back();
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  useEffect(() => {
    if (!id) return;

    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data[0]);
    });
  }, [id]);

  return (
    <Layout>
      <h2 className="text-lg mb-5 text-center">
        Are you sure to delete {productInfo?.title}?
      </h2>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
