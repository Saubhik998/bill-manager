import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BudgetOptimizer = () => {
  const bills = useSelector((state) => state.bills);
  const [budget, setBudget] = useState('');
  const [optimizedBills, setOptimizedBills] = useState([]);

  const handleOptimize = () => {
    const sortedBills = [...bills].sort((a, b) => Number(a.amount) - Number(b.amount));
    let total = 0;
    const result = [];
    for (const bill of sortedBills) {
      if (total + Number(bill.amount) <= budget) {
        total += Number(bill.amount);
        result.push(bill);
      } else {
        break;
      }
    }
    setOptimizedBills(result);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Budget Optimizer</h5>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={handleOptimize}>
          Optimize
        </button>
        <ul className="list-group">
          {optimizedBills.map((bill) => (
            <li key={bill.id} className="list-group-item">
              {bill.description} - ₹{bill.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetOptimizer;
