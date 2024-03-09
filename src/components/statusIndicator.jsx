import styles from "../styles/statusIndicator.module.scss";

function StatusIndicator({ children, status, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.statusBox} ${
        status ? styles[`statusBox--${status}`] : styles[`statusBox--${status}`]
      }`}
    >
      {children}
    </div>
  );
}

export default StatusIndicator;
