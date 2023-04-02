import {XMarkIcon} from "@heroicons/react/24/outline";
import styles from "../../styles/components/character/RemovableFlag.module.css";

export default function RemovableFlag({ name, onRemove }) {
    return <div className={styles.container}>
        <div className={styles.icon} onClick={onRemove}>
            <XMarkIcon />
        </div>
        <div className={styles.text}>
            <p>{name}</p>
        </div>
    </div>
}