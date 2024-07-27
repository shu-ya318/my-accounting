'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Form from '../components/Form';
import List from '../components/List';
import HomePage  from './page'; 
//firebase
import { useAuth } from '../store/AuthContext';   
import {db} from '../lib/firebaseConfig';
import { collection, doc, addDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';


export interface AccountingInfo{
  id?: string;           //僅刪除會用到 該筆紀錄ID
  userId: string;
  email: string;
  accountingType: string;
  amount:number;
  description:string;
  balance: number;
}


const AccountingPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [accountingData, setAccountingData] = useState<AccountingInfo[]>([]);


  const fetchAccountingData = useCallback(async () => {
    if (!user) return;   
    const q = query(collection(db, 'accounting'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as AccountingInfo
    }));

    setAccountingData(data);
  }, [user]);

//確保渲染即時會員資訊
useEffect(() => {
  if (user) {
    fetchAccountingData();
  }
}, [user, fetchAccountingData]);


//初始化新增
const initializeAccountingRecord = useCallback(async (accountingInfo?: AccountingInfo) => {
  if (!accountingInfo) return;

  const q = query(collection(db, 'accounting'), where('userId', '==', accountingInfo.userId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    try {
      await addDoc(collection(db, 'accounting'), accountingInfo);
      fetchAccountingData();
      console.log('完成初始化紀錄');
    } catch (e) {
      console.error('初始化紀錄發生錯誤: ', e);
    }
  } else {
    console.log('已存在記帳紀錄');
  }
}, [fetchAccountingData]);
//已有紀錄，後續新增
  const addAccountingRecord = async (record: AccountingInfo) => {
    await addDoc(collection(db, 'accounting'), record);
    fetchAccountingData();
  };

  const deleteAccountingRecord = async (id: string) => {
    await deleteDoc(doc(db, 'accounting', id));
    fetchAccountingData();
  };


  return (
    <> 
    {!user ? 
     <HomePage/>
      :( <> 
        <div className="flex flex-col items-center min-h-screen bg-white">
          <div className="container mx-auto px-4">
            <h1 className="font-bold text-center my-4 text-black mt-7 text-lg">您已經使用{user.email}登入</h1>
            <Form
              addAccountingRecord={addAccountingRecord}
              initializeAccountingRecord={initializeAccountingRecord}
              user={user}
            />
            <hr className="my-4" />
            <List 
              accountingData={accountingData} 
              deleteAccountingRecord={deleteAccountingRecord}  
              user={user} 
            />
            <div className="flex justify-center">
              <button type="button" onClick={()=>router.push('/')} className=" bg-gray-100  border border-gray-400 text-black px-2 py-1 ">
                返回首頁
              </button>
            </div>
          </div>
        </div>
      </>
      )}
    </>
  );
  };

export default AccountingPage;
