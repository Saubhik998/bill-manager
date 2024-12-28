import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../../redux/filtersSlice';

const BillFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.filters.category);

  const handleFilterChange = (e) => {
    dispatch(setCategoryFilter(e.target.value)); 
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Filter by Category</h5>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="FoodNDining">FoodNDining</option>
          <option value="Utility">Utility</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Travel">Travel</option>
        </select>
      </div>
    </div>
  );
};

export default BillFilter;
