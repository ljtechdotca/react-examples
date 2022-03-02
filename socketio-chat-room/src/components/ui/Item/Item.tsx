import styles from "./Item.module.scss";

interface ItemProps {
  avatar: string;
  name: string;
}

export const Item = ({ avatar, name }: ItemProps) => {
  return (
    <li className={styles.root}>
      <img
        className={styles.avatar}
        src={avatar}
        alt={name}
        height={16}
        width={16}
      />
      <span>{name}</span>
    </li>
  );
};

export default Item;
