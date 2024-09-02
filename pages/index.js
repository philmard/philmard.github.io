import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>philmard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/philmard">My Personal Page!</a>
        </h1>

        <p className={styles.description}>
          These are some of my <code>github/repos</code>
        </p>

        <div className={styles.grid}>
          <a href="https://github.com/philmard/LMS" className={styles.card}>
            <h3>LMS</h3>
            <p>
              Project that simulates a Database for a Library Management System.
            </p>
          </a>

          <a
            href="https://github.com/philmard/TravelBuddy"
            className={styles.card}
          >
            <h3>TravelBuddy</h3>
            <p>An Android app for tracking your adventures!</p>
          </a>

          <a
            href="https://github.com/philmard/FlarpyBlorb"
            className={styles.card}
          >
            <h3>Flarpy Blorb</h3>
            <p>A Game very similar to Flappy Bird created in Unity.</p>
          </a>

          <a href="https://github.com/philmard/8085" className={styles.card}>
            <h3>8085</h3>
            <p>Small Projects in Assembly Programming Language of 8085.</p>
          </a>

          <a
            href="https://github.com/philmard/FlarpyBlorb"
            className={styles.card}
          >
            <h3>Flarpy Blorb</h3>
            <p>A Game very similar to Flappy Bird created in Unity.</p>
          </a>

          <a
            href="https://github.com/philmard/FlarpyBlorb"
            className={styles.card}
          >
            <h3>Flarpy Blorb</h3>
            <p>A Game very similar to Flappy Bird created in Unity.</p>
          </a>
        </div>
      </main>

      <footer>
        <p>
          Made by <a href="https://github.com/philmard"> philmard </a>
        </p>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}