import { useTheme } from "../../../hooks/use-theme";
import { Toggle } from "../../ui/toggle/Toggle";
import styles from "./Home.module.scss";

const Home = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <section className={styles.root}>
      <Toggle
        active={theme === "dark" ? true : false}
        onToggle={() => switchTheme(theme === "dark" ? "light" : "dark")}
      />
    </section>
  );
};

export default Home;
