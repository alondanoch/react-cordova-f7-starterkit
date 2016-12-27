import React from 'react';
import ItemStore from '../stores/itemStore';
import Framework7 from '../helpers/Framework7Helper';
import ItemActions from '../actions/itemActions';
import { Link } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };
  }
  componentDidMount() {
    this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
    //ItemActions.loadItems();
    var myApp = Framework7.getApp();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onStatusChange(state) {
    this.setState(state);
  }
  render() {
    return (
      <div id="home" className="page">
        <div className="page-content">
          <div className="main-container">

            <div className="home-title">
              <div className="center">React-Cordova-F7 Starterkit</div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Home;

