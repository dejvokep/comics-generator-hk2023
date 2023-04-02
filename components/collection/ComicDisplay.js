import styles from "../../styles/components/collection/ComicDisplay.module.css"
import Button from "../Button";
import {PencilIcon, StopCircleIcon, TrashIcon} from "@heroicons/react/24/outline";

export default function ComicDisplay({comic, onDel, char}) {
    function del() {
        fetch("/api/del", {
            method: "POST",
            body: {
                id: comic.id,
                comic: !char
            }
        }).then(data => data.json());
        onDel();
    }

    return <div className={styles.container} style={{
        "--url": `url(data:image/png;base64,${comic.image || comic.panels[0]})`
    }}>
        <div className={styles.blind}>
            <p className={styles.name}>{comic.name}</p>
        </div>

        <div className={styles.control}>
            <div>
                <p className={styles.name} style={{
                    marginTop: 0
                }}>{comic.name}</p>
                <div className={styles.buttons}>
                    <div className={styles.buttonSpace}><Button text={"Edit"} icon={<PencilIcon/>}
                                                                background={"#E20074"} color={"white"} link={!char ? ("/editor?id=" + comic.id) : "/character"}/></div>
                    <div><Button text={"Delete"} icon={<TrashIcon/>} background={"#E20074"} color={"white"} onClick={del}/></div>
                </div>
            </div>
        </div>
    </div>
}