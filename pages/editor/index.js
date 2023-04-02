import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Button from "../../components/Button";
import {ArrowPathIcon, ClockIcon, PlusCircleIcon, PlusIcon} from "@heroicons/react/24/outline";
import styles from "../../styles/pages/Editor.module.css";
import PanelDisplay from "../../components/editor/PanelDisplay";

export default function Editor() {
    const [data, setData] = useState({});
    const [generating, setGenerating] = useState(false);
    const router = useRouter();
    const ref = useRef();

    function generate() {
        if (!data.name)
            return

        setGenerating(true);

        fetch("/api/narrative", {
            method: "POST",
            body: JSON.stringify({
                ...data
            })
        }).then(narrative => {
            const newData = {...data};
            newData.narrative = narrative;
            setData(newData);
            setGenerating(false);
        })
    }

    useEffect(() => {
        if (!router.query.id)
            return

        fetch("/api/getcomic", {
            method: "POST",
            body: JSON.stringify({
                id: router.query.id
            })
        }).then(data => data.json()).then(data => {
            setData(data.data)
            setGenerating(false);
        })
    }, [router.query.id])

    if (!data.name) {
        return <h1 className={styles.container}>Loading...</h1>
    }

    if (!data.narrative) {
        return <div className={styles.container}>
            <p>You must generate a narrative first. It is generated artificially from the inputted story and might be
                regenerated later once a change to the story is made.</p>
            <Button text={generating ? "Generating..." : "Generate"} icon={<PlusCircleIcon/>} background={"#E20074"}
                    color={"white"} disabled={generating} onClick={generate}/>
        </div>
    }

    function generateImage() {
        if (generating)
            return

        setGenerating(true)
        const narrative = data.narrative[data.panels.length]

        fetch("/api/genimage", {
            method: "POST",
            body: JSON.stringify({
                id: router.query.id,
                ...narrative
            })
        }).then(data => data.json()).then(b => {
            const newData = {...data}
            newData.panels.push(b.base64);
            setData(newData);
            setGenerating(false)
        })
    }

    function regenImage(i) {
        if (generating)
            return

        setGenerating(true)
        const narrative = data.narrative[i]

        fetch("/api/regenimage", {
            method: "POST",
            body: JSON.stringify({
                id: router.query.id,
                i,
                ...narrative
            })
        }).then(data => data.json()).then(b => {
            const newData = {...data}
            newData.panels[i] = b.base64;
            setData(newData);
            setGenerating(false)
        })
    }

    function regenerateNarrative(e) {
        const text = ref.current.value;

        setData({
            ...data,
            panels: [],
            story: text
        })

        if (!data.name)
            return

        setGenerating(true);

        fetch("/api/narrative", {
            method: "POST",
            body: JSON.stringify({
                characters: data.characters,
                story: text
            })
        }).then(narrative => {
            const newData = {...data};
            newData.narrative = narrative;
            newData.panels = [];
            newData.story = text;
            setData(newData);
            setGenerating(false)
        })
    }

    return <div className={styles.container}>
        <h1>{data.name}</h1>
        <div className={styles.displayBox}>
            {data.panels && (data.panels.map((panel, i) => <PanelDisplay key={i} image={panel} generating={generating}
                                                                         onUpdate={regenImage.bind(null, i)}/>))}
            <div className={styles.addNew} onClick={generateImage}>
                {generating ? <ClockIcon/> : <PlusIcon/>}
            </div>
        </div>

        <div>
            <p>Story: {data.story}</p>
            <textarea ref={ref} />
        </div>
        <Button text={"Regenerate narrative"} icon={<ArrowPathIcon/>} background={"#E20074"} color={"white"}
                onClick={regenerateNarrative} disabled={generating}/>
    </div>
}