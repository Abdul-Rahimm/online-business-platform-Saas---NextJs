import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { Category } from "@/models/category";

export default function CategoriesPage(props) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Categories</Title>
        {props.categories.map((cat) => (
          <div>
            <h2>{cat.name}</h2>
          </div>
        ))}
      </Center>
    </>
  );
}
export async function getServerSideProps() {
  const categories = await Category.find();

  return {
    props: {
      // catogeries and product photos
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
