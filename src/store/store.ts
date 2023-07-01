import {AnyAction, combineReducers, configureStore, EnhancedStore, Reducer} from '@reduxjs/toolkit'
import {todoClient} from "../apiClients/todoClient.ts";


const combinedReducer = combineReducers({
    [todoClient.reducerPath]: todoClient.reducer
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === 'store/reset') {
        return {} as RootState
    }
    return combinedReducer(state, action)
}

export const store: EnhancedStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoClient.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch