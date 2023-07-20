import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
   articles : [],
   selectApi: '',
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,

    reducers:{
        
        SelectApiValue: (state, action)=>{
            state.selectApi = action.payload;
        },

        showArticles: (state, action)=>{
            state.articles =action.payload;
        },

        AddArticles: (state, action)=>{
            console.log('mon action',action.payload);
            state.articles = [...state.articles, action.payload];
        },

        dropArticle: (state, action)=>{
            const id = action.payload;
            const indexToDelete = state.articles.findIndex((item) => item._id === id);

            if (indexToDelete !== -1) {
                console.log('id trouve');
              state.articles.splice(indexToDelete, 1);
            }else{
                console.log('id non trouve');
            }

        }
    }
})

export const {showArticles, SelectApiValue, AddArticles, dropArticle} = blogSlice.actions;

export const fetchArticles = ()=> async (dispatch)=>{
    try {
        // const response = await axios.get('http://127.0.0.1:5000/articles');
        await axios.get('https://api-blog-v7sl.onrender.com/articles');
  
        dispatch(showArticles(response.data));

    } catch (error) {
        
    }
}

export const fecthAddArticle = (datas)=> async()=>{
    try {
    //  await axios.post('http://127.0.0.1:5000/articles', {datas});

    await axios.post('https://api-blog-v7sl.onrender.com/articles', {datas});
  
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