/**
 * Created by alon on 4/28/16.
 */

let framework7App = new Framework7();
let $$ = Dom7;

class Framework7Class {
  getApp(){
    return framework7App;
  }
  getDom(){
    return $$;
  }
}

let framework7Class= new Framework7Class();

export default framework7Class;