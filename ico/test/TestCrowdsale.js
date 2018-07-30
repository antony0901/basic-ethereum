const ICOCrowdsale = artifacts.require('ICOCrowdsale');
const ICOToken = artifacts.require('ICOToken');

contract('Mr ICO`s crowdsale', (accounts) => {
  let crowdsale;
  beforeEach(async () => {
    crowdsale = await ICOCrowdsale.deployed();
  });

  it('should deploy the token smart contract', async () => {
    const tokenAddress = await crowdsale.token.call();
    assert(tokenAddress, 'Token address couldn`t be deployed');
  });

  it('should set stage to PreICO',async () => {
    await crowdsale.setCrowdsaleStage(0);
    const stage = await crowdsale.stage.call();
    assert.equal(stage.toNumber(), 0, 'The stage could not be set to PreICO');
  });

  it('one ETH should buy 5 ICO tokens during PreICO', async () => {
    await crowdsale.sendTransaction({
      from: accounts[7],
      value: web3.toWei(1, 'ether')
    });

    const tokenAddress = await crowdsale.token.call();
    const icoToken = ICOToken.at(tokenAddress);
    const icoTokenAmount = await icoToken.balanceOf(accounts[7]);
    assert.equal(
      icoTokenAmount.toNumber(),
      5e18,
      'The sender could not receive the tokens as expected'
    );
  });

  it('Should transfer ETH to the owner wallet immediately during pre ICO', async () => {
    let balanceBefore = await web3.eth.getBalance(accounts[9]);
    balanceBefore = Number(balanceBefore.toString(10));

    await crowdsale.sendTransaction({
      from: accounts[1],
      value: web3.toWei(2, 'ether')
    });
    let balanceAfter = await web3.eth.getBalance(accounts[9]);
    balanceAfter = Number(balanceAfter.toString(10));
    assert.equal(
      balanceAfter,
      balanceBefore + 2e18,
      'ETH could not be transfer to owner wallet'
    );
  });

  it('should set variable totalWeiRaisedDuringPreICO', async () => {
    const amount = await crowdsale.totalWeiRaisedDuringPreICO.call();
    assert.equal(
      amount.toNumber(),
      web3.toWei(3, 'ether'),
      'Total ETH must be equal to 3 ETH'      
    );
  });
});