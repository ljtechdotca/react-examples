import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { List } from "../../common";
import styles from "./Home.module.scss";

interface HomeProps {}

const INIT_ITEMS = [
  {
    id: "balloon",
    name: "🎈 Balloon",
  },
  {
    id: "sparkles",
    name: "✨ Sparkles",
  },
  {
    id: "yarn",
    name: "🧶 Yarn",
  },
  {
    id: "crown",
    name: "👑 Crown",
  },
  {
    id: "jigsaw",
    name: "🧩 Jigsaw",
  },
];

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Home = ({}: HomeProps) => {
  const [items, setItems] = useState([...INIT_ITEMS]);

  const onDragEnd = (event: DropResult) => {
    const destination = event.destination;
    const source = event.source;
    if (destination) {
      setItems(reorder(items, source.index, destination.index));
    }
  };

  return (
    <div className={styles.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.container}>
          <List items={items} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
