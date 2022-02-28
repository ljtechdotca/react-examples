import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import styles from "./Handle.module.scss";

interface HandleProps {
  props: DraggableProvidedDragHandleProps | undefined;
}

export const Handle = ({ props }: HandleProps) => {
  return (
    <div className={styles.root} {...props}>
      <svg
        width="4"
        height="19"
        viewBox="0 0 4 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 4.33325C3.10457 4.33325 4 3.43782 4 2.33325C4 1.22868 3.10457 0.333252 2 0.333252C0.89543 0.333252 0 1.22868 0 2.33325C0 3.43782 0.89543 4.33325 2 4.33325Z"
          fill="#cccccc"
        />
        <path
          d="M2 11.3333C3.10457 11.3333 4 10.4378 4 9.33325C4 8.22868 3.10457 7.33325 2 7.33325C0.89543 7.33325 0 8.22868 0 9.33325C0 10.4378 0.89543 11.3333 2 11.3333Z"
          fill="#cccccc"
        />
        <path
          d="M2 18.3333C3.10457 18.3333 4 17.4378 4 16.3333C4 15.2287 3.10457 14.3333 2 14.3333C0.89543 14.3333 0 15.2287 0 16.3333C0 17.4378 0.89543 18.3333 2 18.3333Z"
          fill="#cccccc"
        />
      </svg>
    </div>
  );
};

export default Handle;
