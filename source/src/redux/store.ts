import { configureStore } from "@reduxjs/toolkit";
import navigator from "./navigatorReducer";

const store = configureStore({
  reducer: {
    navigator: navigator,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
