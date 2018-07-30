import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import lottery from './lottery';
import web3 from './web3';

class App extends Component {
  state = {
    manager: '',
    players:[],
    balance: 0,
    value: '',
    message: ''
  };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({
      manager,
      players,
      balance
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message: 'Please wait for processing your transaction'
    });

    const enterRs = await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    
    if(enterRs){
      this.setState({
        message: 'Your transaction is finished!'
      });
    }
  }

  onClick = async () => {
const accounts = await web3.eth.getAccounts();
this.setState({
  message: 'Waiting for a winner to be picked'
});
await lottery.methods.pickWinner().send({
  from: accounts[0]
});
  }

  render() {
    return ( 
    <div>
      <h2> Lottery contract </h2> 
      <p>this contract is managed by {this.state.manager}.</p> 
      <p>There are currently {this.state.players.length} people entered
      competing to win {this.state.balance} ether!
      </p>
      <hr/>
      <form onSubmit={this.onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={this.state.value}
          onChange={event => this.setState({
            value: event.target.value
          })}
          />
          </div>
          <button>Enter</button>
      </form>
      <hr />
      <p>Ready to pick a winner</p>
      <button onClick={this.onClick}>Pick a winner</button>
      <hr/>
      <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;