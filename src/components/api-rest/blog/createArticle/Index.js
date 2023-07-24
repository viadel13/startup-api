import { useState, useEffect } from "react";
import { fecthAddArticle } from "../../../../redux/reducers/rootReducer";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import styles from '../../../../assets/css/create.module.css'

const CreateArticles = () => {
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
 
  useEffect(()=>{
    localStorage.removeItem('getArticle');
    localStorage.removeItem('getArticle');
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(titre && categorie && content){
      dispatch(fecthAddArticle({titre, categorie, content}));
      setCategorie('');
      setTitre('');
      setContent('');
      toast.success(() => (
        <div>
          Ajouté avec succès ! Voir <a href="/blog">Articles</a>
        </div>
      ));
    } else{
      toast("Veuillez remplir tous les champs svp!");
      setCategorie('');
      setTitre('');
      setContent('');
    }

  };

  return (
    <>
     <h2 className="display-5 container"  style={{backgroundColor: "#2e93c211"}} > Nouvel article</h2>
       <div className={`container py-4 ${styles.create}`}>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="inputTitre" className="mb-2">Titre</label>
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
          <label htmlFor="inputContenu" className="mb-2">Contenu</label>
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
          <label htmlFor="inputCategorie" className="mb-2">Categorie</label>
          <input
            type="text"
            className="form-control"
            id="inputCategorie"
            placeholder="Entrez la categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{fontSize: "20px", width: '150px'}}>
          Enregistre
        </button>
      </form>
    </div>
    </>
 
  );
};

export default CreateArticles;
