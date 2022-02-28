import { Draggable } from "react-beautiful-dnd";
import { Handle } from "../../ui";
import styles from "./Item.module.scss";

export interface ItemProps {
  id: string;
  name: string;
  index: number;
}

export const Item = ({ id, index, name }: ItemProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={styles.root}
        >
          <Handle props={provided.dragHandleProps} />
          <div className={styles.container}>
            <div className={styles.flex}>
              <span className={styles.tag}>index: {index}</span>
              <span className={styles.tag}>id: {id}</span>
            </div>
            <span className={styles.name}>{name}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
