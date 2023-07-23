import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "../components/welcome/Index";
import Blog from "../components/api-rest/blog/accueil/Index";
import Articles from "../components/api-rest/blog/articles/Index";
import CreateArticles from "../components/api-rest/blog/createArticle/Index";
import Article from "../components/api-rest/blog/article/Index";
import Editer from "../components/api-rest/blog/editer/Index";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/blog" element={<Blog />}>
            <Route index  element={<Articles />} />
            <Route index path="articles" element={<Articles />} />
            <Route path="createArticles" element={<CreateArticles />} />
        </Route>
        <Route path="/article" element={<Article />} />
        <Route path="/editer" element={<Editer />} />
      </Routes>
   
    </Router>
  );
};

export default Root;
