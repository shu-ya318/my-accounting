'use client';
import { useState } from 'react';
//操作 資料庫

interface FormData {
  type: '收入' | '支出';
  amount: number;
  description: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ type: '收入', amount: 0, description: '' });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    

  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-8 max-w-screen-md mx-auto">
      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as '收入' | '支出' })}
        className="p-2 border mr-2   text-black "        //字體樣式設在select元素
      >
        <option value="收入" >收入</option>
        <option value="支出" >支出</option>
      </select>
      <input
        type="text"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value, 10) })}
        className="p-2 border mr-2  text-black "
      />
      <input
        type="text"
        value={formData.description}
        placeholder="說明"
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="p-2 border mr-2  text-black "
      />
      <button type="submit" className="bg-gray-100  border border-gray-400 text-black p-1 ">
        新增紀錄
      </button>
    </form>
  );
};

export default Form;
