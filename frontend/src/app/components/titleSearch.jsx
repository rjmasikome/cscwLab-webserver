let React = require('react');
let mui = require('material-ui');
let Router = require('react-router');  
let _ = require('lodash'); 
let { DefaultRoute, Link, Route, RouteHandler } = Router;
let ProductAPI = require('../api/productAPI');
let DataStore = require('../stores/dataStore');

let {
  TextField, RaisedButton, SelectField, DropDownIcon, Avatar
} = mui;

let TitleSearch = React.createClass({

  getInitialState () {
    return { 
      loginStatus : this.props.loginStatus
    }
  },

  componentDidMount () {
    DataStore.addChangeListener(this._rerender);
  },

  componentWillUnmount () {
    DataStore.removeChangeListener(this._rerender);
  },

  _rerender() {
    this.setState({loginStatus: DataStore.getLogin()});
  },

  render() {
    // console.log(this.state.loginStatus);

     var menuList = [      
      { route: 'logout', text: 'Logout'},
      ];

    var loggedinNav = (<div></div>);

    // var profile = (<DropDownIcon openDirection='bottom-left' onChange={this._onUserClick} className='logoutButton' menuItems={menuList} ><Avatar>io</Avatar></DropDownIcon>
    //        );

    // if (window.location.hash.indexOf('activate') > -1 ) profile = (<div></div>);

    // // if(this.state.loginStatus) loggedinNav = (
    // if (window.location.hash.indexOf('user') == -1 ) loggedinNav = (
    //       <div className="grid headerGrid" >
    //         <div className="col hidden-xs" style={{width: '15%'}}>
    //           <a href="https://fedger.io/#/"><img src="./logo_light.png" alt="getcontext" width="120px" /></a>
    //         </div>
    //         <div className="col visible-xs" style={{width: '7%'}}>
    //           <a href="https://fedger.io/#/"><img src="./logo_small.png" alt="getcontext" /></a>
    //         </div>
    //         <div className="col" style={{padding: '0px'}}>
    //         {profile}
    //            </div>
    //       </div>);

    var advLabel = 'Advanced';
    if (window.location.hash.indexOf('advanced') > -1) advLabel = 'Reset';

    return (
        <div className='headerBar'>
          {loggedinNav}
        </div>
      );
  },

  _onUserClick(e, selectedIndex, menuItem){
    if (selectedIndex == 0) {
    DataStore.logout();
    this.setState({loginStatus: false});
    this.context.router.transitionTo('/login');
    }
  }

});

TitleSearch.contextTypes = {
  router: React.PropTypes.func
};

module.exports = TitleSearch;