import styles from '../styles/Home.module.css'
import Button from "../components/Button";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import background from "../public/background.png";

export default function Home() {
  return (
    <div className={styles.container} style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }}>
        <main>
            <h1 className={styles.title}>Tell your stories in new and exciting ways using [name]</h1>
            <div className={styles.buttons}>
                <Button text={"Sign me up!"} background={"#E20074"} color={"white"} icon={<PlusCircleIcon />} link={"/collection"} />
            </div>
        </main>
    </div>
  )
}
