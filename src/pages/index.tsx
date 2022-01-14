// import { GetServerSideProps } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { stripe } from "../services/stripe";

import { SubscribeButton } from "../Components/SubscribeButton";

import styles from "./home.module.scss";

// formas de fazer chamadas a API
// client-side (algo que não precisa estar na página enquanto ela carrega)
// server-side (SEO, dados dinâmicos, sessão do usuário, tempo real)
// static site generation (iguais pra todo mundo, SEO)

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world.
          </h1>
          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

/*
  Para fazer uma chamada via SERVER SIDE RENDERING,
  A chamada precisa sempre partir da página para os componente
*/
// export const getServerSideProps: GetServerSideProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IbDN3KcZqJk9Ngx3WqYGoQd");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
