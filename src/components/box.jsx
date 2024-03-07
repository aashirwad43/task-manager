import styles from "../styles/box.module.scss";

function Box({ children }) {
  return <div className={styles.box}>{children}</div>;
}

export default Box;
