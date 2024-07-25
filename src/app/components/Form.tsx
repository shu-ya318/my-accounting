'use client';
import { useState, FormEvent } from 'react';
import { AccountingInfo} from  '../accounting/page'; 


interface FormProps {
  addAccountingRecord: (record: AccountingInfo) => Promise<void>;
  user: { uid: string; email: string | null };
}

interface FormData {
  type: '收入' | '支出';
  amount: number;
  description: string;
}

const Form: React.FC<FormProps> = ({ addAccountingRecord, user }) => {
  const [formData, setFormData] = useState<FormData>({ type: '收入', amount: 0, description: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user.email) {
      return; 
    }
    await addAccountingRecord({
      userId: user.uid,
      email: user.email, 
      accountingType: formData.type,
      amount: formData.amount,
      description: formData.description,
      balance: 0 // 这里需要实现计算余额的逻辑
    });

    setFormData({ type: '收入', amount: 0, description: '' }); // 重置表单状态
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-8 max-w-screen-md mx-auto">
      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as '收入' | '支出' })}
        className="p-2 border mr-2 text-black"
      >
        <option value="收入">收入</option>
        <option value="支出">支出</option>
      </select>
      <input
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value, 10) || 0 })}
        className="p-2 border mr-2 text-black"
      />
      <input
        type="text"
        value={formData.description}
        placeholder="說明"
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="p-2 border mr-2 text-black"
      />
      <button type="submit" className="bg-gray-100 border border-gray-400 text-black p-1">
        新增紀錄
      </button>
    </form>
  );
};

export default Form;