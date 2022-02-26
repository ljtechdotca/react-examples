import { gql, useMutation, useQuery } from "@apollo/client";
import { Post } from "@types";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "src/App";

interface PostsData {
  getMany: Post[];
}

const All = () => {
  const nav = useNavigate();
  const { form, setForm } = useContext(FormContext);
  const handleUpdate = (post: Post) => {
    setForm(post);
    nav("/", { replace: true });
  };

  // fetch all
  const GET_MANY = gql`
    query GetMany {
      getMany {
        id
        author
        title
      }
    }
  `;
  const { loading, error, data } = useQuery<PostsData, Post>(GET_MANY);

  // delete a post
  const DELETE = gql`
    mutation DeletePost($id: String!) {
      delete(id: $id) {
        id
        author
        title
      }
    }
  `;
  const [deletePost, deleteState] = useMutation<PostsData, Partial<Post>>(
    DELETE
  );
  const handleDelete = (id: string) => {
    deletePost({
      refetchQueries: () => [
        {
          query: GET_MANY,
        },
      ],
      onError(err) {
        console.log(err);
      },
      variables: { id },
    });
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>
          <div>ERROR:</div>
          <pre>
            <code>{JSON.stringify(error, null, 2)}</code>
          </pre>
        </div>
      ) : data ? (
        <div>
          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.getMany.map((post) => (
              <li key={post.id} style={{ padding: "1rem" }}>
                <Link to={`/posts/${post.id}`}>
                  <div>{post.title}</div>
                  <div>{post.author}</div>
                  <div></div>
                </Link>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <button onClick={() => handleUpdate(post)}>Update</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Posts Were Found!</div>
      )}
    </>
  );
};

export default All;
