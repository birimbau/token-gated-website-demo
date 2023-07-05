import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount } from 'wagmi';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Token page demo</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Header />
        <Content />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.raidguild.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made with ❤️ by your frens at Raid Guild
        </a>
      </footer>
    </div>
  );
};

export default Home;
