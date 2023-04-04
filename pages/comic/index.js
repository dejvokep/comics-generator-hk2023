import styles from "../../styles/pages/character/Character.module.css";
import styles2 from "../../styles/pages/Comic.module.css";
import {useState} from "react";
import Button from "../../components/Button";
import {CheckCircleIcon, CpuChipIcon} from "@heroicons/react/24/outline";
import {getCharacters} from "../../database/database";
import {useRouter} from "next/router";

export default function Comic({ characters }) {
    const [data, setData] = useState({
        submitting: false,
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
        else {
            if (newData.characters.size === 5)
                return
            newData.characters.add(id);
        }
        setData(newData);
    }

    function validate() {
        return data.name && data.story && data.mood && data.location && data.style && data.characters.size > 0;
    }

    const router = useRouter();
    function submit() {
        const newData = {...data};
        newData.submitting = true;
        setData(newData);

        fetch("/api/addcomic", {
            method: "POST",
            body: JSON.stringify({
                ...data,
                characters: Array.from(data.characters)
            })
        }).then(res => res.json()).then(data => router.push(`editor?id=${data.id}`))
    }

    function storyAI() {
        if (data.submitting)
            return

        const newData = {...data};
        newData.submitting = true;
        setData(newData);

        const chars = []
        data.characters.forEach(ch => {
            chars.push(characters.filter(c => c.id === ch)[0])
        });

        if (data.story.length > 0) {
            fetch("/api/story", {
                method: "POST",
                body: JSON.stringify({
                    story: data.story,
                    characters: chars,
                    continu: true
                })
            }).then(data => data.json()).then(text => {
                const d = text.data;

                const newData = {...data};
                newData.submitting = false;
                newData.finished = d;
                setData(newData);
            })
        }
    }

    return <div className={styles.container}>
        <div className={styles.center}>
            <h1 className={styles.color}>{data.name || "My new comic"}</h1>
            <form>
                <table className={styles2.table}>
                    <tbody>
                    <tr>
                        <td>
                            <div className={styles2.group}>
                                <p>Name</p>
                                <input type={"text"} data-group={"name"} onChange={update} maxLength={60} />
                            </div>
                            <div className={styles2.group}>
                                <p>Story</p>
                                <textarea data-group={"story"} onChange={update} maxLength={1000} />
                                {data.finished && <p>
                                    <b style={{color: "#E20074"}}>Suggested:</b> {data.finished}
                                </p>}
                                <Button icon={<CpuChipIcon />} text={data.story.length > 0 ? "Finish using AI" : "Generate"} background={"#E20074"} color={"white"} onClick={storyAI} disabled={data.submitting} />
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
                    </tbody>
                </table>
            </form>
            <div className={styles2.button}>
                <Button text={data.submitting ? "Working..." : "Submit"} icon={<CheckCircleIcon/>} background={"#E20074"} color={"white"} disabled={data.submitting || !validate()} onClick={submit}/>
            </div>
        </div>
    </div>
}

export async function getStaticProps() {
    const res = await getCharacters()

    return {
        props: {
            characters: res.map(a => {
                return {
                    ...a,
                    id: a._id.toHexString(),
                    _id: null
                }
            }),
        },
        revalidate: 10,
    }
}