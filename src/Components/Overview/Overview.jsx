import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
  width: 100%;
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;

const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;

const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;

const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  font-weight: bold;
`;

const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: ${(props) => (props.isAddTxnVisible ? "flex" : "none")};
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("EXPENSE");
  const [date, setDate] = useState("");

  return (
    <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
      <form>
        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <RadioBox>
          <input
            type="radio"
            id="expense"
            name="type"
            value="EXPENSE"
            checked={type === "EXPENSE"}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            id="income"
            name="type"
            value="INCOME"
            checked={type === "INCOME"}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="income">Income</label>
        </RadioBox>
      </form>
      <AddTransaction
        onClick={() =>
          props.addTransaction({
            id: Date.now(),
            amount: Number(amount),
            desc,
            type,
            date,
          })
        }
      >
        Add Transaction
      </AddTransaction>
    </AddTransactionContainer>
  );
};

const Overview = (props) => {
  const [isAddTxnVisible, toggleAddTXn] = useState(false);

  return (
    <Container>
      <BalanceBox>
        Balance: ₹{props.income - props.expense}
        <AddTransaction onClick={() => toggleAddTXn((prev) => !prev)}>
          {isAddTxnVisible ? "CANCEL" : "ADD"}
        </AddTransaction>
      </BalanceBox>

      <ExpenseContainer>
        <ExpenseBox>
          Expense<span> ₹{props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Income<span> ₹{props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>

      <div style={{ width: "100%", margin: "10px 0", textAlign: "center" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Monthly Limit
        </label>
        <input
          type="number"
          placeholder="Enter monthly limit"
          value={props.monthlyLimit}
          onChange={(e) => props.setMonthlyLimit(Number(e.target.value))}
          style={{
            padding: "10px",
            width: "90%",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        {props.monthlyLimit > 0 && (
          <div
            style={{
              marginTop: "5px",
              color: props.expense > props.monthlyLimit ? "red" : "green",
              fontWeight: "500",
            }}
          >
            {props.expense > props.monthlyLimit
              ? "⚠ Limit exceeded!"
              : "✅ Within monthly limit"}
          </div>
        )}
      </div>

      {isAddTxnVisible && (
        <AddTransactionView
          isAddTxnVisible={isAddTxnVisible}
          addTransaction={(payload) => {
            props.addTransaction(payload);
            toggleAddTXn(false);
          }}
        />
      )}
    </Container>
  );
};

export default Overview;
