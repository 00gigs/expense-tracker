const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

document.addEventListener('DOMContentLoaded', function () {
    var view_all = document.getElementById('viewAll');
    let expenseFreqArr = {};
    let mostExpensiveArray = {};

    var expenseForm = document.getElementById("record");
    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var totalexpenses = document.getElementById("total-expense");
        var expenseName = document.querySelector('input[name="name-of-expense"]').value;
        var expenseAmount = parseFloat(document.getElementById("debit").value);

        if (!expenseName || isNaN(expenseAmount) || expenseAmount < 0) {
            alert('please enter valid information');
            return;
        }

        // Sum expenses
        var currentTotal = parseFloat(totalexpenses.textContent) || 0;
        var newTotal = currentTotal + expenseAmount;
        totalexpenses.textContent = newTotal.toFixed(2);

        // Count frequency of expense and store in array
        expenseFreqArr[expenseName] = (expenseFreqArr[expenseName] || 0) + 1;
        let mostFrequent_result = document.getElementById("MSF");
        let maxCount = 1;
        let mostFrequentExpense = " ";

        // Loop through expenses
        for (const expense in expenseFreqArr) {
            if (expenseFreqArr.hasOwnProperty(expense)) {
                if (expenseFreqArr[expense] > maxCount) {
                    maxCount = expenseFreqArr[expense];
                    let likeword = expense.endsWith('s') ? 'those' : 'that';
                    mostFrequentExpense = `You like ${likeword} ${expense} a lot, you brought it ${maxCount} times `;
                }
            }
        }

        mostFrequent_result.innerText = mostFrequentExpense;

        // Most expensive
        if (expenseAmount > mostExpensiveArray.amount || !mostExpensiveArray.amount) {
            mostExpensiveArray = { name: expenseName, amount: expenseAmount };
            let mostExpensive_result = document.getElementById("MSE");
            let wordChoice = expenseName.endsWith('s') ? 'those' : 'that';

            mostExpensive_result.innerText = `Your dollar weighed a lot on ${wordChoice} ${expenseName}, making it your biggest expense of $${expenseAmount} Dollars`;

            // Save to PostgreSQL
            pool.query('INSERT INTO expenses(name, amount) VALUES($1, $2)', [expenseName, expenseAmount], (error, results) => {
                if (error) {
                    console.error('Error:', error);
                } else {
                    console.log('Row inserted:', results.rowCount);
                }
            });
        }

        expenseForm.reset();
    });

    async function getAll() {
        // You can implement the retrieval of all expenses from PostgreSQL here
        // and update the UI accordingly.
        // For simplicity, I'll just log a message for now.
        console.log('Fetching all expenses from the database...');
    }

    view_all.addEventListener('click', getAll);
});