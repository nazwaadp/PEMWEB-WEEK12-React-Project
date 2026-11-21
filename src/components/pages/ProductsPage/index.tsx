import { useState } from "react";
import Button from "../../atoms/Button";
import ProductRemote from "../../../data/product/source/product-remote.ts";
import ProductRepository from "../../../data/product/repository/product-repository.ts";
import ProductGrid from "../../organisms/ProductGrid";
import SearchBar from "../../molecules/SearchBar";
import { useProducts } from "../../../context/ProductContext";
import styles from "./styles.module.css";

const repository = ProductRepository(
  ProductRemote({ baseUrl: import.meta.env.VITE_API_BASE_URL ?? "" }),
);

export default function ProductsPage() {
  const { products, replaceProducts, resetProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  async function handleLoadProducts() {
    setIsLoading(true);
    setError("");
    setMessage("Memuat produk...");
    try {
      const models = await repository.getProductList();
      replaceProducts(models.map((model) => model.toJSON()));
      setSelectedProductId(null);
      setMessage(`${models.length} produk berhasil dimuat dari API.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat produk.");
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  }

  function handleResetData() {
    resetProducts();
    setSearchQuery("");
    setSelectedProductId(null);
    setError("");
    setMessage("Data produk dikembalikan ke daftar awal.");
  }

  function handleSelectProduct(id: number) {
    setSelectedProductId(id);
    setMessage("");
  }

  return (
    <>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Pemrograman Web — Tugas 4</p>
        <h1 className={styles.title}>Manajemen Produk</h1>
        <p className={styles.description}>
          Kelola daftar produk lengkap dengan pencarian, CRUD, detail produk,
          dan penyimpanan otomatis di browser.
        </p>
      </header>
      <div className={styles.toolbar}>
        <Button onClick={handleLoadProducts} disabled={isLoading}>
          {isLoading ? "Memuat..." : "Muat dari API"}
        </Button>
        <Button variant="secondary" onClick={handleResetData}>
          Reset Data Awal
        </Button>
        <p className={styles.hint}>
          Perubahan data tersimpan otomatis di localStorage.
        </p>
      </div>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        totalCount={products.length}
        filteredCount={filteredProducts.length}
      />
      <section aria-label="Daftar produk" aria-busy={isLoading}>
        {products.length === 0 ? (
          <p className={styles.notice}>Belum ada data produk.</p>
        ) : filteredProducts.length === 0 ? (
          <p className={styles.notice}>
            Produk dengan kata kunci &ldquo;{searchQuery}&rdquo; tidak
            ditemukan.
          </p>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onSelect={handleSelectProduct}
          />
        )}
      </section>
      <p role="status" className={styles.notice}>
        {message ||
          (selectedProduct
            ? `Produk dipilih: ${selectedProduct.name}.`
            : "Klik Pilih produk untuk melihat status pilihan.")}
      </p>
    </>
  );
}
