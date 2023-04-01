import styles from "../styles/components/Button.module.css"
import Link from "next/link";

export default function Button({ icon, text, background = "black", color = "white", onClick = () => {}, link = undefined, className = "", border = undefined, disabled = false }) {
    if (link) {
        return <Link href={!disabled ? link : "#"}>
            <div className={`${styles.container} ${disabled && styles.disabled} ${className}`} style={{ backgroundColor: background, border: border || "none" }} onClick={!disabled ? onClick : undefined} >
                {icon && <div className={styles.icon} style={{ color: color }}>{icon}</div>}
                {text && <div className={styles.text} style={{ color: color }}>{text}</div>}
            </div>
        </Link>
    }

    return <div className={`${styles.container} ${disabled && styles.disabled} ${className}`} style={{ backgroundColor: background, border: border || "none" }} onClick={!disabled ? onClick : undefined} >
        {icon && <div className={styles.icon} style={{ color: color }}>{icon}</div>}
        {text &&<div className={styles.text} style={{ color: color }}>{text}</div>}
    </div>
}