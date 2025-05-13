import FeaturedProduct from "@/components/FeaturedProduct";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default function Home({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <FeaturedProduct product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  //fetch the product from DB
  //pass it to featured component
  await mongooseConnect();

  const featuredProductId = "68226d66c6fac083d69b4492";
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
