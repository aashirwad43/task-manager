import styles from "../styles/navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.navbarDiv}>
      <p className={styles.title}>Task Manager</p>
    </div>
  );
}

export default Navbar;
