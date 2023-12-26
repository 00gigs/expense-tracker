document.addEventListener('DOMContentLoaded',function(){
var view_all = document.getElementById('viewAll')
let expenseFreqArr = {}
let mostExpensiveArray = {}

var expenseForm = document.getElementById("record")
expenseForm.addEventListener("submit",function(event){
    event.preventDefault()

var totalexpenses = document.getElementById("total-expense") 
var expenseName = document.querySelector('input[name="name-of-expense"').value
var expenseAmount = parseFloat(document.getElementById("debit").value)
    if(!expenseName || isNaN(expenseAmount)|| expenseAmount < 0){
        alert('please enter valid information')
        return
    }
//sum expenses      
var currentTotal = parseFloat(totalexpenses.textContent) || 0
var newTotal = currentTotal + expenseAmount
totalexpenses.textContent = newTotal.toFixed(2)

//count frequency of expense and store in array
expenseFreqArr[expenseName] = (expenseFreqArr[expenseName]|| 0) + 1
let mostFrequent_result = document.getElementById("MSF")
let maxCount = 1
let mostFrequentExpense = " "
//loop through expenses
for (const expense in expenseFreqArr) {
    if (expenseFreqArr.hasOwnProperty(expense)) {
        if (expenseFreqArr[expense] > maxCount) {
            maxCount = expenseFreqArr[expense]
            let likeword = expense.endsWith('s') ? 'those' : 'that'
            mostFrequentExpense = `You like ${likeword} ${expense} alot i see, you brought it ${maxCount} times `
        }
    }
}

mostFrequent_result.innerText = mostFrequentExpense

//most expensive 

if(expenseAmount > mostExpensiveArray.amount || !mostExpensiveArray.amount){
    mostExpensiveArray = {name:expenseName, amount:expenseAmount }
    let mostExpensive_result = document.getElementById("MSE")
    let wordChoice = expenseName.endsWith('s') ? 'those' : 'that'

    mostExpensive_result.innerText = `Your dollar weighed a lot on ${wordChoice} ${expenseName}, making it your biggest expense of $${expenseAmount} Dollars`
}

expenseForm.reset();
})//<----submission form 

async function getAll(){

}

view_all.onclick(getAll)

})