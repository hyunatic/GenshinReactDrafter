import user from './user.json'

const { Blockchain, Transaction, Block } = require('./GanyuCoin');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const ganyuCoin = new Blockchain();


//Start Exmaple Block Chain
const myKey = ec.keyFromPrivate('ceeedf546d732af1256b017c17bd6b93323a11b840f922f48c222659379b2b37');
const myWalletAddress = myKey.getPublic('hex');
const myKey1 = ec.keyFromPrivate('67e76c6fe32e7fa8e214bf48ed96c65c0e33a97906efa9ecce28670a32407467');
const myWalletAddress1 = myKey1.getPublic('hex');
ganyuCoin.minePendingTransactions(myWalletAddress)
ganyuCoin.minePendingTransactions(myWalletAddress1)

export const getChain = () => dispatch => {
    dispatch({ type: 'START_CHAIN', payload: ganyuCoin.chain })
}

export const validBlockChain = () => dispatch => {
    dispatch({ type: 'CHECK_CHAIN', payload: ganyuCoin.isChainValid() })
}

export const mineCoin = (username) => dispatch => {
    for(var i = 0; i < user.length; i++){
        if(username === user[i].username){
            const key = ec.keyFromPrivate(user[i].privatekey)
            const walletAddress = key.getPublic('hex')
            ganyuCoin.minePendingTransactions(walletAddress) 
        }
    }

    dispatch({ type: 'GET_NEW_CHAIN', payload: ganyuCoin.getLatestBlock() })
}

export const GetBalance = (username) => dispatch => {
    for(var i = 0; i < user.length; i++){
        if(username === user[i].username){
            const key = ec.keyFromPrivate(user[i].privatekey)
            const walletAddress = key.getPublic('hex')
            dispatch({ type: 'GET_BALANCE', payload: ganyuCoin.getBalanceOfAddress(walletAddress)  })  
        }
    }
}

export const transferTransaction = (formData) => dispatch => {
    let senderkey, senderwalletAddress, receiverkey, receiverwalletAddress = ''
    
    for(var i = 0; i < user.length; i++){
        if(formData.sender === user[i].username){
            senderkey = ec.keyFromPrivate(user[i].privatekey)
            senderwalletAddress = senderkey.getPublic('hex')
        }
        if(formData.receiver === user[i].username){
            receiverkey = ec.keyFromPublic(user[i].publickey, 'hex')
            receiverwalletAddress = receiverkey.getPublic('hex')
        }
    }
    const tx1 = new Transaction(senderwalletAddress, receiverwalletAddress, formData.amount)
    tx1.signTransaction(senderkey)
    ganyuCoin.addTransaction(tx1)
}

export const TamperBlock = (formData) => dispatch => {
    for(var i = 0; i < ganyuCoin.chain.length; i++){
        if(formData.hash === ganyuCoin.chain[i].hash){
            ganyuCoin.chain[i].transactions[0].amount = formData.amount
        }
    }
}