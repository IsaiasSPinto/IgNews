import { FaGithub } from 'react-icons/fa'
import style from './styles.module.scss'
import {FiX} from 'react-icons/fi'
 
export default function SingInButon() {
    const isUserLogged = false


    return isUserLogged ? (
        <button className={style.signInButton} type="button">
            <FaGithub color="#04d361"/>     
            Nome da conta
            <FiX color="#737380" className={style.closeIcon}/>
        </button>
    ) : (
        <button className={style.signInButton} type="button">
        <FaGithub color="#eba417"/>     
        Sign in with Github
    </button>
    )
}