import { useNavigate } from "react-router-dom";
import styles from "../BackButton/BackButton.module.css";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)} className={styles.btn_back}>
        &larr;
      </button>
    </div>
  );
}

export default BackButton;
