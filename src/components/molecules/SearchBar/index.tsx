import { TbSearch, TbX } from "react-icons/tb"
import styles from "./styles.module.css"

type Props = {
    value: string
    onChange: (value: string) => void
    totalCount: number
    filteredCount: number
}

export default function SearchBar({
    value,
    onChange,
    totalCount,
    filteredCount,
}: Props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inputGroup}>
                <TbSearch className={styles.icon} aria-hidden="true" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Cari nama produk..."
                    aria-label="Cari nama produk"
                    className={styles.input}
                />
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        aria-label="Hapus kata kunci pencarian"
                        className={styles.clearBtn}
                    >
                        <TbX />
                    </button>
                )}
            </div>
            <p className={styles.counter}>
                Menampilkan {filteredCount} dari {totalCount} produk
            </p>
        </div>
    )
}