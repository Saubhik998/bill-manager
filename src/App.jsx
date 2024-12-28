import React from 'react';
import BillDashboard from './components/BillDashBoard/BillDashBoard';
import AddEditBill from './components/AddEditBill/AddEditBill';
import BillFilter from './components/BillFilter/BillFilter';
import TimeSeriesChart from './components/TimeSeriesChart/TimeSeriesChart';
import BudgetOptimizer from './components/BudgetOptimizer/BudgetOptimizer';

const App = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bill Manager</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <BillFilter />
          <BudgetOptimizer />
        </div>
        <div className="col-md-8 mb-4">
          <BillDashboard />
          <TimeSeriesChart />
        </div>
      </div>
    </div>
  );
};

export default App;
