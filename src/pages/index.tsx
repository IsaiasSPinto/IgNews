import Head from 'next/head'
import styles from './home.module.scss'

export default function Home()  {
  return (
    <>
      <Head>
        <title>Home | IgNews</title>
      </Head>
      <main className={styles.contentConteiner}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about <br/>the <span>React</span> world</h1>
          <p>
            Get access to all publications <br />
            <span>for $9.99 month.</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="womam coding" />
      </main>
    </>
  )
}

