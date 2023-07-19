import styles from "../../../../assets/css/navbar.module.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineNewspaper } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      <nav className={`navbar bg-light fixed-top ${styles.nav} `}>
        <div className="container-fluid d-flex justify-content-center">
          <Link className="navbar-brand fs-2" to="/">
            API-BLOG
          </Link>

          <button
            className="navbar-toggler ms-auto d-lg-none d-md-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-controls="collapseExample"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="container d-flex justify-content-center">
          <div className="row d-none d-lg-block d-md-block">
            <div className="col-12 d-flex justify-content-center">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
                <li className="nav-item me-4">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    <AiOutlineHome /> Welcome
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link className="nav-link fs-5" to="articles">
                    <HiOutlineNewspaper /> Articles
                  </Link>
                </li>
                <li className="nav-item me-4">
                  <Link className="nav-link fs-5" to="createArticles">
                    <IoCreateOutline /> Create Articles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container-fluid d-flex justify-content-start">
          <div className="row d-lg-none d-md-none ">
            <div className="col-12 d-flex justify-content-center">
              <div className="collapse" id="collapseExample">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item me-4">
                    <Link
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/"
                    >
                      <AiOutlineHome /> Welcome
                    </Link>
                  </li>
                  <li className="nav-item me-4">
                    <Link className="nav-link fs-5" to="articles">
                      <HiOutlineNewspaper /> Articles
                    </Link>
                  </li>
                  <li className="nav-item me-4">
                    <Link className="nav-link fs-5" to="createArticles">
                      <IoCreateOutline /> Create Articles
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
