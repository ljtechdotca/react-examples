import { gql, useMutation } from "@apollo/client";
import { Post } from "@types";
import React, { useContext } from "react";
import { FormContext } from "src/App";

interface PostData {
  post: Post;
}

const Home = () => {
  const { form, setForm } = useContext(FormContext);

  const GET_MANY = gql`
    query GetMany {
      getMany {
        title
        author
        id
      }
    }
  `;

  // create a post
  const POST = gql`
    mutation CreatePost($author: String!, $title: String!) {
      post(author: $author, title: $title) {
        id
        author
        title
      }
    }
  `;
  const [createPost, { loading, error, data }] = useMutation<PostData, any>(
    POST,
    {
      variables: { title: form.title, author: form.author },
    }
  );
  const handlePost = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(form);
    if (form.id.length > 0) {
      console.log("ID detected, updating post");
      updatePost({
        refetchQueries: () => [
          {
            query: GET_MANY,
          },
        ],
        onError(err) {
          console.log(err);
        },
        variables: { id: form.id, author: form.author, title: form.title },
      });
    } else {
      createPost({
        refetchQueries: () => [
          {
            query: GET_MANY,
          },
        ],
        onError(error) {
          console.log(error);
        },
      });
    }
  };

  // update a post
  const UPDATE = gql`
    mutation UpdatePost($id: String!, $author: String!, $title: String!) {
      update(id: $id, author: $author, title: $title) {
        title
        author
        id
      }
    }
  `;
  const [updatePost, updateState] = useMutation<PostData, Partial<Post>>(
    UPDATE
  );

  return (
    <section>
      <h2>Home Page</h2>
      {loading ? (
        <div></div>
      ) : error ? (
        <div>{JSON.stringify(error, null, 2)}</div>
      ) : data ? (
        <div>{JSON.stringify(data, null, 2)}</div>
      ) : (
        <form onSubmit={handlePost}>
          <input
            onChange={(event) =>
              setForm((state) => ({ ...state, title: event.target.value }))
            }
            value={form.title}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
          />
          <input
            onChange={(event) =>
              setForm((state) => ({ ...state, author: event.target.value }))
            }
            value={form.author}
            type="text"
            id="author"
            name="author"
            placeholder="Author"
          />
          <button type="submit">submit</button>
        </form>
      )}
    </section>
  );
};

export default Home;
