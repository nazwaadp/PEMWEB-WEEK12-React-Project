import { TbTrash } from "react-icons/tb";
import type { Product } from "../../../types/product";
import { formatRupiah } from "../../../utils/formatRupiah";
import Button from "../../atoms/Button";
import Modal from "../../molecules/Modal";
import styles from "./styles.module.css";

type Props = {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
};

export default function ConfirmDeleteModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}: Props) {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} title="Hapus Produk?" onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.warningBox}>
          <TbTrash className={styles.warningIcon} aria-hidden="true" />
          <span>
            Tindakan ini akan menghapus produk dari daftar secara permanen.
            Apakah Anda yakin ingin melanjutkan?
          </span>
        </div>

        <div className={styles.preview}>
          <span className={styles.previewId}>ID: {product.id}</span>
          <p className={styles.previewName}>{product.name}</p>
          <p className={styles.previewPrice}>{formatRupiah(product.price)}</p>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm(product.id);
              onClose();
            }}
          >
            Hapus Produk
          </Button>
        </div>
      </div>
    </Modal>
  );
}
