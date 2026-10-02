import { useNavigate } from "react-router-dom";
import styles from "../BackButton/BackButton.module.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")} className={styles.btn_back}>
        <span>&larr;</span>
      </button>
    </div>
  );
}

export default BackButton;
