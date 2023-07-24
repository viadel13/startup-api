import { useState, useEffect } from "react";
import Navbar from "../navbar/Index";
import styles from "../../../../assets/css/article.module.css";
import { useNavigate } from "react-router-dom";


const Article = () => {
  const idArticle = localStorage.getItem("getArticle");
  const [view, setView] = useState(false);
  const [getArticle, setGetArticle] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("getArticle")) {
      setGetArticle(JSON.parse(localStorage.getItem("getArticle")));
    } else {
      setGetArticle("");
    }
  }, []);

  useEffect(() => {
    if (!idArticle) {
      setView(false);
      navigate("/blog/articles");
    } else {
      setView(true);
    }
  }, [idArticle, navigate]);

  if (view) {
    return (
      <>
        <Navbar />
        <div className={styles.article}>
        <h2 className="display-5 mb-5 container" style={{backgroundColor: "#2e93c211"}} >ARTICLE</h2>
          <div className={`container card`}>
            
            <h2 className={` text-center ${styles.h2}`}>
            {getArticle.titre}
            </h2>
            <div className="card-body">
              <p className="text-center fs-5">{getArticle.content}</p>
            </div>
            <div className="card-footer bg-transparent border-secondary text-center">{getArticle.categorie}</div>
          </div>
        </div>
      </>
    );
  }
};

export default Article;
