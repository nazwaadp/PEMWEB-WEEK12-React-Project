import { useEffect, useState, type FormEvent } from "react";
import type { Product, ProductValues } from "../../../types/product";
import Button from "../../atoms/Button";
import Modal from "../../molecules/Modal";
import styles from "./styles.module.css";

type Props = {
  isOpen: boolean;
  initialProduct?: Product | null;
  onClose: () => void;
  onSubmit: (values: ProductValues) => void;
};

export default function ProductFormModal({
  isOpen,
  initialProduct = null,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const isEditMode = Boolean(initialProduct);

  useEffect(() => {
    if (!isOpen) return;
    if (initialProduct) {
      setName(initialProduct.name);
      setPrice(String(initialProduct.price));
    } else {
      setName("");
      setPrice("");
    }
    setErrors({});
  }, [isOpen, initialProduct]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: { name?: string; price?: string } = {};
    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (!trimmedName) {
      nextErrors.name = "Nama produk wajib diisi.";
    }

    if (!price.trim()) {
      nextErrors.price = "Harga produk wajib diisi.";
    } else if (!Number.isInteger(numericPrice) || numericPrice <= 0) {
      nextErrors.price = "Harga harus berupa bilangan bulat lebih dari 0.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({ name: trimmedName, price: numericPrice });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      title={isEditMode ? "Edit Produk" : "Tambah Produk"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {initialProduct && (
          <span className={styles.badge}>ID: {initialProduct.id}</span>
        )}
        <div className={styles.field}>
          <label htmlFor="product-name" className={styles.label}>
            Nama Produk
          </label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Buku Gambar A4"
            className={styles.input}
          />
          {errors.name && (
            <p role="alert" className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="product-price" className={styles.label}>
            Harga (Rupiah)
          </label>
          <input
            id="product-price"
            type="number"
            min={1}
            step={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Contoh: 15000"
            className={styles.input}
          />
          {errors.price && (
            <p role="alert" className={styles.error}>
              {errors.price}
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">
            {isEditMode ? "Simpan Perubahan" : "Simpan Produk"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
