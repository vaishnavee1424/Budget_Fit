import moment from 'moment';
import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import './IncomeList.css'; // Importing the external CSS file

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='income-list-card'>
      <div className='header flex items-center justify-between'>
        <h5 className='title text-lg'>Income Sources</h5>
        <button className='download-btn card-btn' onClick={onDownload}>
          <LuDownload className='download-icon text-base' /> Download
        </button>
      </div>
      <div className='transaction-grid grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format('Do MM YYYY')}
            amount={income.amount}
            type='income'
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
