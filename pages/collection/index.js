import ComicDisplay from "../../components/collection/ComicDisplay";
import styles from "../../styles/pages/Collection.module.css";
import Button from "../../components/Button";
import {PlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {getAllCollection} from "../../database/database";

export default function Collection({comics, characters}) {
    return <div className={styles.container}>
        <div className={styles.carousel}>
            <h1>My comics</h1>
            <div className={styles.displayBox}>
                {comics.map(comic => <ComicDisplay key={comic.id} comic={comic}/>)}
                <div className={styles.addNew}>
                    <Link href={"/comic"}><PlusIcon/></Link>
                </div>
            </div>
        </div>
        <div className={styles.carousel}>
            <h1>My characters</h1>
            <div className={styles.displayBox}>
                {characters.map(character => <ComicDisplay key={character.id} comic={character}/>)}
                <div className={styles.addNew}>
                    <Link href={"/character"}><PlusIcon/></Link>
                </div>
            </div>
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