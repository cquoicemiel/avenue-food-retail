import '../styles/globals.css'
import {Layout} from "../components";
import {RecoilRoot} from 'recoil';
import localFont from '@next/font/local'
import Head from "next/head";

const font = localFont({ src: '../assets/fonts/RedHatDisplayVariable.ttf' })

export default function App({ Component, pageProps }) {


        return (

            <>
                <Head>
                    <title>Terroir49</title>
                </Head>
                <main className={font.className}>
                    <RecoilRoot>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </RecoilRoot>
                </main>

            </>
        )



}
