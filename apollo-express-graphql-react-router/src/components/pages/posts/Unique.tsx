import { gql, useQuery } from "@apollo/client";
import { Post } from "@types";
import { useLocation } from "react-router";

const GET_POST = gql`
  query GetPost($id: String!) {
    getUnique(id: $id) {
      title
      author
      id
    }
  }
`;

const Unique = () => {
  const nav = useLocation();

  const target = nav.pathname.split("/")[2];

  const { loading, error, data } = useQuery<{ getUnique: Post }, Partial<Post>>(
    GET_POST,
    {
      variables: { id: target },
    }
  );

  return (
    <div>
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
    </div>
  );
};

export default Unique;
