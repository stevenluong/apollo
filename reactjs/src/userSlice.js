import helpers from './User/helpers'

const initialState = {
  sources:[],
  topics:[],
  interests:[],
  visits:[],
  public:false,
  readNews:[]
}



export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/retrieved': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'user/public': {
      return {
        ...state,
        sources:["SBS","ABC"],
        //latestNews:{},
        public:true
      }
    }
    case 'user/titleClicked': {
      console.log(state);
      var news = action.payload;
      var title = news.title;
      var split = title.split(" ");
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1)
      console.log(yesterday)
      var u = {
        ...state,
        interests:state.interests.map(i=>{
          if(split.indexOf(i.word)!==-1)
            return {
              word:i.word,
              count:i.count+1
            }
          else
            return i;
        })
        //.filter(i=>i.word.length>4)
        .concat(split.filter(w=>{
          return state.interests.map(i=> i?i.word:"").indexOf(w)===-1 && w.length>4
        }).map(i=>{
          return{
            word:i,
            count:1
          }
        })
      ),
      readNews:[...state.readNews.filter(n=>new Date(n.datetime)>yesterday),action.payload]
      };
      if(!u.public)
        helpers.updateUser(u);
      return u;
    }
    /*
    case 'user/latestNewsUpdated': {
      var u = {
        ...state,
        latestNews:action.payload
      };
      if(!u.public)
        helpers.updateUser(u);
      return u
    }
    */
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
      if(!u.public)
        helpers.updateUser(u);
      return u
    }
    case 'user/lastVisitUpdated': {
      var u = {
        ...state,
        visits:[...state.visits,action.payload]
      };
      //if(!u.public)
        //helpers.updateUser(u);
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
      if(!u.public)
        helpers.updateUser(u);
      return u
    }
    default:
      return state
  }
}
