import { gql, useQuery } from "@apollo/client";
import { Post } from "@types";
import { useLocation } from "react-router";

interface PostData {
  getUnique: Post;
}

const Unique = () => {
  const nav = useLocation();

  const target = nav.pathname.split("/")[2];

  const GET_POST = gql`
    query GetPost($id: String!) {
      getUnique(id: $id) {
        title
        author
        id
      }
    }
  `;

  const { loading, error, data } = useQuery<PostData, any>(GET_POST, {
    variables: { id: target },
  });

  return (
    <section>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>
          ERROR
          {JSON.stringify(error, null, 2)}
        </div>
      ) : data ? (
        <div>
          <h2>{data.getUnique.title}</h2>
          <div>{data.getUnique.author}</div>
        </div>
      ) : (
        <div>Nothing was found 😢</div>
      )}
    </section>
  );
};

export default Unique;
