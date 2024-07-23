'use client';
import { useRouter } from 'next/navigation';
import Form from '../components/Form';
import List from '../components/List';
import { AuthProvider } from '../store/AuthProvider'; 


const AccountingPage: React.FC = () => {
  const router = useRouter();



  return (
    <AuthProvider> 
      <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <h1 className="font-bold text-center my-4 text-black mt-7 text-lg">您已經使用email登入</h1>
        <Form />
        <hr className="my-4" />
        <List />
        <div className="flex justify-center">
          <button type="button" onClick={()=>router.push('/')} className=" bg-gray-100  border border-gray-400 text-black px-2 py-1 ">返回首頁</button>
        </div>
      </div>
      </div>
    </AuthProvider>
  );
  };
  
  export default AccountingPage;
