import ComicDisplay from "../../components/collection/ComicDisplay";
import styles from "../../styles/pages/Collection.module.css";
import Button from "../../components/Button";
import {PlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Collection({comics, characters}) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (data.comics) {
            return
        }

        fetch("/api/getall").then(data => data.json()).then(json => {
            console.log(json)
            setData({
                comics: json.data.comics.map(a => {
                    return {
                        ...a,
                        id: a._id
                    }
                }),
                characters: json.data.characters.map(a => {
                    return {
                        ...a,
                        id: a._id
                    }
                })
            });
        })
    }, []);

    if (!data.comics) {
        return <div className={styles.container}>
            <h1 style={{ color: "white" }}>Loading...</h1>
        </div>
    }

    function refresh() {
        window.location.reload();
    }

    return <div className={styles.container}>
        <div className={styles.carousel}>
            <h1>My comics</h1>
            <div className={styles.displayBox}>
                {data.comics.map(comic => <ComicDisplay key={comic.id} comic={comic} onDel={refresh} char={false}/>)}
                <div className={styles.addNew}>
                    <Link href={"/comic"}><PlusIcon/></Link>
                </div>
            </div>
        </div>
        <div className={styles.carousel}>
            <h1>My characters</h1>
            <div className={styles.displayBox}>
                {data.characters.map(character => <ComicDisplay key={character.id} comic={character} onDel={refresh} char={true}/>)}
                <div className={styles.addNew}>
                    <Link href={"/character"}><PlusIcon/></Link>
                </div>
            </div>
        </div>
    </div>
}
/*
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
}*/