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
  id?: string;
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


  //初始化欄位設定
  async function initializeAccountingRecord(accountingInfo?: AccountingInfo) {
    if (!accountingInfo) {
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "accounting"), {
        userId: accountingInfo.userId,
        email: accountingInfo.email,
        accountingType: accountingInfo.accountingType,
        amount: accountingInfo.amount,
        description: accountingInfo.description,
        balance: accountingInfo.balance
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  // initializeAccountingRecord();


  //統一由父元件處理各功能使用的firestore、狀態管理  (非每次渲都呼叫) 
  const fetchAccountingData = useCallback(async () => {
    if (!user) {
      return;
    }
    const q = query(collection(db, "accounting"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as AccountingInfo
    }));
    setAccountingData(data);
  }, [user]); 


    //確保最新的會員資訊
    useEffect(() => {
      if (user) {
        fetchAccountingData();
      }
    }, [user, fetchAccountingData]);


  const addAccountingRecord = async (record: AccountingInfo) => {
    await addDoc(collection(db, "accounting"), record);
    fetchAccountingData();
  };

  const deleteAccountingRecord = async (id: string) => {
    await deleteDoc(doc(db, "accounting", id));
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
              accountingData={accountingData}
              addAccountingRecord={addAccountingRecord}
              // initializeAccountingRecord={initializeAccountingRecord}
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
