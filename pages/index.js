import fetch from "isomorphic-fetch";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";
import Link from "next/link";
import { useEffect } from "react";

const Index = ({ stories, page }) => {

  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("service worker registration successful", registration);
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  })

  return (
    <Layout title="Hacker Next" description="A Hacker News clone made in Next.js">
      <StoryList stories={stories} />
      
      <footer>
        <Link href={`/?page=${page + 1}`}>
          <a> Next page ({page + 1}) </a>
        </Link>
      </footer>

      <style js>{`

        footer {
          padding: 1em;
        }

        footer a {
          font-weight: bold;
          color: black;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async ({ req, res, query }) => {
  let stories;
  let page = Number(query.page) || 1;
  
  try {
    const response = await fetch(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    )
    stories = await response.json();
  } catch (err) {
    console.log(err);
    stories = [];
  }
  return { stories, page };
};

export default Index;
