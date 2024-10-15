import FeaturedProduct from "@/components/FeaturedProduct";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default function Home({ product }) {
  return (
    <div>
      <Header />
      <FeaturedProduct product={product} />
    </div>
  );
}

export async function getServerSideProps() {
  //fetch the product from DB
  //pass it to featured component
  await mongooseConnect();

  const featuredProductId = "6703c92c597cba37b80649ce";
  const product = await Product.findById(featuredProductId);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
