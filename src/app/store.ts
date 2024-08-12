import { configureStore } from '@reduxjs/toolkit';
import cocktailsReducer from '../features/cocktails/cocktails-slice';
import searchReducer from '../features/search/search-slice';
import userReducer from '../features/Auth/user-slice';

export const store = configureStore({
  reducer: {
    cocktails: cocktailsReducer,
    search: searchReducer,
    user: userReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
