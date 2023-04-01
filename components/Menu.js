import Image from "next/image";
import styles from "../styles/components/Menu.module.css";

export default function Menu() {
    return <div className={styles.container}>
        <div className={styles.favicon}>
            <Image src={"/favicon.png"} height={100} width={100} className={styles.faviconSizing} />
        </div>
        <div className={styles.links}>
            <div className={styles.link}>
                <p>A</p>
            </div>
            <div className={styles.link}>
                <p>B</p>
            </div>
            <div className={styles.link}>
                <p>C</p>
            </div>
        </div>
    </div>
}