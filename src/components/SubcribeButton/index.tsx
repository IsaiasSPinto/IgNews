import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { GetStripeJs } from '../../services/stripe-js';
import style from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string
}


export default function SubscribeButton({priceId}: SubscribeButtonProps) {
    const {data} = useSession();
    const router = useRouter();

    async function handleSubscribe(){
        if(!data){
            signIn('github')
            return
        }

        if(data.activeSubscription) {
            router.push('/posts')
            return
        }

        try {
            const response = await api.post('/subscribe')
            const {sessionId} = response.data

            const stripe = await GetStripeJs()

            await stripe.redirectToCheckout({sessionId: sessionId})
        } catch(err)
        {
            alert(err.message)
        }

    }
    return (
        <button type="button" 
        onClick={handleSubscribe}
        className={style.subscribeButton}>
            Subscribe now
        </button>
    )
}