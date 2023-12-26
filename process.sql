DROP DATABASE IF EXISTS transactions;

CREATE DATABASE transactions;

/c transactions

CREATE TABLE expenses(
    id SERIAL PRIMARY KEY,
    expenseAmount INTEGER,
    expenseName VARCHAR(255)
    expenseFrequency INTEGER
    expenseDateRecord datetime
)
