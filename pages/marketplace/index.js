import Image from "next/image";
import styles from "../../styles/pages/Marketplace.module.css"
import {useState} from "react";

export default function Marketplace() {
    const [overlay, setOverlay] = useState(false);

    if (overlay) {
        return <div className={styles.container}>
            <div className={styles.img3}>
                <Image height={700} width={1241} src={"/buycomic.png"} />
            </div>
        </div>
    }

    return <div className={styles.container}>
        <div className={styles.img2} onClick={setOverlay.bind(null, true)}>
            <Image height={765} width={1617} src={"/marketplace.png"} />
        </div>
    </div>
}