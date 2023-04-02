import {useState} from "react";
import styles from "../../styles/pages/character/Character.module.css";
import RemovableFlag from "../../components/character/RemovableFlag";
import Button from "../../components/Button";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import {getAllCollection} from "../../database/database";

export default function Character() {
    const [data, setData] = useState({
        submitting: false,
        name: "",
        attributes: [],
        skin: "",
        hair: [],
        physical: [],
        clothes: []
    });

    function watchSingle(e) {
        const newData = {...data};
        newData[e.target.getAttribute("data-group")] = e.target.value.trim();
        setData(newData);
    }

    function watchMultiple(e) {
        if (e.key !== "Enter")
            return;

        const content = e.target.value;
        const group = e.target.getAttribute("data-group");

        if (content.trim().length === 0)
            return;
        e.target.value = "";
        if (data[group].includes(content.trim()))
            return;

        const newData = {...data};
        newData[group].push(content.trim());
        setData(newData);
    }

    function deleteMultiple(group, name) {
        const newData = {...data};
        newData[group].splice(newData[group].indexOf(name), 1);
        setData(newData);
    }

    const router = useRouter();
    function submit() {
        const newData = {...data};
        newData.submitting = true;
        setData(newData);

        fetch("/api/addcharacter", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                attributes: data.attributes,
                skin: data.skin,
                hair: data.hair,
                physical: data.physical,
                clothes: data.clothes
            })
        }).then(res => router.push("/"))
    }

    return <div className={styles.container}>
        <div className={styles.center}>
            <h1 className={styles.color}>{data.name || "My new character"}</h1>

            <form>
                <table className={styles.table}>
                    <tr>
                        <td>Name:</td>
                        <td className={styles.vals}>
                            <div className={styles.input}>
                                <input type={"text"} maxLength={40} data-group={"name"} placeholder={"James Bond"}
                                       onChange={watchSingle}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Attributes:</td>
                        <td className={styles.vals}>
                            <div className={styles.input}>
                                <input type={"text"} maxLength={30} data-group={"attributes"} onKeyDown={watchMultiple}
                                       placeholder={"Adventurous..."}/>
                            </div>
                            {data.attributes.length > 0 && <div className={styles.flagBox}>
                                {data.attributes.map(attribute => <RemovableFlag key={attribute} name={attribute}
                                                                                 onRemove={deleteMultiple.bind(null, "attributes", attribute)}/>)}
                            </div>}
                        </td>
                    </tr>
                    <tr>
                        <td>Skin color:</td>
                        <td className={styles.vals}>
                            <div className={styles.input}>
                                <input type={"text"} maxLength={30} placeholder={"Blue"} data-group={"skin"} onChange={watchSingle}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Hair color & style:</td>
                        <td className={styles.vals}>
                            <div className={styles.input}>
                                <input type={"text"} maxLength={30} data-group={"hair"} onKeyDown={watchMultiple}
                                       placeholder={"Silky..."}/>
                            </div>
                            {data.hair.length > 0 && <div className={styles.flagBox}>
                                {data.hair.map(attribute => <RemovableFlag key={attribute} name={attribute}
                                                                           onRemove={deleteMultiple.bind(null, "hair", attribute)}/>)}
                            </div>}
                        </td>
                    </tr>
                    <tr>
                        <td>Height and frame:</td>
                        <td className={styles.vals}>
                            <div className={styles.input}>
                                <input type={"text"} maxLength={30} data-group={"physical"} onKeyDown={watchMultiple}
                                       placeholder={"Muscular..."}/>
                            </div>
                            {data.physical.length > 0 && <div className={styles.flagBox}>
                                {data.physical.map(attribute => <RemovableFlag key={attribute} name={attribute}
                                                                               onRemove={deleteMultiple.bind(null, "physical", attribute)}/>)}
                            </div>}
                        </td>
                    </tr>
                    <tr>
                        <td>Clothes:</td>
                        <td className={styles.vals}>
                            <div className={styles.input}>
                                <input type={"text"} maxLength={30} data-group={"clothes"} onKeyDown={watchMultiple}
                                       placeholder={"Black Bandana..."}/>
                            </div>
                            {data.clothes.length > 0 && <div className={styles.flagBox}>
                                {data.clothes.map(attribute => <RemovableFlag key={attribute} name={attribute}
                                                                              onRemove={deleteMultiple.bind(null, "clothes", attribute)}/>)}
                            </div>}
                        </td>
                    </tr>
                </table>

                <div className={styles.center} style={{marginTop: 20}}>
                    <Button text={data.submitting ? "Submitting..." : "Submit"} icon={<CheckCircleIcon/>} background={"#E20074"} color={"white"} disabled={data.submitting} onClick={submit}/>
                    <p>Press ENTER to add an attribute after typing it.</p>
                </div>
            </form>
        </div>
    </div>
}

export async function getStaticProps() {
    const res = await getAllCollection()

    return {
        props: {
            comics: res.comics.map(a => {
                return {
                    ...a,
                    id: a._id.toHexString(),
                    _id: null
                }
            }),
            characters: res.characters.map(a => {
                return {
                    ...a,
                    id: a._id.toHexString(),
                    _id: null
                }
            })
        },
        revalidate: 10,
    }
}