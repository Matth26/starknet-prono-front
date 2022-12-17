import { configureStore } from '@reduxjs/toolkit';
import pronoReducer from '../features/prono/pronoSlice';
import matchReducer from '../features/match/matchSlice';
import scoreReducer from '../features/scoreboard/scoreBoardSlice';
import pointReducer from '../features/point/pointSlice';

export const store = configureStore({
  reducer: {
    prono: pronoReducer,
    match: matchReducer,
    score: scoreReducer,
    point: pointReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
