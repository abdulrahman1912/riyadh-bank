const account_Number = document.querySelector('#account-number');
const banks = document.querySelector('#banks');
const amount = document.querySelector('#amount');
const transferBtn = document.getElementsByTagName('button')[0];
let account_name = "";
let recipient_code = ""


const apiKey = "sk_test_e5a88fadb2b54f85ff34aa86f3c763e5876edf30";
let recipentId = "";

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${apiKey}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://api.paystack.co/bank", requestOptions)
 .then(response => response.json())
 .then(result => {
    console.log(result);
    result.data.map(bank =>{
        let item = document.createElement("option");
        item.setAttribute("value", bank.code)
        item.innerText = bank.name;
        banks.appendChild(item);
        })              
  
    })
 .catch(error => console.log('error', error));

const createRecipient = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${apiKey}`);
    myHeaders.append("Content-Type", "application/json");

    let body = JSON.stringify({
        type: "nuban",
        name: `Our Recipent ${new Date()}`,
        account_number: account_Number.value,
        bank_code: banks.value
    })


    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow'
};

fetch("https://api.paystack.co/transferrecipient", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    recipient_code = result.data.recipient_code;
    account_name = result.data.details.account_name;
    alert("Money transferred to \nName: " + account_name)
})
  .catch(error => console.log('error', error));
}

const transfer = () => {
    createRecipient();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${apiKey}`);
    myHeaders.append("Content-Type", "application/json");

    var body = {
        source: "balance",
        reason: "transfer",
        amount: amount.value,
        recipient: recipient_code
    }

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
    redirect: 'follow'
    };

    fetch("https://api.paystack.co/transfer", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

transferBtn.addEventListener('click', () => {
    console.log(banks.value);
    createRecipient();

})
