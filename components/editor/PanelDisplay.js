import styles from "../../styles/pages/PanelDisplay.module.css"
import Button from "../Button";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

export default function PanelDisplay({ image, onUpdate, generating} ) {
    return <div className={styles.container}>
        <img src={"data:image/png;base64," + image.toString()} alt={"Story panel"} />
        <Button text={generating ? "Working..." : "Regenerate"} icon={<ArrowPathIcon />} onClick={onUpdate} disabled={generating} />
    </div>
}