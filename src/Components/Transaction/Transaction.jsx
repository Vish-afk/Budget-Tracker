import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;

const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
`;

const TransactionCell = ({ payload, onDelete }) => (
  <Cell isExpense={payload?.type === "EXPENSE"}>
    <div>
      <div>{payload.desc}</div>
      <div style={{ fontSize: "12px", color: "#888" }}>{payload.date}</div>
    </div>
    <div>
      ₹{payload.amount}
      <DeleteButton onClick={() => onDelete(payload.id)}>Delete</DeleteButton>
    </div>
  </Cell>
);

const Transaction = ({ transactions, deleteTransaction }) => {
  const [searchText, updateSearchText] = useState("");
  const [filteredTransaction, updateTxn] = useState(transactions);

  const filterData = (text) => {
    if (!text.trim()) {
      updateTxn(transactions);
      return;
    }
    const filtered = transactions.filter((t) =>
      t.desc.toLowerCase().includes(text.toLowerCase().trim())
    );
    updateTxn(filtered);
  };

  useEffect(() => {
    filterData(searchText);
  }, [transactions]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search"
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransaction.map((payload) => (
        <TransactionCell
          key={payload.id}
          payload={payload}
          onDelete={deleteTransaction}
        />
      ))}
    </Container>
  );
};

export default Transaction;
