import Products from "../components/products/products";
import SideBar from "../components/products/sidebar";

const ProductsPage = () => {
    return (
        <main className="p-4 flex gap-6 ">
            <SideBar/>
            <Products />
        </main>
    )
}

export default ProductsPage;