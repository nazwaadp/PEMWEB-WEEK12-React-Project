import RootPage from "./page"
import { Route, Routes } from "react-router"
import PageLayout from "../src/components/templates/PageLayout"
import ProductsPage from "./products/page"
import ProductDetailRoutePage from "./products/[id]/page"
import { ProductProvider } from "../src/context/ProductContext"

export default function AppRoutes() {
    return (
        <ProductProvider>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route index element={<RootPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route
                        path="products/:id"
                        element={<ProductDetailRoutePage />}
                    />
                    <Route path="*" element={<RootPage />} />
                </Route>
            </Routes>
        </ProductProvider>
    )
}