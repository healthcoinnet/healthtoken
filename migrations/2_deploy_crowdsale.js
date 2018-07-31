var HealthTokenCrowdsale = artifacts.require('./HealthTokenCrowdsale.sol');
var HealthToken = artifacts.require('./HealthToken.sol');

module.exports = function(deployer, network, accounts) {
    console.log(accounts);

    const cap = new web3.BigNumber(30000000);
    const rate = new web3.BigNumber(500); // 0.002 eth
    const crowdsaleWallet = accounts[1];
    const tokensWallet = accounts[2];

    var crowdsale;

    return deployer
        .then(() => {
            return deployer.deploy(HealthToken, tokensWallet);
        })
        .then(() => {
            return deployer.deploy(
              HealthTokenCrowdsale,
                rate,
                crowdsaleWallet,
                HealthToken.address,
                tokensWallet
            );
        })
        .then(() => {
            HealthTokenCrowdsale.deployed().then(crowdsale => { 
                HealthToken.deployed().then(token => { 
                  token.approve(crowdsale.address, web3.toWei(15000000, 'ether'), { from: tokensWallet });
                });
             });
        })
};