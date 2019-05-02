import { createStore, applyMiddleware,compose } from "redux";
import rootReducer from '../reducers/rootReducer';

export const configureStore =(preloadState)=> {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    
    const storeEhancers = [middlewareEnhancer]
    
    const composedEnhancer = compose(...storeEhancers);

    const store = createStore(
        rootReducer,
         preloadState, 
         composedEnhancer
    );
        
    return store;
}