// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../../../redux/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../assets/css/articles.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { Tooltip } from "react-tooltip";

const Articles = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const [hasReloaded, setHasReloaded] = useState(false);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);
  useEffect(() => {
    // Vérifie si le rechargement a déjà eu lieu pour éviter de recharger à nouveau
    if (!hasReloaded) {
      // Marque le rechargement comme effectué
      setHasReloaded(true);
      // Recharge la page après 2 secondes
      const timeoutId = setTimeout(() => {
        window.location.reload();
    
      }, 1000);

      // Nettoyage du timeout pour annuler le rechargement si le composant est démonté avant les 2 secondes
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [hasReloaded]);

  useEffect(() => {
    if (articles) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [articles]);

  return (
    <div>
      <div className="container">
        <h2 className="display-5 mb-5 ">NOS ARTICLES</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {load ? (
            articles &&
            articles[0] &&
            articles[0].map((article) => {
              return (
                <div className="col" key={article._id}>
                  <div className={`card h-100 ${styles.cardHoverEffect}`}>
                    {/* <img src="..." className="card-img-top" alt="..." /> */}
                    <div className="card-body">
                      <h5 className="card-title">{article.titre}</h5>
                      <p className="card-text">{article.content}</p>
                    </div>
                    <div className="card-footer d-flex align-items-center ">
                      <small className="text-muted me-auto">
                        {article.categorie}
                      </small>
                      {/* <AiOutlineEye /> */}

                      <AiOutlineDelete
                        size={25}
                        className={`my-anchor-element ${styles.btnSup}`}
                      />
                      <Tooltip anchorSelect=".my-anchor-element" place="top">
                        Supprimer
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p> chargement... </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
