import ProductList from "../components/products/product-list";
import ProductFilters from "../components/products/product-filters";

const ProductsPage = () => {
    return (
        <main className="p-4 flex gap-6 ">
            <ProductFilters/>
            <ProductList />
        </main>
    )
}

export default ProductsPage;
