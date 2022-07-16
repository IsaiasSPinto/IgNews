import { GetServerSideProps, GetStaticPathsResult, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import  Head  from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss'

interface PostPreviewProps {
    post: {
        uid: string;
        Tittle: string;
        Content: string;
        updatedAt: string;
    }
}

export default function PostPreview({post} : PostPreviewProps) {
    const {data} = useSession()
    const router = useRouter()

    useEffect(() => {
        if(data?.activeSubscription) {
            router.push(`/posts/${post.uid}`)
        }
    }, [data])

    return (
        <>
            <Head>
                <title>{post.Tittle} | IgNews </title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.Tittle}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                    className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{__html : post.Content}}>
                    </ div>
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a href="">Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {

    const {uid} = params;

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('posts' , 'mapas-com-react-usando-leaflet', {})

    const post = {
        uid,
        Tittle: response.data.Tittle ,
        Content: RichText.asHtml(response.data.Content.splice(0,3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props : {
            post,
        },
        revalidate : 60 * 30
    }
}