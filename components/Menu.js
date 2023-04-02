import Image from "next/image";
import styles from "../styles/components/Menu.module.css";
import Link from "next/link";

export default function Menu() {
    return <div className={styles.container}>
        <div className={styles.favicon}>
            <Link href={"/"}><Image src={"/favicon.png"} height={100} width={100} className={styles.faviconSizing} /></Link>
        </div>
        <div className={styles.links}>
            <div className={styles.link}>
                <Link href={"/comic"}><p>Create</p></Link>
            </div>
            <div className={styles.link}>
                <Link href={"/subscription"}><p>Subscription</p></Link>
            </div>
            <div className={styles.link}>
                <Link href={"/marketplace"}><p>Marketplace</p></Link>
            </div>
            <div className={styles.link}>
                <Link href={"/collection"}><p>My comics</p></Link>
            </div>
        </div>
    </div>
}