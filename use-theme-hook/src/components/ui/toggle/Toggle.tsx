import styles from "./Toggle.module.scss";

export interface ToggleProps {
  active: boolean;
  onToggle: (boolean: boolean) => void;
}

export const Toggle = ({ active, onToggle }: ToggleProps) => {
  return (
    <div className={styles.root} onClick={() => onToggle(!active)}>
      <input
        className={active ? styles.container__active : styles.container}
        type="checkbox"
        name="toggle"
        id="toggle"
        onChange={() => onToggle(!active)}
        checked={active}
      />
    </div>
  );
};
