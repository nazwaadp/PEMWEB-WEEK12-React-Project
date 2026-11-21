import { useLocation, useNavigate } from "react-router";
import { TbAlertTriangle } from "react-icons/tb";
import Button from "../../atoms/Button";
import styles from "./styles.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section aria-labelledby="not-found-title" className={styles.wrapper}>
      <div className={styles.iconBox}>
        <TbAlertTriangle aria-hidden="true" />
      </div>
      <p className={styles.code}>404</p>
      <h1 id="not-found-title" className={styles.title}>
        Halaman Tidak Ditemukan
      </h1>
      <p className={styles.description}>
        Alamat <span className={styles.pathBadge}>{location.pathname}</span>{" "}
        tidak tersedia atau telah dipindahkan. Silakan kembali ke halaman daftar
        produk.
      </p>
      <div className={styles.actions}>
        <Button onClick={() => navigate("/products")}>
          Kembali ke Daftar Produk
        </Button>
        <Button variant="secondary" onClick={() => navigate("/about")}>
          Tentang Aplikasi
        </Button>
      </div>
    </section>
  );
}
