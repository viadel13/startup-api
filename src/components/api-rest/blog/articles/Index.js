import { useEffect, useState } from "react";
import {fetchArticles,AddArticles,dropArticle} from "../../../../redux/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../assets/css/articles.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import ModalDel from "../../../modal/ModalDel";

const Articles = () => {
  const [load, setLoad] = useState(false);
  const[detailArticleDel, setDetailArticleDel]= useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    // const socket = io("http://localhost:3001");
    const socket = io("https://api-blog-v7sl.onrender.com:3000");
    socket.on("articleDel", (article) => {
      console.log('article supprimer est  : ', article);
      dispatch(dropArticle(article.id));
      toast.success(() => (
        <p>
          Article <span className="text-danger"> {article.titre} </span> supprimer
          avec success
        </p>
      ));
    });
    return () => { 
      socket.off("articleDel");
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticles());
    // const socket = io("http://localhost:3001");
    const socket = io("https://api-blog-v7sl.onrender.com:3000");
    socket.on("articleAdded", (newArticle) => {
      console.log("Nouvel article ajouté :", newArticle);
      // console.log(newArticle)
      dispatch(AddArticles(newArticle));
      
    }, [dispatch]);

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      socket.off("articleAdded");
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if (articles) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [articles]);

  const handleDelete = (id, titre)=>{
    setShow(true);
    setDetailArticleDel({...detailArticleDel, id, titre});
  }

  return (

    <>
       <div>
      <div className="container">
        <h2 className="display-5 mb-5 ">NOS ARTICLES</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {load ? (
            articles &&
            articles &&
            articles.map((article) => {
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
                      <span onClick={()=>handleDelete(article._id, article.titre)}>
                        <AiOutlineDelete
                          size={25}
                          className={`my-anchor-element ${styles.btnSup}`}
                        />
                      </span>

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
    <ModalDel show={show} setShow={setShow} detailArticleDel={detailArticleDel} />
    </>
   
  );
};

export default Articles;
