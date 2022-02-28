import { Droppable } from "react-beautiful-dnd";
import { Item } from "..";

interface ListProps {
  items: { id: string; name: string }[];
}

export const List = ({ items }: ListProps) => {
  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          {...provided.placeholder}
          ref={provided.innerRef}
        >
          {items.map((item, index) => (
            <Item key={item.id} index={index} {...item} />
          ))}
        </div>
      )}
    </Droppable>
  );
};

export default List;
