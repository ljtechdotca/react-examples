import { Outlet } from "react-router-dom";
import styles from "./Posts.module.scss";

const Posts = () => {
  return (
    <section className={styles.root}>
      <h2>Posts</h2>
      <Outlet />
    </section>
  );
};

export default Posts;
