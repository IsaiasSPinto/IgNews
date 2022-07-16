import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Post = {
    uid: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    const {data} = useSession()


    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link href={`/posts/${post.uid}`} >
                            <a key={post.uid}>
                                <time>{post.updatedAt}</time>
                                <strong>{post.title}</strong>
                                <p>{post.excerpt}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>

        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();


    const response = await prismic.getByTag("Ignews")

    const posts = response.results.map(post => {
        return {
            uid: post.uid,
            title: post.data.Tittle,
            excerpt: post.data.Content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            posts
        }
    }
}