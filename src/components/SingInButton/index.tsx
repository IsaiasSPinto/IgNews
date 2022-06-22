import { FaGithub } from 'react-icons/fa'
import style from './styles.module.scss'
import {FiX} from 'react-icons/fi'
import { signIn, useSession, signOut } from 'next-auth/react'
 
export default function SingInButon() {

    const {data} = useSession()


    return data ? (
        <button className={style.signInButton} type="button"
        onClick={() => signOut()}
        >
            <FaGithub color="#04d361"/>     
            {data.user.name}
            <FiX color="#737380" className={style.closeIcon}/>
        </button>
    ) : (
        <button className={style.signInButton} type="button"
        onClick={() => signIn('github')}
        >
        <FaGithub color="#eba417"/>     
        Sign in with Github
    </button>
    )
}