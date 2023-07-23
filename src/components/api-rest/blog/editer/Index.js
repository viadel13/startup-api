import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../navbar/Index";
import { fetchEditArticle, } from "../../../../redux/reducers/rootReducer";
import styles from "../../../../assets/css/editer.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Editer = () => {
  const location = useLocation();
  const articles = location.state?.article || null;
  const [view, setView] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [titre, setTitre] = useState(`${articles.titre}`);
  const [categorie, setCategorie] = useState(`${articles.categorie}`);
  const [content, setContent] = useState(`${articles.content}`);

 
  useEffect(() => {
    if (articles) {
      setView(true);
    } else {
      setView(false);
      navigate("/blog/articles");
    }
  }, [articles, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (titre && categorie && content) {
        dispatch(fetchEditArticle({id: articles._id, titre, categorie, content}));
      setCategorie("");
      setTitre("");
      setContent("");
      navigate('/blog');
      toast.success(() => (
        <div>
          Modifier avec success ! Voir <a href="/blog">Articles</a>
        </div>
      ));
    } else {
      toast("Veuillez remplir tous les champs svp!");
      setCategorie("");
      setTitre("");
      setContent("");
    }
  };

  if (view) {
    return (
      <>
   
        <Navbar />
 
        <div className={` container ${styles.editer}`}>
          <h2 className="display-5 mb-5"> Editer article :<span className="text-success fs-1 "> {articles.titre}</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="inputTitre" className="mb-2">
                Titre
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTitre"
                placeholder="Entrez le titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputContenu" className="mb-2">
                Contenu
              </label>
              <textarea
                className="form-control"
                id="inputContenu"
                rows="5"
                placeholder="Entrez le contenu"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="inputCategorie" className="mb-2">
                Categorie
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCategorie"
                placeholder="Entrez la categorie"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontSize: "20px", width: "150px" }}
            >
              Enregistre
            </button>
          </form>
        </div>
      </>
    );
  }
};

export default Editer;
