import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Overview from "../Overview/Overview";
import Transaction from "../Transaction/Transaction";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const Home = () => {
  const [transactions, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);
  const [monthlyLimit, setMonthlyLimit] = useState(0);

  const calculateBalance = () => {
    let exp = 0, inc = 0;
    transactions.forEach((payload) =>
      payload.type === "EXPENSE"
        ? (exp += payload.amount)
        : (inc += payload.amount)
    );
    updateExpense(exp);
    updateIncome(inc);
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const addTransaction = (payload) => {
    updateTransaction([...transactions, payload]);
  };

  const deleteTransaction = (id) => {
    updateTransaction(transactions.filter((txn) => txn.id !== id));
  };

  return (
    <Container>
      <Overview
        expense={expense}
        income={income}
        addTransaction={addTransaction}
        monthlyLimit={monthlyLimit}
        setMonthlyLimit={setMonthlyLimit}
      />
      {transactions.length > 0 && (
        <Transaction
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
      )}
    </Container>
  );
};

export default Home;
