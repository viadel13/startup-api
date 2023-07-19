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
            state.articles = [...state.articles, action.payload];
        },
    }
})

export const {showArticles, SelectApiValue} = blogSlice.actions;

export const fetchArticles = ()=> async (dispatch)=>{
    try {
        const response = await axios.get('https://api-blog-v7sl.onrender.com/articles');
        dispatch(showArticles(response.data));

    } catch (error) {
        
    }
}

export const fecthAddArticle = (datas)=> async(dispatch)=>{
    try {
        const response = await axios.post('https://api-blog-v7sl.onrender.com/articles', {datas});
        console.log('reponse', response);
    } catch (error) {
        
    }
}

export default blogSlice.reducer;