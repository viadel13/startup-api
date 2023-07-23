import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../navbar/Index";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from '../../../../assets/css/blog.module.css';

const Blog = () => {
 
  const[view, setView] = useState(false);
  const navigate = useNavigate();
  const storedSelectApi = localStorage.getItem('selectApi'); 
  useEffect(()=>{
   
    if(storedSelectApi){
      setView(true);
    }else{
      setView(false);
      navigate('/');
    }
  }, [storedSelectApi, navigate])
 
  if(view){
    return ( 
      <>
        <Navbar />
          <div className={`${styles.blog}`}>
        <Helmet>
          <title>Blog</title>
        </Helmet>
      
        <Outlet />
        
      </div>
      </>
    
    );
  }

};

export default Blog;
