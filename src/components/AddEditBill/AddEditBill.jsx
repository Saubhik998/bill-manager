import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBill, editBill } from '../../redux/billsSlice';

const AddEditBill = ({ existingBill, onClose }) => {
  const [bill, setBill] = useState(existingBill || {
    description: '',
    category: '',
    amount: '',
    date: '',
  });
  const dispatch = useDispatch();

  const categories = [
    "FoodNDining",
    "Utility",
    "Shopping",
    "Education",
    "Personal Care",
    "Travel",
  ];

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });

    if (name === "category") {
      const filteredSuggestions = categories.filter((category) =>
        category.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setBill({ ...bill, category: suggestion });
    setSuggestions([]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingBill) {
      dispatch(editBill(bill)); 
    } else {
      dispatch(addBill({ ...bill, id: Date.now() })); 
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="description"
          className="form-control"
          placeholder="Description"
          value={bill.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3 position-relative">
        <input
          type="text"
          name="category"
          className="form-control"
          placeholder="Category"
          value={bill.category}
          onChange={handleChange}
          required
        />
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="list-group-item"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: "pointer" }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-3">
        <input
          type="number"
          name="amount"
          className="form-control"
          placeholder="Amount"
          value={bill.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          name="date"
          className="form-control"
          value={bill.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {existingBill ? "Save Changes" : "Add Bill"}
        </button>
      </div>
    </form>
  );
};

export default AddEditBill;
