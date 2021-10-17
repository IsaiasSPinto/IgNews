import SingInButon from '../SingInButton'
import styles from './styles.module.scss'

export default function Header(){
    return (
        <header className={styles.headerConteiner}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>
                <SingInButon />
            </div>
        </header>
    )
}