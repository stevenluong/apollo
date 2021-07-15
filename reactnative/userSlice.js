import helpers from './Common/helpers'

const initialState = {
  sources:[],
  topics:[],
  interests:[],
  visits:[]
}



export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/retrieved': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'user/titleClicked': {
      console.log(state);
      var u = {
        ...state,
        interests:state.interests.map(i=>{
          if(action.payload.split(" ").indexOf(i.word)!==-1)
            return {
              word:i.word,
              count:i.count+1
            }
          else
            return i;
        }).concat(action.payload.split(" ").filter(w=>{
          return state.interests.map(i=> i.word).indexOf(w)===-1
        }).map(i=>{
          return{
            word:i,
            count:1
          }
        })
        )
      };
      helpers.updateUser(u);
      return u;
    }
    case 'user/latestNewsUpdated': {
      var u = {
        ...state,
        latestNews:action.payload
      };
      helpers.updateUser(u);
      return u
    }
    case 'user/topicAdded': {
      var u = {
        ...state,
        topics:[...state.topics,action.payload]
      };
      helpers.updateUser(u);
      return u
    }
    case 'user/topicRemoved': {
      var u = {
        ...state,
        topics:[...state.topics].filter(t=>t!==action.payload)
      };
      helpers.updateUser(u);
      return u
    }
    case 'user/lastVisitUpdated': {
      var u = {
        ...state,
        visits:[...state.visits,action.payload]
      };
      helpers.updateUser(u);
      return u
    }
    case 'user/sourceToggled': {
      var i = state.sources.indexOf(action.payload);
      //console.log("IN")
      //console.log(i);
      //console.log(action.payload)
      //console.log([...state.keywords])
      //console.log([...state.keywords].push(action.payload))
      var u = {
        ...state,
        //keywords:action.payload
        sources:i===-1?[...state.sources].concat(action.payload):[...state.sources].filter(k=>k!==action.payload)
      }
      helpers.updateUser(u);
      return u
    }
    default:
      return state
  }
}
