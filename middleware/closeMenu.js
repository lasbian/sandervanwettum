export default function ({ route, redirect, store }) {

  // function isEmpty(obj) {
  //     for(var key in obj) {
  //         if(obj.hasOwnProperty(key))
  //             return false;
  //     }
  //     return true;
  // }
  //
  // if(!isEmpty(route.query.lang)) {
  //     if (['nl', 'en', 'dk'].indexOf(route.query.lang) < 0) {
  //         redirect(route.path,{'lang':'en'})
  //     }
  // }
  if(store.state.screensizeformat === 'is-screen-s'){
    store.commit('SET_MENU', false);
  }
}
