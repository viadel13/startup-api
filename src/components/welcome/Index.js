import { useEffect } from "react";
import styles from "../../assets/css/welcome.module.css";
import ModalB from "../modal/Index";


const Welcome = () => {
  
  useEffect(() => {
    // Efface la clé 'selectApi' du stockage local
    localStorage.removeItem('selectApi');
    localStorage.removeItem('getArticle');

  }, []);

  return (
    <div className={styles.welcome}>
      <div className={`container  ${styles.containerWelcome}`}>
        <div className="row">
          <h1 className={styles.h1}>WELCOME TO API REST</h1>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <ModalB />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
