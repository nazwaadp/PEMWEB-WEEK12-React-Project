import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import type { Product, ProductValues } from "../types/product"
import ProductModel from "../data/product/model/product-model.ts"

const STORAGE_KEY = "pemweb_tugas4_products"

const initialProducts: Product[] = [
    ProductModel.fromResponse({ id: 1, name: "Pulpen", price: 5000 }).toJSON(),
    ProductModel.fromResponse({
        id: 2,
        name: "Pensil",
        price: 2500,
    }).toJSON(),
    ProductModel.fromResponse({ id: 3, name: "Spidol", price: 10000 }).toJSON(),
    ProductModel.fromResponse({
        id: 4,
        name: "Penggaris",
        price: 7500,
    }).toJSON(),
    ProductModel.fromResponse({
        id: 5,
        name: "Penghapus",
        price: 6000,
    }).toJSON(),
]

type ProductContextValue = {
    products: Product[]
    replaceProducts: (items: Product[]) => void
    addProduct: (values: ProductValues) => Product
    updateProduct: (id: number, values: ProductValues) => void
    deleteProduct: (id: number) => void
    resetProducts: () => void
    getProductById: (id: number) => Product | undefined
}

const ProductContext = createContext<ProductContextValue | null>(null)

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                const parsed = JSON.parse(saved)
                if (Array.isArray(parsed)) {
                    return parsed
                }
            }
        } catch {
            // Abaikan error storage dan gunakan data awal
        }
        return initialProducts
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
        } catch {
            // Abaikan error kuota storage
        }
    }, [products])

    function replaceProducts(items: Product[]) {
        setProducts(items)
    }

    function addProduct(values: ProductValues): Product {
        const nextId =
            products.length > 0
                ? Math.max(...products.map((item) => item.id)) + 1
                : 1
        const newProduct: Product = {
            id: nextId,
            name: values.name.trim(),
            price: values.price,
        }
        setProducts((prev) => [...prev, newProduct])
        return newProduct
    }

    function updateProduct(id: number, values: ProductValues) {
        setProducts((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, name: values.name.trim(), price: values.price }
                    : item,
            ),
        )
    }

    function deleteProduct(id: number) {
        setProducts((prev) => prev.filter((item) => item.id !== id))
    }

    function resetProducts() {
        setProducts(initialProducts)
    }

    function getProductById(id: number) {
        return products.find((item) => item.id === id)
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                replaceProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                resetProducts,
                getProductById,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error(
            "useProducts harus digunakan di dalam ProductProvider.",
        )
    }
    return context
}