import styles from "./styles.module.css";
import { Link, NavLink, Outlet } from "react-router";

export default function PageLayout() {
  return (
    <main className={styles.container}>
      <nav aria-label="Navigasi utama" className={styles.navbar}>
        <Link to="/products" className={styles.brand}>
          Katalog Produk
        </Link>
        <div className={styles.navLinks}>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Produk
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Tentang
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}
