import style from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string
}


export default function SubscribeButton({priceId}: SubscribeButtonProps) {
    return (
        <button type="button" className={style.subscribeButton}>
            Subscribe now
        </button>
    )
}