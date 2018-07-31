var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, n, a) {
  console.log(a);
  deployer.deploy(Migrations);
};
