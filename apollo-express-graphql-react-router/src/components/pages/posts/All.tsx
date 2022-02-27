import { gql, useMutation, useQuery } from "@apollo/client";
import { Post } from "@types";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "src/hooks/form-context";
import styles from "./Posts.module.scss";

interface PostsData {
  getMany: Post[];
}

const DELETE = gql`
  mutation DeletePost($id: String!) {
    delete(id: $id) {
      id
      author
      title
    }
  }
`;

const GET_MANY = gql`
  query GetMany {
    getMany {
      id
      author
      title
    }
  }
`;

const All = () => {
  const nav = useNavigate();
  const { setForm } = useForm();
  
  const { loading, error, data } = useQuery<PostsData, Post>(GET_MANY);

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

  const handleUpdate = (post: Post) => {
    setForm({
      id: {
        value: post.id,
        placeholder: "ID",
        readOnly: true,
      },
      title: {
        value: post.title,
        placeholder: "Title",
        readOnly: true,
      },
      author: {
        value: post.author,
        placeholder: "Author",
        readOnly: false,
      },
    });
    nav("/");
  };

  return (
    <div>
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
          <div className={styles.list}>
            {data.getMany.map((post) => (
              <div className={styles.item} key={post.id}>
                <div>
                  {post.title}
                  <br />
                  {post.author}
                </div>
                <div className={styles.flex}>
                  <Link to={`/posts/${post.id}`}>
                    <button>View</button>
                  </Link>
                  <button onClick={() => handleUpdate(post)}>Update</button>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No Posts Were Found!</div>
      )}
    </div>
  );
};

export default All;
