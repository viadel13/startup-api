import {configureStore} from '@reduxjs/toolkit';
import blogReducer from '../reducers/rootReducer';


const store = configureStore({
    reducer:{
        articles: blogReducer
    }
    
});
  
export default store;