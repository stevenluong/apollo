import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useOktaAuth } from '@okta/okta-react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import logo from '../Common/logo.png';

import Profile from '../User/Profile';
import Sources from '../Sources';
import Topics from '../Topics';
import Analytics from '../Analytics'
import Dashboard from './Dashboard';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import LayersIcon from '@material-ui/icons/Layers';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

import moment from 'moment';

//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

//CONFIG
import apiConfig from './apiConfig';

function getUser(user,cb){
  var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"+user.sub
  //console.log(q)
  fetch(q)
      .then(result=>result.json())
      .then(u=>{
          if(u.length===0)
            createUser(user, cb);
            else{
              cb(Object.assign(user,u[0]));

            }
          //console.log(u);

      });
}


function createUser(user,cb){
  var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"
  //console.log(q)
  fetch(q,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
      .then(result=>result.json())
      .then(u=>{
          //console.log(u);
          cb(Object.assign(user,u));
      });
}

function processNews(news){
  var processedNews = [];
  var seen = {}
  //SEEN
  //processedNews = news.filter((item)=> {return seen.hasOwnProperty(item.title)?false:(seen[item.title]=true)})
  //HTTPS
  //processedNews = news.filter((item)=> {return item.tile.indexOf("https")?false:(seen[item.title]=true)})
  news.forEach(n=>{
    if(n.link.indexOf("https")==-1){
      n.link=n.link.replace("http:","https:");
      //console.log(n.link);
    }
    if(n.image_link && n.image_link.indexOf("https")==-1){
      n.image_link=n.image_link.replace("http:","https:");
      //console.log(n.image_link);
    }
    processedNews.push(n);
  })
  return processedNews;
}

function getSources(cb){
  var q = apiConfig.server+apiConfig.dbUrl+"/sources"
  //console.log(q)
  fetch(q)
      .then(result=>result.json())
      .then(sources=>{
          //var s = []
          //sources.forEach(source => {
          //  s.push({
          //    name:source.name,
          //    language:source.language
          //  })
          //})
          cb(sources);
          //console.log(s);
      });
}

function getNews(cb){
  //var news = rows;
  //news.push({})
  //var start = new Date(currentDate);
  var start = new Date();
  start.setDate(start.getDate()-1);
  //start.setDate(currentDate.getDate()-1);
  start.setHours(0,0,0,0);
  //TODO GOOD
  var s = start.toISOString();
  //console.log("s:"+s);
  var end = new Date();
  end.setHours(23,59,59,999);
  //TODO GOOD
  var e = end.toISOString();
  //console.log("e:"+e);
  //var q = "https://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e
  var q = apiConfig.server+apiConfig.dbUrl+"/news";
  //console.log(q)
  fetch(q)
      .then(result=>result.json())
      .then(titles=>{
          //console.log(titles);
          //this.setState({titles:titles});
          var news = []
          titles.forEach(t =>{
            //console.log(t.source);
            //if(["Challenges","JDG", "The Verge", "Korben", "LifeHacker"].indexOf(t.source)!==-1) //TODO - configure
              t.time = moment(t.datetime).format("HH:mm")
              news.push(t)
          })
          news = processNews(news);
          //news = titles;
          cb(news);
      });
  //return news;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://steven-luong.com/">
        Steven Luong
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 150,
  },
}));

export default function Main({url}) {
  const { authState, authService } = useOktaAuth();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userRequested, setUserRequested] = React.useState(false);
  //const [user, setUser] = React.useState({_key:0});
  //const [sources, setSources] = React.useState([]);
  //const [news, setNews] = React.useState([])
  //const [sourcesFiltered, setSourcesFiltered] = React.useState(false)
  //const [keywordsFiltered, setKeywordsFiltered] = React.useState(false)
  //const [keywordsFilteredNews, setKeywordsFilteredNews] = React.useState([])
  //const [sourcesFilteredNews, setSourcesFilteredNews] = React.useState([])
  //const [topics, setTopics] = React.useState([])
  //const [filters, setFilters] = React.useState({
    //TODO - Sources per user
  //  keywords:[],
  //  noKeywords:[]
  //})

  //REDUX
  const dispatch = useDispatch()
  const selectNews = state => state.news;
  const reduxNews = useSelector(selectNews);
  const selectSources = state => state.sources;
  const reduxSources = useSelector(selectSources);
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);
  //const [lastVisitSet, setLastVisitSet] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  /*
  const filterBySources = (news, sources) => {
    var sourcesFilteredNews = [];
    news.forEach(n =>{
      //console.log(t.source);
      if(sources.indexOf(n.source)!==-1)
        sourcesFilteredNews.push(n)
    })
    return sourcesFilteredNews;
  }
  */
  /*
  const filterByKeywords = (news, keywords, noKeywords) => {
    var keywordsFilteredNews = [];
    news.forEach(n =>{
      //console.log(t.source);
      //if (filters.sources.indexOf(n.source)===-1)
      //  return false
      if(keywords.length===0 && noKeywords.length===0){
        keywordsFilteredNews.push(n)
        return false
      }
      var split = n.title.split(" ");

      //if(split.indexOf("trump")===-1)
      //  return false
      //console.log(split);
      var intersectionNoKeywords = split.filter(x => {
        if(noKeywords.indexOf(x) != -1)
      		return true;
      	else
      		return false;
      })
      if(intersectionNoKeywords.length>0)
        return false;
      if(keywords.length===0){
        keywordsFilteredNews.push(n);
        return false;
      }
      if(split.indexOf(keywords[0])!==-1)
        keywordsFilteredNews.push(n);
    })
    return keywordsFilteredNews;
  }
  */
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //console.log(authState.isAuthenticated);
  if (authState.isPending) {
    return (
    <div className="App">
      <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>Loading ...</p>
    </header>
  </div>)
  }
  if(!authState.isAuthenticated)
    return(
      <Redirect to={{ pathname: '/login' }}/>
    )
    if(!userRequested){
      setUserRequested(true);
      authService.getUser().then((info) => {
        //setUserInfo(info);
        //console.log(info);
        getSources(sources=>{
          dispatch({type:'sources/sourcesRetrieved', payload:sources})
        });
        getNews(news =>{
          //setNews(news);
          dispatch({type:'news/newsRetrieved',payload:news})
        });
        getUser(info, (u)=>{
          //console.log(u)
          //INIT
          //if(!u.sources)
          //  u.sources = [];
          //if(!lastVisitSet){
          //  console.log("LAST VISIT")
          //  setLastVisitSet(true)
          //VISITS
          //console.log("VISITS");
          //var now = moment();
          //if(!u.visits)
          //  u.visits = [];
          //u = Object.assign(u, {visits:[...u.visits,now.toString()]})
          //console.log(u.visits);
          //var u2 = Object.assign(u, {visits:[..]})
          //updateUser(u);
          dispatch({type:'user/retrieved', payload:u})
          dispatch({type:'user/lastVisitUpdated', payload:moment().toString()})
          //setUser(u)

          //console.log("TOPICS")
          //var t = []
          //if(!u.topics)
          //  t = u.topics;
          //setTopics(t)
          //}



          //console.log("TOPICS")
          //console.log(u.topics)
        });
        //setUser(info)
      });
    }
  //console.log(filteredNews);
  //console.log(filters);
  //if(reduxNews.length!==0 && !sourcesFiltered){

    //setSourcesFilteredNews([])
    //setKeywordsFilteredNews([])
    //setSourcesFiltered(true);
    //var f = filterBySources(reduxNews, []);
    //setSourcesFilteredNews(f);
    //setKeywordsFilteredNews(f);
    //console.log("Sources filtered")
    //console.log(f.length);
    //console.log(f);
  //}

  //FILTER
  //console.log(sourcesFiltered);
  //console.log(sourcesFilteredNews.length);
  //if(!keywordsFiltered){
    //setKeywordsFilteredNews([])
    //setKeywordsFiltered(true);
    //var f = filterByKeywords(sourcesFilteredNews, filters.keywords, filters.noKeywords);
    //console.log(news);
    //console.log("filtered news");
    //setKeywordsFilteredNews(f);
    //console.log("Keywords filtered")
    //console.log(f.length);
  //}
  //console.log(url)
  var content = null;
  if(url==="profile")
    content = <Profile/>
  if(url==="sources")
    content = <Sources/>
  if(url==="topics")
    content = <Topics/>
  if(url==="analytics")
    content = <Analytics/>
  if(url==="dashboard")
    content = <Dashboard/>


  //console.log(reduxUser);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Apollo - News aggregator
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <div>
            <ListItem button component={RouterLink} to="/">
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={RouterLink} to="/topics">
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Topics" />
            </ListItem>
            <ListItem button component={RouterLink} to="/analytics">
              <ListItemIcon>
                <BubbleChartIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
        </div>
        </List>
        <Divider />
        <List>
        <div>
          <ListItem button component={RouterLink} to="/sources">
            <ListItemIcon>
              <TripOriginIcon />
            </ListItemIcon>
            <ListItemText primary="Sources" />
          </ListItem>
          <ListItem button component={RouterLink} to="/profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </div>
        </List>
        <Divider />
        <List>
        <div>
          <ListItem button onClick={() => {authService.logout()}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {content}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
