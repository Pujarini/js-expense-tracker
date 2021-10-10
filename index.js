const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-add');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


function generateid() {
    return Math.floor(Math.random() * 100000);
}

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;
    list.appendChild(item);
}

function removeTransaction(id){
    transactions= transactions.filter(transaction=> transaction.id !== id);
    updateValue();
    init();
}

function init()
{
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValue();
}


function updateValue(){
    const amount= transactions.map(item=>item.amount); //only amt
    const total= amount.reduce((acc,item)=>(acc+=item),0).toFixed(2); // for total 
    const income= amount.filter(item=> item > 0).reduce((acc,item)=> item+=acc,0).toFixed(2); //for income
    const expense= (amount.filter(item => item < 0).reduce((acc,item)=> (item+=acc),0)*-1).toFixed(2); // fo exepnse
    balance.innerText=`${total}`;
    money_plus.innerText=`${income}`;
    money_minus.innerText=`${expense}`;
}

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("text or amount is missing");
    } else {
        const transaction = {
            id: generateid(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValue();
        updateLocalStorage();
        text.value="";
        amount.value=""
    }
    }

    init();
form.addEventListener('submit', addTransaction);