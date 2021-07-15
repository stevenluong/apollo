const initialState = []

export default function sourcesReducer(state = initialState, action) {
  switch (action.type) {
    case 'sources/sourcesRetrieved': {
      return [...action.payload]
    }
    default:
      return state
  }
}
