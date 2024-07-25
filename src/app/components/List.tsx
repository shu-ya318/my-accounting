'use client';
import { useState, useEffect } from 'react';
import { AccountingInfo } from  '../accounting/page'; 


interface ListProps {
  accountingData: AccountingInfo[];
  deleteAccountingRecord: (id: string) => Promise<void>;
  user: { uid: string; email: string | null };
}


const List: React.FC<ListProps>  = ({ accountingData, deleteAccountingRecord, user }) => {
  const [records, setRecords] = useState<AccountingInfo[]>([]);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    setRecords(accountingData);
    calculateBalance(accountingData);
  }, [accountingData]);

  const calculateBalance = (data: AccountingInfo[]) => {
    const totalBalance = data.reduce((acc, record) => {
      return record.accountingType === '收入' ? acc + record.amount : acc - record.amount;
    }, 0);
    setBalance(totalBalance);
  };

  const deleteRecord = async (id: string | undefined) => {
    if (id) {
      await deleteAccountingRecord(id);
    } else {
      console.error("Error: id is undefined");
    }
  };

  return (
    <div>
      {records.map(record => (
        <div key={record.id} className="flex justify-between items-center my-2 p-2 shadow">
          <span className={`${record.accountingType === '收入' ? 'text-green-500' : 'text-red-500'}`}>
            {record.accountingType === '收入' ? `+${record.amount}` : `-${record.amount}`}
          </span>
          <span>{record.description}</span>
          <button onClick={() => deleteRecord(record.id)} className="bg-gray-100 border border-gray-400 text-black px-2 py-1">
            刪除
          </button>
        </div>
      ))}
      <div className="text-center font-bold my-4 text-black">小計: {balance}元</div>
    </div>
  );
};

export default List;
