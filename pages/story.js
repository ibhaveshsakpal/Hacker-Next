import fetch from "isomorphic-fetch";
import Layout from "../components/Layout";
import Error from "next/error";

const Story = ({ story }) => {

  if (!story) {
    return <Error statusCode={503} />;
  }

  const createMarkup =(content)=> {
   
    console.log("===",content);
    
    return {
        __html: content.content    
    };
  }

  return (
    <Layout title={story.title} backButton={true}>
      <main>
        <h1 className="story-title">
          <a href={story.url}> {story.title} </a>
        </h1>

        {story.comments.map((comment) => (
          <div key={comment.id} className="story-details">
            <strong className="comment-title"> {comment.user} </strong>
            <div dangerouslySetInnerHTML={createMarkup(comment)}></div>
            <strong> {comment.time_ago} </strong>
          </div>
        ))}

        <style jsx>{`
          main {
            padding: 1em;
          }

          .story-title {
            font-size: 1.2rem;
            margin: 0;
            font-weight: 300;
            padding-bottom: 0.5em;
          }

          .story-title a {
            color: #333;
            text-decoration: none;
          }

          .story-title a:hover {
            text-decoration: underline;
          }

          .story-details {
            font-size: 0.8rem;
            padding: 1em;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-botttom: 1em;
          }

          .comment-title {
              font-size: 1rem;
          }

          .story-details strong {
            margin-right: 1em;
          }

          .story-details a {
            color: #f60;
          }
        `}</style>
      </main>
    </Layout>
  );
};

Story.getInitialProps = async ({ req, res, query }) => {
  let story;
  try {
    const storyId = query.id;
    const response = await fetch(
      `https://node-hnapi.herokuapp.com/item/${storyId}`
    );
    story = await response.json();
  } catch (err) {
    console.log(err);
    story = null;
  }

  return { story };
};

export default Story;
