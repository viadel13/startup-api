import { useEffect, useState } from "react";
import {
  fetchArticles,
  AddArticles,
  dropArticle,
  fetchArticle,
  editArticle,
} from "../../../../redux/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../assets/css/articles.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import {MdModeEdit} from "react-icons/md"
import { Tooltip } from "react-tooltip";
import { io } from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import ModalDel from "../../../modal/ModalDel";
import { useNavigate } from "react-router-dom";
import Filter from "../filter/Index";

const Articles = () => {
  const [detailArticleDel, setDetailArticleDel] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articles = useSelector((state) => state.articles.articles);
  const load = useSelector((state) => state.articles.load);

  useEffect(() => {
    // const socket = io("http://localhost:5000");

    const socket = io("https://api-blog-v7sl.onrender.com");
    socket.on("articleDel", (article) => {
      dispatch(dropArticle(article.id));
      toast.success(() => (
        <p>
          Article <span className="text-danger"> {article.titre} </span>{" "}
          supprimer avec success
        </p>
      ));
    });
    return () => {
      socket.off("articleDel");
      socket.disconnect();
    };
  }, [dispatch]);
  
  useEffect(() => {
    // const socket = io("http://localhost:5000");

    const socket = io("https://api-blog-v7sl.onrender.com");
    socket.on("articleUpdate", (article) => {
      dispatch(editArticle(article));
    });
    return () => {
      socket.off("articleUpdate");
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticles());
    localStorage.removeItem("getArticle");
    // const socket = io("http://localhost:5000");
    const socket = io("https://api-blog-v7sl.onrender.com");
    socket.on("articleAdded", (newArticle) => {
      dispatch(AddArticles(newArticle));
    });

    return () => {
      socket.off("articleAdded");

      socket.disconnect();
    };
  }, [dispatch]);
  
  const handleCard = (id, article) => {
    dispatch(fetchArticle(id));
    localStorage.setItem("getArticle", id);
    localStorage.setItem("getArticle", JSON.stringify(article));
    navigate("/article");
  };

  const handleDelete = (id, titre) => {
    setShow(true);
    setDetailArticleDel({ ...detailArticleDel, id, titre });
  };
  const handleEdit = (article) => {
    navigate("/editer", { state: { article } });
  };


  const showArticles = articles.map((article) => {
    return (
      <div className="col" key={article._id}>
        <div className={`card h-100 ${styles.cardHoverEffect}`}>
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div
            className="card-body"
            onClick={() => handleCard(article._id, article)}
            style={{ cursor: "pointer" }}
          >
            <h5 className="card-title">{article.titre}</h5>
            <p className="card-text">{article.content}</p>
          </div>
          <div className="card-footer d-flex align-items-center ">
            <small className="text-muted me-auto">{article.categorie}</small>
      
            <span
              onClick={() => handleEdit(article)}
              style={{ cursor: "pointer" }}
            >
              <MdModeEdit
                size={25}
                className={`editer ${styles.btnEdit}`}
              />
            </span>

            <Tooltip anchorSelect=".editer" place="top">
              Editer
            </Tooltip>

            {/* icon supprimer */}

            <span
              onClick={() => handleDelete(article._id, article.titre)}
              style={{ cursor: "pointer" }}
              className="ms-3"
            >
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
  });

  const spinner = (
    <div
      className="spinner-border text-primary"
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <>
      <div>
        <h2 className={`display-5 mb-5 container`} style={{backgroundColor: "#2e93c211"}}>NOS ARTICLES</h2>

        <div
          className={` container ${load && "d-flex justify-content-center"} `}
        >
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {!load ? (
              articles.length <= 0 ? (
                <p>aucun article trouve</p>
              ) : (
                showArticles
              )
            ) : (
              spinner
            )}
          </div>

        </div>
        {articles && <Filter />}
      
      </div>
      <ModalDel
        show={show}
        setShow={setShow}
        detailArticleDel={detailArticleDel}
      />

    </>
  );
};

export default Articles;
