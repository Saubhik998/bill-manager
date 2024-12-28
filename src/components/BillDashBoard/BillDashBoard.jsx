import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBill } from '../../redux/billsSlice';
import AddEditBill from '../AddEditBill/AddEditBill';

const BillDashboard = () => {
  const bills = useSelector((state) => state.bills);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const [editingBill, setEditingBill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Filter bills by category
  const filteredBills = bills.filter((bill) =>
    filters.category ? bill.category === filters.category : true
  );

  // Calculate the total monthly billed amount
  const totalAmount = filteredBills.reduce((sum, bill) => sum + Number(bill.amount), 0);

  const handleEdit = (bill) => {
    setEditingBill(bill);
  };

  const closeModal = () => {
    setEditingBill(null);
    setIsAdding(false);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title">Bill Dashboard</h3>
        <button className="btn btn-success" onClick={() => setIsAdding(true)}>Add Bill</button>
      </div>
      <div className="card-body">
        <p>Total Monthly Billed Amount: <strong>₹{totalAmount}</strong></p>
        <ul className="list-group">
          {filteredBills.map((bill) => (
            <li key={bill.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{bill.description}</h5>
                <small>Category: {bill.category}</small>
                <br />
                <small>Amount: ₹{bill.amount}</small>
              </div>
              <div>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(bill)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => dispatch(removeBill(bill.id))}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || editingBill) && (
        <div className="modal show d-block" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isAdding ? 'Add Bill' : 'Edit Bill'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <AddEditBill
                  existingBill={editingBill}
                  onClose={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDashboard;
