import { useNavigate } from "react-router";
import { TbCode, TbDatabase, TbLayoutGrid } from "react-icons/tb";
import Button from "../../atoms/Button";
import styles from "./styles.module.css";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Tentang Aplikasi</p>
        <h1 className={styles.title}>Manajemen Produk — Tugas 4</h1>
        <p className={styles.subtitle}>
          Aplikasi web Single Page Application (SPA) untuk mengelola katalog
          produk, dibangun menggunakan React, TypeScript, Vite, React Router,
          dan prinsip Atomic Design.
        </p>
      </section>

      <div className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <TbLayoutGrid aria-hidden="true" />
            <h2 className={styles.cardTitle}>Arsitektur Atomic Design</h2>
          </div>
          <p className={styles.cardText}>
            Antarmuka disusun secara modular dari komponen dasar hingga halaman
            utuh: Atoms (Button), Molecules (ProductCard, SearchBar, Modal),
            Organisms (ProductGrid, ProductFormModal, ConfirmDeleteModal),
            Templates (PageLayout), dan Pages.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <TbDatabase aria-hidden="true" />
            <h2 className={styles.cardTitle}>Manajemen State & Penyimpanan</h2>
          </div>
          <p className={styles.cardText}>
            State produk dikelola secara terpusat melalui React Context dan
            tersimpan otomatis ke localStorage browser, serta tetap mendukung
            pemuatan data dari REST API eksternal.
          </p>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <TbCode aria-hidden="true" />
            <h2 className={styles.cardTitle}>Fitur Utama</h2>
          </div>
          <ul className={styles.featureList}>
            <li>CRUD Produk lengkap dengan validasi form</li>
            <li>Pencarian produk real-time dan penghitung item</li>
            <li>Halaman detail produk dinamis (/products/:id)</li>
            <li>Halaman penanganan rute tidak ditemukan (404)</li>
          </ul>
        </article>
      </div>

      <div className={styles.footerActions}>
        <Button onClick={() => navigate("/products")}>
          Kembali ke Daftar Produk
        </Button>
      </div>
    </div>
  );
}
