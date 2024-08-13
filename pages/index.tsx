import { type GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

import Counter from '../components/Counter';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Index() {
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>TBD</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                </main>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
    props: {
        session: await getSession(ctx),
    },
});
