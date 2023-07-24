import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleCat, fetchArticles } from "../../../../redux/reducers/rootReducer";
import axios from "axios";

const Filter = () => {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState();
  const [allArticles, setAllArticles] = useState(false);
  const art = useSelector((state) => state.articles.articles);

  useEffect(() => {
    datas();
  }, [art]);

  async function datas() {
    try {
      // const response = await axios.get("http://127.0.0.1:5000/articles");
      const response = await axios.get('https://api-blog-v7sl.onrender.com/articles');
      setArticles(response.data);
    } catch (error) {}
  }

  useEffect(()=>{
   allArticles && dispatch(fetchArticles())
  }, [dispatch, allArticles])

  const uniqueCategories =
    articles &&
    articles.filter((article, index, self) => {
      const categoryLowerCase = article.categorie.toLowerCase();
      return (
        self.findIndex(
          (a) => a.categorie.toLowerCase() === categoryLowerCase
        ) === index
      );
    });
  const handleSubmit = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue !== 'tous') {
      dispatch(fetchArticleCat(selectedValue));
      setAllArticles(false);
    }else{
      setAllArticles(true)
    }
  };



  const option =
    articles &&
    uniqueCategories.map((i) => (
      <option key={i._id} value={i.categorie}>
        {i.categorie}
      </option>
    ));

  return (
    <div className="container pb-5">
      <div className="row mt-4">
        <div className="col-6">
          <p className="small mb-0 me-2 fs-5 text-muted">Filter</p>
          <select
            className={`form-select`}
            aria-label="Default select example"
            onChange={handleSubmit}
          >
            <option value="">selectionner categorie</option>
            {option}
            <option value="tous" >Tous</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
