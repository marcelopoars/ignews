// Integração do Stripe com o browser
/*
    Instalada dependência '@stripe/stripe-js'

*/
import { loadStripe } from '@stripe/stripe-js'

export async function getStripeJs() {
    // Chave pública do stripe
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    return stripeJs
}