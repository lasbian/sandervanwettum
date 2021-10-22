import axios from 'axios'
import https from 'https'

export const state = () => ({
  locales: ['en', 'nl'],
  locale: 'nl',
  n: 1,
  menu: false,
  appinitated: false,
  news: false,
  newsopened: false,
  newscontent: '',
  aboutcontent: [],
  readmore: false,
  about: false,
  nighttime: false,
  screensize: 0,
  screensizeformat: '',
  projects: [],
  apiRoot: 'https://api.sandervanwettum.com/?rest_route=/',
  axiosAgent: https.Agent({rejectUnauthorized: false}),
  viewing: '',
  viewingproject:''
})


export const getters = {

  getappinitated(state) {
    return state.appinitated
  },

  getprojects(state) {
    return state.projects
  },

  nighttime(state) {
    return state.nighttime
  },

  getscreensize(state) {
    return state.screensize
  },

  scrsize(state) {
    return state.screensizeformat
  },

  getnews(state) {
    return state.news
  },

  getnewsopened(state) {
    return state.newsopened
  },

  getaboutcontent(state) {
    return state.aboutcontent
  },

  getnewscontent(state) {
    return state.newscontent
  },

  getmenu(state) {
    return state.menu
  },
  getreadmore(state) {
    return state.readmore
  },

  getabout(state) {
    return state.about
  },

  getviewing(state) {
    return state.viewing
  },

  getviewingproject(state) {
    return state.viewingproject
  }


}

export const mutations = {

  SET_APPINITIATED(state, toggle) {
    state.appinitated = toggle;
  },

  SET_NIGHTTIME(state, toggle) {
    state.nighttime = toggle;
  },

  SET_PROJECTS(state, content) {
    state.projects = content;
  },

  SET_VIEWING(state, name) {
    state.viewing = name;
  },

  SET_VIEWING_PROJECT(state, name) {
    state.viewingproject = name;
  },


  SET_READMORE(state, toggle) {
    state.readmore = toggle;
  },

  SET_ABOUT(state, toggle) {
    state.about = toggle;
    // ON OPEN CLOSE NEWS
    if(toggle===true){
      state.newsopened = false
    }


  },

  SET_NEWS(state, toggle) {
    state.news = toggle;
  },

  SET_NEWSOPENED(state, toggle) {
    state.newsopened = toggle;
  },

  SET_NEWSCONTENT(state, data) {
    state.newscontent = data;
  },

  SET_ABOUTCONTENT(state, data) {
    state.aboutcontent = data;
  },

  SET_MENU(state, toggle) {
    state.menu = toggle;
    // ON CLOSE ALSO CLOSE NEWS + ABOUT

    if(toggle===false){
      state.newsopened = false
      state.about = false
      if(process.browser){
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
          var clean_uri = uri.substring(0, uri.indexOf("?"));
          window.history.replaceState({}, document.title, clean_uri);
        }
      }
    }
  },


  SET_SCREENSIZE(state, screensize) {
    state.screensize = screensize;
  },

  SET_SCREENSIZEFORMAT(state, screensizeformat) {
    state.screensizeformat = screensizeformat;
  },


}

// LOAD INITIAL DATA

export const actions = {
  async nuxtServerInit({
    commit,
    state
  }, {
    req
  }) {

    // GET ABOUT CONTENT
    let [infoRes, cvRes, newsletterRes, footerRes] = await Promise.all([
      axios.get(state.apiRoot + 'wp/v2/pages&slug=' + 'info', state.axiosAgent),
      axios.get(state.apiRoot + 'wp/v2/pages&slug=' + 'cv', state.axiosAgent),
      axios.get(state.apiRoot + 'wp/v2/pages&slug=' + 'newsletter', state.axiosAgent),
      axios.get(state.apiRoot + 'wp/v2/pages&slug=' + 'footer', state.axiosAgent),
    ])

    commit('SET_ABOUTCONTENT', [infoRes.data[0], cvRes.data[0],newsletterRes.data[0],footerRes.data[0]])

    // GET ANY NEWS

    const newsRes = await axios.get(state.apiRoot + 'wp/v2/news', state.axiosAgent)
    var shownews = newsRes.data[0].acf.showhide
    if (shownews === true) {
      if (!state.appinitated) {
        commit('SET_NEWS', true)
      }
      commit('SET_NEWSCONTENT', newsRes.data[0])
    }

    // GET PROJECT LIST

    const projectsRes = await axios.get(state.apiRoot + 'wp/v2/projects', state.axiosAgent)
    commit('SET_PROJECTS', projectsRes.data)
  }
}
