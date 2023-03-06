var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose')
var router = require('express').Router();
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');
var url = "mongodb://localhost:27017/";

const db_list = ["users", "identity", "transactions", "guards"];
const users = [
    {
      "txHash": "0xc6e0c13cdcdf42015530aecffe1637f8526e7d653fdac18a58f0118b9626c1ea",
      "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
      "userName": "test_1",
      "value": "0.001",
      "txType": "Deposit"
    },
    {
      "txHash": "0xfbacd671f135254ab8d93e0f2fbe05d4465b485d56d4094408d7df7abec5af82",
      "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
      "userName": "test_1",
      "value": "0.001",
      "txType": "Deposit"
    },
    {
      "txHash": "0xf30a0b16be9b2d39d0f2998ca7014f21125740459e7a86cca804871c06d76943",
      "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
      "userName": "test_1",
      "value": "0.001",
      "txType": "Withdraw"
    },
    {
      "txHash": "0x871460747ff36da6f287ac6680fbad00b411697d4a5470fcf9b28879f77582e4",
      "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
      "userName": "test_1",
      "value": "0.001",
      "txType": "Withdraw"
    },
    {
      "txHash": "0x5d9662c05a5514914b0a1e69edcb2a4c6f53df4593cc98b14c5b739ef69e7d4c",
      "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
      "userName": "test_1",
      "value": "0.001",
      "txType": "Deposit"
    },
    {
      "txHash": "0x2d67de7697f409e95309559e46a1d0727250afe60a8fa07e4ccc92578d71181a",
      "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
      "userName": "test_1",
      "value": "0.001",
      "txType": "Deposit"
    },
    {
      "txHash": "0x94d81485e185f15198610d9406d3e520b186875755ac907603eed8a7fc6d253d",
      "from": "0xcbb30b4ff53e45372476ba004a775db606f78eb2",
      "userName": "test_1",
      "value": "0.001",
      "txType": "Deposit"
    }
  ]

const transactions = [
    {
      "id": 0,
      "userAddress": "0xCBb30B4Ff53e45372476ba004a775db606F78EB2",
      "walletContractAddress": "",
      "identityNumber": "0000000000",
      "email": "test_1@gmail.com",
      "protectee": [],
      "guards": [
        "0xEB0A272172506c6d8f328317a3E7B2567F7a370f",
        "0x376B61ee2cD79ffeb56361bEb579F3393F59A9e5",
        "0xB0E3B66C977AEF974dF02396e0E405DeFc177E01c"
      ]
    },
    {
      "id": 1,
      "userAddress": "0xEB0A272172506c6d8f328317a3E7B2567F7a370f",
      "walletContractAddress": "",
      "identityNumber": "0000000001",
      "email": "test_2@gmail.com",
      "protectee": ["0xCBb30B4Ff53e45372476ba004a775db606F78EB2"],
      "guards": []
    },
    {
      "id": 2,
      "userAddress": "0x376B61ee2cD79ffeb56361bEb579F3393F59A9e5",
      "walletContractAddress": "",
      "identityNumber": "0000000002",
      "email": "test_3@gmail.com",
      "protectee": ["0xCBb30B4Ff53e45372476ba004a775db606F78EB2"],
      "guards": []
    },
    {
      "id": 3,
      "userAddress": "0xB0E3B66C977AEF974dF02396e0E405DeFc177E01c",
      "walletContractAddress": "",
      "identityNumber": "0000000003",
      "email": "test_4@gmail.com",
      "protectee": ["0xCBb30B4Ff53e45372476ba004a775db606F78EB2"],
      "guards": []
    }
  ];


  router.get('/initdb', function(req, res, next){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("social_recovery");
        for(let i =0; i< db_list.length; i++){
            dbo.createCollection(db_list[i], function(err, res) {
                if (err) throw err;
                console.log(`Collection ${db_list[i]} created!`); 
            });
        }
        db.close();
      });

      for (var i = 0; i <users.length; i++){
        let user = new User();
        user.userAddress = users[i].userAddress;
        user.walletContractAddress = users[i].walletContractAddress;
        user.identityNumber = users[i].identityNumber;
        user.email = users[i].email;
        user.save()
      }

      for (var i = 0; i <transactions.length; i++){
        let transaction = new Transaction;
        transaction.addresses = "";
        transaction.txHash = transactions[i].txHash;
        transaction.from = transactions[i].from;
        transaction.userName = transactions[i].userName;
        transaction.value = transactions[i].value;
        transaction.txType = transactions[i].txType;
        transaction.save()
      }
  });


  module.exports = router;