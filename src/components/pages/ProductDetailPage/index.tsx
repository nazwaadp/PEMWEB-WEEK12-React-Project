import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { TbArrowLeft, TbPackage } from "react-icons/tb";
import { useProducts } from "../../../context/ProductContext";
import { formatRupiah } from "../../../utils/formatRupiah";
import type { ProductValues } from "../../../types/product";
import Button from "../../atoms/Button";
import ProductFormModal from "../../organisms/ProductFormModal";
import ConfirmDeleteModal from "../../organisms/ConfirmDeleteModal";
import styles from "./styles.module.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct, deleteProduct } = useProducts();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [message, setMessage] = useState("");

  const numericId = Number(id);
  const product = Number.isInteger(numericId)
    ? getProductById(numericId)
    : undefined;

  function handleEditSubmit(values: ProductValues) {
    if (!product) return;
    updateProduct(product.id, values);
    setMessage(`Perubahan pada "${values.name}" berhasil disimpan.`);
  }

  function handleConfirmDelete(targetId: number) {
    deleteProduct(targetId);
    navigate("/products");
  }

  if (!product) {
    return (
      <div className={styles.wrapper}>
        <Link to="/products" className={styles.backLink}>
          <TbArrowLeft aria-hidden="true" />
          Kembali ke Daftar Produk
        </Link>
        <div className={styles.emptyCard}>
          <h1 className={styles.emptyTitle}>Produk Tidak Ditemukan</h1>
          <p className={styles.emptyDesc}>
            Produk dengan ID “{id}” tidak tersedia atau sudah dihapus dari
            daftar.
          </p>
          <Button onClick={() => navigate("/products")}>
            Lihat Semua Produk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Link to="/products" className={styles.backLink}>
        <TbArrowLeft aria-hidden="true" />
        Kembali ke Daftar Produk
      </Link>

      <article className={styles.card}>
        <div className={styles.topRow}>
          <span className={styles.badge}>ID Produk: #{product.id}</span>
          <div className={styles.iconBox}>
            <TbPackage aria-hidden="true" />
          </div>
        </div>

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.priceBox}>
          <span className={styles.priceLabel}>Harga Satuan</span>
          <p className={styles.priceValue}>{formatRupiah(product.price)}</p>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Kode Inventaris</span>
            <span className={styles.metaValue}>
              PRD-{String(product.id).padStart(4, "0")}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Status Data</span>
            <span className={styles.metaValue}>
              Tersimpan di Browser (localStorage)
            </span>
          </div>
        </div>

        {message && (
          <p role="status" className={styles.notice}>
            {message}
          </p>
        )}

        <div className={styles.actions}>
          <Button onClick={() => setIsEditOpen(true)}>Edit Produk</Button>
          <Button variant="subtleDanger" onClick={() => setIsDeleteOpen(true)}>
            Hapus Produk
          </Button>
        </div>
      </article>

      <ProductFormModal
        isOpen={isEditOpen}
        initialProduct={product}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        product={product}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
