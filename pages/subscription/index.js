import Image from "next/image";
import styles from "../../styles/pages/Marketplace.module.css"

export default function Marketplace() {
    return <div className={styles.container}>
        <div className={styles.img}>
            <Image height={790} width={1440} src={"/PRICING.png"} />
        </div>
    </div>
}