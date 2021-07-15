import { combineReducers } from 'redux'

import newsReducer from '../newsSlice'
import filtersReducer from '../filtersSlice'
import userReducer from '../userSlice'
import sourcesReducer from '../sourcesSlice'

const rootReducer = combineReducers({
  // always return a new object for the root state
    // the value of `state.todos` is whatever the todos reducer returns
    news: newsReducer,
    // For both reducers, we only pass in their slice of the state
    filters: filtersReducer,
    user: userReducer,
    sources: sourcesReducer
  })
export default rootReducer
