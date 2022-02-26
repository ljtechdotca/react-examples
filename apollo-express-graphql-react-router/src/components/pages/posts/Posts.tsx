import { Outlet } from "react-router-dom";

const Posts = () => {
  return (
    <section>
      <h2>Posts</h2>
      <Outlet />
    </section>
  );
};

export default Posts;
