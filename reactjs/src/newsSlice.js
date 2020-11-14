const initialState = []

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case 'news/newsRetrieved': {
      return [...action.payload]
    }
    default:
      return state
  }
}
