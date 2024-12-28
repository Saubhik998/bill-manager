import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeSeriesChart = () => {
  const bills = useSelector((state) => state.bills);

  // State to toggle between Monthly and Daily views
  const [view, setView] = useState('monthly');

  // Function to aggregate data by month or day
  const aggregateData = () => {
    if (view === 'monthly') {
      // Group bills by month
      return bills.reduce((acc, bill) => {
        const month = new Date(bill.date).toLocaleString('default', { month: 'short' });
        const existing = acc.find((item) => item.label === month);
        if (existing) {
          existing.total += Number(bill.amount);
        } else {
          acc.push({ label: month, total: Number(bill.amount) });
        }
        return acc;
      }, []);
    } else {
      // Group bills by day
      return bills.reduce((acc, bill) => {
        const day = new Date(bill.date).toLocaleDateString('default');
        const existing = acc.find((item) => item.label === day);
        if (existing) {
          existing.total += Number(bill.amount);
          existing.descriptions.push(bill.description); // Add descriptions
        } else {
          acc.push({ label: day, total: Number(bill.amount), descriptions: [bill.description] });
        }
        return acc;
      }, []);
    }
  };

  const chartData = aggregateData();

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { total, descriptions } = payload[0].payload;
      return (
        <div className="line-chart-tooltip">
          <h5>{label}</h5>
          <p>Total: ₹{total}</p>
          {descriptions && descriptions.length > 0 && (
            <ul>
              {descriptions.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title">Billing Cycle Chart</h5>
        <button
          className="btn btn-success btn-sm"
          onClick={() => setView(view === 'monthly' ? 'daily' : 'monthly')}
        >
          Switch to {view === 'monthly' ? 'Daily' : 'Monthly'} View
        </button>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="label" tick={{ fill: '#333', fontSize: 14 }} />
            <YAxis tick={{ fill: '#333', fontSize: 14 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: 10 }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#007bff"
              strokeWidth={3}
              dot={{ stroke: '#007bff', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, fill: '#0056b3' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
