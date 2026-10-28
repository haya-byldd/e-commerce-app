import Featured from "../components/home/featured";
import Hero from "../components/home/hero";
import ProductCategories from "../components/home/product-categories";

const HomePage = () => {
  return (
    <main className="max-w-340 w-full mx-auto p-8 space-y-10">
      <Hero />
      <ProductCategories/>
      <Featured/>
    </main>
  );
};

export default HomePage;
