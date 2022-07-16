import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";

import styles from './post.module.scss'

interface PostProps {
    post: {
        uid: string;
        Tittle: string;
        Content: string;
        updatedAt: string;
    }
}

export default function Post({ post }: PostProps) {
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
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.Content }}>
                    </ div>

                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params, query }) => {
    const session = await getSession({ req })

    
    const { uid } = params;
    
    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: `posts/preview/${uid}`,
                permanent: false,
            }
        }
    }

    const prismic = getPrismicClient(req)


    const response = await prismic.getByUID('posts', String(uid), {})

    const post = {
        uid,
        Tittle: response.data.Tittle,
        Content: RichText.asHtml(response.data.Content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        }
    }


}