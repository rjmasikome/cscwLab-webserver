let React = require('react');
let mui = require('material-ui');
let Router = require('react-router'); 
let $ = require('jquery');
//Backend
let DataStore = require('../stores/dataStore');
//React Components
let ProductAPI = require('../api/productAPI');

let {
  TextField, Paper, RaisedButton, Snackbar, DropDownMenu
} = mui;

let Login = React.createClass({

  getInitialState () {
    return { 
      letterDetails: {},
      loading: 'none',
      done: false,
      brickType: "two-dot"
    }
  },

  componentDidMount () {

    ProductAPI.getBrick();
     
    DataStore.addChangeListener(this._rerender);
  },

  componentWillUnmount () {
    DataStore.removeChangeListener(this._rerender);
  },

  _rerender() {
    this.setState({brickDetails: DataStore.getProduct()});
    if (this.state.brickDetails.message) this.refs.addSuccess.show();
  },

  render() {


      $(document).ready(function() {
        $("body").css("background-color", "#444F5C");
      });

      // console.log(this.state.brickDetails);
      var table = (<div></div>);
      // var response = this.state.letterDetails;
      var errorMessage = "Unspecified Error...";
      var successMessage ="Test";

    if (this.state.brickDetails){
    if (this.state.brickDetails.message) successMessage = this.state.brickDetails.message;
    var list = [];
    for (let i = 0, len=this.state.brickDetails.length; i<len; i++){
          list.push(<tr key={i+12345}>
                <td >
                  <b>{this.state.brickDetails[i].name}</b>
                </td>
                <td>
                  {this.state.brickDetails[i].amount}
                </td>
              </tr>);
      }

      table = (<table className='table'>
            <thead>
            <th style={{textAlign: 'center'}}>Type</th>
            <th style={{textAlign: 'center'}}>Amount</th>
            </thead>
            <tbody>
            {list}
            </tbody>
          </table>);
    }



      var image ="";

     let menuItems = [
   { payload: '1', text: 'two-dot' },
   { payload: '2', text: 'three-dot' },
];

    let textFieldStyle = {
      width: '25%',
    };

    return (
        <div className="landingWrapper">
          <Snackbar ref="errorAlert" message={errorMessage} style={{top: '16px', backgroundColor: 'darkred'}}autoHideDuration={5000}/>
          <Snackbar ref="addSuccess" message={successMessage} style={{top: '16px'}} autoHideDuration={5000}/>
          <div style={{textAlign: 'center'}}>
          <img src="./logo_light.png" alt="getcontext" width="120px" />
           <h3 style={{color: '#ECEFF1'}}>{"Maintainer's Page"}</h3>
          <Paper className="loginWrapper">
            <h3>Adding Inventory</h3>
            <form autoComplete="off" onSubmit={this._handleSubmit}>
              <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                <DropDownMenu ref="type" menuItems={menuItems} onChange={this._change} 
                className="dropdown" style={{verticalAlign: 'top', borderTop: '0'}} />
                <TextField style={textFieldStyle}  ref="amount" hintText="Amount" />
              </div>
              <div style={{textAlign: 'center', marginTop: '10px'}}>
              <RaisedButton label="Submit" type="submit" primary={true} />
              </div>
              <br />
            </form>
            </Paper>
            <Paper className="loginWrapper">
              <h3>Summary</h3>
              {table}
          </Paper>
          </div>

        </div>
      );
  },

   _change(e, selectedIndex, menuItem) {
    var urlCurrent = encodeURIComponent(window.location.href);
    if (selectedIndex == 0) {
      this.setState({brickType: "two-dot"});
    }
    if (selectedIndex == 1) {
      this.setState({brickType: "three-dot"});
    }
  },

  _handleSubmit(e) {
    e.preventDefault();
    var details = {
      "type" : this.state.brickType,
      "amount" : this.refs.amount.getValue()
    }

    ProductAPI.postBrick(details);

    // this.context.router.transitionTo('/advanced');
  }

});

Login.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Login;