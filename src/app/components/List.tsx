"use client";
import React, { useState } from 'react';
//操作 資料庫

interface Record {
  id: number;
  type: '收入' | '支出';
  amount: number;
  description: string;
}

const List: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addRecord = (newRecord: Record) => {
    setRecords([...records, newRecord]);
    const newTotal = total + (newRecord.type === '收入' ? newRecord.amount : -newRecord.amount);
    setTotal(newTotal);
  };

  const removeRecord = (id: number) => {
    setRecords(records.filter(record => record.id !== id));
    // TODO: Update total when removing a record
  };

  return (
    <div>
      {records.map(record => (
        <div key={record.id} className="flex justify-between items-center">
          <span className={`${record.type === '收入' ? 'text-green-500' : 'text-red-500'}`}>
            {record.type === '收入' ? `+${record.amount}` : `-${record.amount}`}
          </span>
          <span>{record.description}</span>
          <button onClick={() => removeRecord(record.id)} className="bg-gray-100  border border-gray-400 text-black px-2 py-1">
            刪除
          </button>
        </div>
      ))}
      <div className="text-center font-bold my-4 text-black">小計: {total}</div>
    </div>
  );
};

export default List;
