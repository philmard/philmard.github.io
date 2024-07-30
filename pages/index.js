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
        </div>

        <div className={styles.spacer20}></div>
        <p className={styles.description}>&darr;</p>
        <div className={styles.spacer20}></div>

        <div>
          <h1 className={styles.title}>
            Getting to <a href="https://github.com/philmard">know me!</a>
          </h1>
          <div className={styles.spacer20}></div>
          <p className={styles.text1}>
            Hi! Let me guess. You 're probably reading this, because... I sent a
            job application *starts sweating*.
          </p>

          <p className={styles.text1}>Let me start by introducing myself.</p>
          <p className={styles.text1}>
            I'm Filippos Marntirosian, currently in my fifth year of Electrical
            and Computer Engineering degree at the National Technical University
            of Athens and I'm eager to start my career in the software industry!
          </p>

          <p className={styles.text1}>
            And I suppose this is where i pitch myself...
          </p>

          <p className={styles.text1}>
            &bull; I have tons of experience (okay, maybe not tons, but some).
          </p>

          <p className={styles.text1}>&bull; I'm super capable (probably).</p>

          <p className={styles.text1}>&bull; I learn fast (definitely true).</p>

          <p className={styles.text1}>
            &bull; I'm organized and have an eye for detail (absolutely).
          </p>

          <p className={styles.text1}>
            &bull; I thrive under pressure (most of the time).
          </p>
        </div>

        <div className={styles.spacer50}></div>
        <p className={styles.description}>&darr;</p>
        <div className={styles.spacer50}></div>

        <div>
          <h1 className={styles.title}>
            Here are some <a href="https://github.com/philmard">Fun Facts</a>{" "}
            about me:
          </h1>
          <div className={styles.spacer50}></div>
          <p className={styles.text1}>
            &bull; Came 5th place in two National Rubik's Cube competitions (wca
            acc link)
          </p>
          <p className={styles.text1}>
            &bull; Reached Challenger in League of Legends (Season 11){" "}
            (leagueofgraphs acc link)
          </p>
          <p className={styles.text1}>
            &bull; I'm a fast typer! Around ~100WPM (typeracer acc link)
          </p>
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
