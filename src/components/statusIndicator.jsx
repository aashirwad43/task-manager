import styles from "../styles/statusIndicator.module.scss";

function StatusIndicator({ children, status }) {
  console.log(status);
  return (
    <div
      className={`${styles.statusBox} ${
        status ? styles[`statusBox--${status}`] : styles[`statusBox--${status}`]
      }`}
    >
      {children}
    </div>
  );
}

export default StatusIndicator;