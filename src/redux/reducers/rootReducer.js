import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
   articles : [],
   selectApi: '',
   load: true,
   article: [],
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,

    reducers:{
        
        SelectApiValue: (state, action)=>{
            state.selectApi = action.payload;
            state.load = true;
        },

        showArticles: (state, action)=>{
            state.articles = action.payload;
            state.load = false;
        },
        showArticle: (state, action)=>{
           state.article = action.payload;
           state.load = false;
        },
        showArticleCat: (state, action)=>{
            // console.log('mon action', action)
            state.articles = action.payload;
            state.load = false;
        },
        AddArticles: (state, action)=>{
            state.articles = [...state.articles, action.payload];
            state.load = false;
        },
        editArticle: (state, action)=>{
            const {_id, titre, content, categorie} = action.payload;
            const findRename =  state.articles.findIndex((i)=> i._id === _id);
            if(findRename !== -1){
             state.articles[findRename].titre = titre;
             state.articles[findRename].content = content;
             state.articles[findRename].categorie = categorie;
             state.load = false;
            }else{
                console.log('non trouve')
            }
        },

        dropArticle: (state, action)=>{
            const id = action.payload;
            const indexToDelete = state.articles.findIndex((item) => item._id === id);

            if (indexToDelete !== -1) {
              state.articles.splice(indexToDelete, 1);
              state.load = false
            }else{
            }

        }
    }
})

export const {showArticles, SelectApiValue, AddArticles, dropArticle, showArticle, editArticle, showArticleCat} = blogSlice.actions;


export const fecthAddArticle = (datas)=> async()=>{
    try {
    //  await axios.post('http://127.0.0.1:5000/articles', {datas});
      
    await axios.post('https://api-blog-v7sl.onrender.com/articles', {datas});
  
    } catch (error) {
        
    }
}


export const fetchArticles = ()=> async (dispatch)=>{
    try {
        // const response = await axios.get('http://127.0.0.1:5000/articles');
        const response = await axios.get('https://api-blog-v7sl.onrender.com/articles');
  
        dispatch(showArticles(response.data));

    } catch (error) {
        
    }
}


export const fetchArticle = (datas)=> async (dispatch)=>{
    try {
        const response = await axios.get(`https://api-blog-v7sl.onrender.com/articles/${datas}`);
        // const response  = await axios.get(`http://127.0.0.1:5000/articles/${datas}`);
        dispatch(showArticle(response.data));

    } catch (error) {
        
    }
}
export const fetchArticleCat = (datas)=> async (dispatch)=>{
    try {
        const response = await axios.get(`https://api-blog-v7sl.onrender.com/articlesCat/${datas}`);
        // const response  = await axios.get(`http://127.0.0.1:5000/articlesCat/${datas}`);
        dispatch(showArticleCat(response.data));

    } catch (error) {
        
    }
}


export const fetchEditArticle = (datas) => async (dispatch)=>{
    try {
        // await axios.patch(`http://127.0.0.1:5000/article/${datas.id}`, {datas});
        const response = await axios.patch(`https://api-blog-v7sl.onrender.com/article/${datas.id}`, {datas});
    } catch (error) {
        
    }
}

export const fecthDeleteArticle = (data)=> async()=>{
    try {
    //   await axios.delete(`http://127.0.0.1:5000/article/${data}`);
      await axios.delete(`https://api-blog-v7sl.onrender.com/article/${data}`);
    } catch (error) {
        
    }
}

export default blogSlice.reducer;