import type { Product } from "../../../types/product";
import { useNavigate } from "react-router";
import { TbPackage } from "react-icons/tb";
import Button from "../../atoms/Button";
import { formatRupiah } from "../../../utils/formatRupiah";
import styles from "./styles.module.css";

type Props = {
  product: Product;
  onSelect: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductCard({
  product,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>ID: {product.id}</span>
        <TbPackage className={styles.icon} aria-hidden="true" />
      </div>
      <h2 className={styles.name}>{product.name}</h2>
      <p className={styles.price}>{formatRupiah(product.price)}</p>
      <div className={styles.actions}>
        <div className={styles.actionRow}>
          <Button onClick={() => onSelect(product.id)}>Pilih produk</Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Detail
          </Button>
        </div>
        <div className={styles.actionRow}>
          <Button
            variant="secondary"
            onClick={() => onEdit(product)}
            aria-label={`Edit ${product.name}`}
          >
            Edit
          </Button>
          <Button
            variant="subtleDanger"
            onClick={() => onDelete(product)}
            aria-label={`Hapus ${product.name}`}
          >
            Hapus
          </Button>
        </div>
      </div>
    </article>
  );
}
