import type { Product } from "../../../types/product";
import ProductCard from "../../molecules/ProductCard";
import styles from "./styles.module.css";

type Props = {
  products: Product[];
  onSelect: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductGrid({
  products,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
