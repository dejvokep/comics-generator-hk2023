import styles from "../../styles/pages/character/Character.module.css";
import styles2 from "../../styles/pages/Comic.module.css";
import {useState} from "react";
import Button from "../../components/Button";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

export default function Comic() {
    const characters = [
        {
            id: "a",
            name: "Alfonz Higgins",
            image: "http://localhost:3000/background.png"
        },
        {
            id: "b",
            name: "Name",
            image: "http://localhost:3000/favicon.png"
        }
    ]

    const [data, setData] = useState({
        name: "",
        story: "",
        characters: new Set(),
        mood: "",
        location: "",
        style: ""
    });

    function update(e) {
        const newData = {...data};
        newData[e.target.getAttribute("data-group")] = e.target.value.trim();
        setData(newData);
    }

    function toggleCharacter(id) {
        const newData = {...data};
        if (newData.characters.has(id))
            newData.characters.delete(id);
        else
            newData.characters.add(id);
        setData(newData);
    }

    return <div className={styles.container}>
        <div className={styles.center}>
            <h1 className={styles.color}>{data.name || "My new comic"}</h1>
            <form>
                <table className={styles2.table}>
                    <tr>
                        <td>
                            <div className={styles2.group}>
                                <p>Name</p>
                                <input type={"text"} data-group={"name"} onChange={update} maxLength={60} />
                            </div>
                            <div className={styles2.group}>
                                <p>Story</p>
                                <textarea data-group={"story"} onChange={update} maxLength={1000} />
                            </div>
                            <div className={styles2.group}>
                                <p>Mood</p>
                                <input type={"text"} data-group={"mood"} onChange={update} maxLength={100} />
                            </div>
                            <div className={styles2.group}>
                                <p>Location</p>
                                <input type={"text"} data-group={"location"} onChange={update} maxLength={100} />
                            </div>
                            <div className={styles2.group}>
                                <p>Art style</p>
                                <input type={"text"} data-group={"style"} onChange={update} maxLength={100} />
                            </div>
                        </td>
                        <td>
                            <div className={styles2.group}>
                                <p>Characters {data.characters.size}/5 <span style={{
                                    color: "lightgray"
                                }}>(click to select)</span></p>
                                <div className={styles2.characters}>
                                    {characters.map(character => <div className={data.characters.has(character.id) ? styles2.activeCharacter : styles2.inactiveCharacter} key={character.id} onClick={toggleCharacter.bind(null, character.id)}><p>{character.name}</p></div>)}
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
            <div className={styles2.button}>
                <Button text={"Submit"} icon={<CheckCircleIcon />} background={"#E20074"} color={"white"} />
            </div>
        </div>
    </div>
}