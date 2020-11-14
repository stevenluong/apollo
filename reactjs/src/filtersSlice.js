const initialState = {
  keywords:[],
  noKeywords:[]
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/filtersReset': {
      return {
        ...state,
        keywords:[],
        noKeywords:[]
      }
    }
    case 'filters/noKeywordToggled': {
      var i = state.noKeywords.indexOf(action.payload);
      return {
        ...state,
        noKeywords:i===-1?[...state.noKeywords,action.payload]:[...state.noKeywords].filter(k=>k!==action.payload)
      }
    }
    case 'filters/keywordToggled': {
      var i = state.keywords.indexOf(action.payload);
      //console.log("IN")
      //console.log(i);
      //console.log(action.payload)
      //console.log([...state.keywords])
      //console.log([...state.keywords].push(action.payload))
      return {
        ...state,
        //keywords:action.payload
        keywords:i===-1?[...state.keywords].concat(action.payload):[...state.keywords].filter(k=>k!==action.payload)
      }
    }
    default:
      return state
  }
}
