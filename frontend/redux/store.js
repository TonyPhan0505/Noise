import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';

import userReducer from './slices/user.slice';
import activityReducer from './slices/activity.slice';
import commentReducer from './slices/comment.slice';
import dreamReducer from './slices/dream.slice';
import interestReducer from './slices/interest.slice';
import interestCategoryReducer from './slices/InterestCategory.slice';
import momentReducer from './slices/moment.slice';
import notificationReducer from './slices/notification.slice';
import postReducer from './slices/post.slice';
import storyReducer from './slices/story.slice';
import trophyReducer from './slices/trophy.slice';
import viewReducer from './slices/view.slice';
import verificationReducer from "./slices/verification.slice";

import rootSaga from "./sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    user: userReducer,
    activity: activityReducer,
    comment: commentReducer,
    dream: dreamReducer,
    interest: interestReducer,
    interestCategory: interestCategoryReducer,
    moment: momentReducer,
    notification: notificationReducer,
    post: postReducer,
    story: storyReducer,
    trophy: trophyReducer,
    view: viewReducer,
    verification: verificationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };