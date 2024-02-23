import HttpClient from './http.js';

const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const sendButton = document.querySelector('#sendTx');
const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const transactionsList = document.querySelector('#transactions');

let acccounts;

async function checkBalance() {
  if (typeof ethereum !== undefined) {
    try {
      acccounts = await ethereum.request({ method: 'eth_requestAccounts' });

      const balance = await ethereum.request({
        method: 'eth_getBalance',
        params: [accountInput.value, 'latest'],
      });

      const parsedBalance = parseInt(balance) / Math.pow(10, 18);

      displayBalance.innerText = parsedBalance;

      // hämta transaktionerna för specifik adress
      const httpClient = new HttpClient();
      const transactions = await httpClient.getTransactions(accountInput.value);
      console.log(transactions);

      displayTransactions(transactions);
    } catch (error) {
      console.error(error);
    }
  }
}

function displayTransactions(transactions) {
  transactionsList.innerHTML = ''; // Rensa föregående transaktioner

  // Hämta blockNumret för varje transaktion.
  transactions.forEach((transaction) => {
    const valueInEther = parseFloat(transaction.value) / Math.pow(10, 18);

    const blocknumberDiv = document.createElement('div');

    blocknumberDiv.textContent = `Transaction blocknumber: ${transaction.blockNumber} ||
    Amount of Ether: ${valueInEther} `;

    transactionsList.appendChild(blocknumberDiv);
  });
}

async function sendFunds() {
  try {
    const amount = parseFloat(valueInput.value) * Math.pow(10, 18);
    const gasPrice = await ethereum.request({
      method: 'eth_gasPrice',
    });
    let params = [
      {
        from: accountInput.value,

        to: toAccountInput.value,

        value: Number(amount).toString(16),

        gasPrice: gasPrice,
      },
    ];

    const response = await ethereum.request({
      method: 'eth_sendTransaction',

      params: params,
    });
  } catch (error) {
    console.log(error);
  }
}

checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendFunds);
