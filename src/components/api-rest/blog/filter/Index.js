import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.articles.articles);
    const option = articles.map((i)=>  <option key={i._id} value={i.categorie} > {i.categorie} </option>)
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-6">
        <p className="small mb-0 me-2 fs-5 text-muted">Filter</p>
          <select className="form-select" aria-label="Default select example">
            <option  value="">selectionner categorie</option>
            {option}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
