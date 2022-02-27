import { gql, useMutation } from "@apollo/client";
import { Post } from "@types";
import React from "react";
import Form from "src/components/ui/form/Form";
import { useForm } from "src/hooks/form-context";
import styles from "./Home.module.scss";

const GET_MANY = gql`
  query GetMany {
    getMany {
      title
      author
      id
    }
  }
`;

const POST = gql`
  mutation CreatePost($author: String!, $title: String!) {
    post(author: $author, title: $title) {
      id
      author
      title
    }
  }
`;

const UPDATE = gql`
  mutation UpdatePost($id: String!, $author: String!, $title: String!) {
    update(id: $id, author: $author, title: $title) {
      id
      author
      title
    }
  }
`;

const Home = () => {
  const { form } = useForm();

  // task : use cache.modify
  const [
    createPost,
    { loading: createLoading, error: createError, data: createData },
  ] = useMutation<{ post: Post }, Partial<Post>>(POST, {
    variables: { title: form.title.value, author: form.author.value },
  });

  const [
    updatePost,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation<{ post: Post }, Partial<Post>>(UPDATE);

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (form.id.value.length > 0) {
      updatePost({
        refetchQueries: () => [
          {
            query: GET_MANY,
          },
        ],
        onError(error) {
          console.log(error);
        },
        variables: {
          id: form.id.value,
          author: form.author.value,
          title: form.title.value,
        },
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
        variables: {
          author: form.author.value,
          title: form.title.value,
        },
      });
    }
  };

  return (
    <section className={styles.root}>
      <h2>Home Page</h2>
      {createLoading || updateLoading ? (
        <div>Loading...</div>
      ) : createError || updateError ? (
        <div>
          <pre>
            <code>{JSON.stringify(createError, null, 2)}</code>
          </pre>
          <pre>
            <code>{JSON.stringify(updateError, null, 2)}</code>
          </pre>
        </div>
      ) : createData || updateData ? (
        <div>
          <pre>
            <code>{JSON.stringify(createData, null, 2)}</code>
          </pre>
          <pre>
            <code>{JSON.stringify(updateData, null, 2)}</code>
          </pre>
          <Form onSubmit={handleForm} />
        </div>
      ) : (
        <Form onSubmit={handleForm} />
      )}
    </section>
  );
};

export default Home;
