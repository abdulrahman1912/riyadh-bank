//import { userDetails } from './login';
//import { name, email, password, phone, account_number } from './signup'

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const nameHolder = document.querySelector('#customer-name');
const accHolder = document.querySelector('#customer-num');
const accBalance = document.querySelector('#account-balance');
const greeting = document.querySelector('#greeting')

nameHolder.innerHTML = user.name;
accHolder.innerHTML = user.account_number;
accBalance.innerHTML = '<span>&#8358;</span> '+ user.account_balance;
greeting.innerHTML = "Hi " + user.name.split(' ')[0];
