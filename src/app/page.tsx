'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';          //棄用from 'next/router';
import { AuthProvider } from './store/AuthProvider';  //已含AuthContext
import useAuth from './hooks/useAuth';


const Page: React.FC = () => {
  const router = useRouter();
  const { user, register, signIn, logout } = useAuth();
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);

   
  useEffect(() => {
    if (user) {
      console.log('登入成功，目前用戶:', user);
    }else{
      console.log('找不到');
    }
  }, [user]); 

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    const emailInput = document.getElementById('email-register') as HTMLInputElement;
    const passwordInput = document.getElementById('password-register') as HTMLInputElement;
    if (!emailInput.value ||  !passwordInput.value) {
      setRegisterMessage('欄位不可空白!');
      return;      
    }
    try {
      const user  = await register(emailInput.value, passwordInput.value);
      if (user) {
        console.log("註冊成功，用戶資訊:", user);
        setRegisterMessage('註冊成功!請登入以使用記帳功能');
      } else {
        setRegisterMessage('註冊失敗，請重新嘗試');
      }
      emailInput.value= "";
      passwordInput.value= "";
    } catch (error) {
      console.error('註冊失敗:', error);
      setRegisterMessage('註冊失敗，請重新嘗試');
    }
  };

  const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    const emailInput = document.getElementById('email-signin') as HTMLInputElement;
    const passwordInput = document.getElementById('password-signin') as HTMLInputElement;
    if (emailInput && passwordInput) {
      try {
        const response = await signIn(emailInput.value, passwordInput.value);
        console.log(response);
        emailInput.value= "";
        passwordInput.value= "";
        console.log("登入成功"); 
      } catch (error) {
        console.error('登入失敗:', error);
      }
    }
  };

  const handleStart = () => {
    router.push('/accounting');
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await logout();
      console.log(response);
      console.log('登出成功');
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };


  return (          //外層容器:已有Provider,省Fragment
    <AuthProvider> 
        <div className="text-white  text-3xl mb-5 bg-black p-4 w-full text-center pt-10">
          React 練習專案 
        </div>
        <div className="flex flex-col items-center min-h-screen bg-white">
          <div className="mb-10">
            <h2 className="text-center text-2xl mb-5 font-bold text-black mt-10">登入系統</h2>
            <form>
              <div>
                <label htmlFor="email-signin" className="text-black pr-2">電郵</label>
                <input type="text"  id="email-signin" className="p-1 mb-2 border rounded text-black"/>
              </div>
              <div>
                <label htmlFor="password-signin" className="text-black pr-2">密碼</label>
                <input type="password" id="password-signin" className="p-1 mb-2 border rounded text-black"/>
              </div>
              {!user ? (
                <div className="flex justify-center">
                  <button type="button" onClick={handleSignIn} className="bg-gray-100 border border-gray-400 text-black px-2 py-1">
                    登入
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button type="button" onClick={handleStart} className="bg-gray-100 border border-gray-400 text-black px-2 py-1 mr-2">
                    立即開始
                  </button>
                  <button type="button" onClick={handleLogout} className="bg-gray-100 border border-gray-400 text-black px-2 py-1">
                    登出
                  </button>
                </div>
              )}
            </form>
            <h2 className="text-center text-2xl mb-5 font-bold text-black mt-10">註冊帳戶</h2>
            <form>
              <div>
                <label htmlFor="email-register" className="text-black pr-2 ">電郵</label>
                <input type="text"  id="email-register" className="p-1 mb-2 border rounded text-black"/>
              </div>
              <div>
                <label htmlFor="password-register" className="text-black pr-2">密碼</label>
                <input type="password"  id="password-register" className="p-1 mb-2 border rounded  text-black"/>
              </div>
              <div className="flex justify-center">
                <button onClick={handleRegister} type="button" className="bg-gray-100  border border-gray-400 text-black px-2 py-1">
                  註冊
                </button>
              </div>
              <div className="text-center  text-emerald-400  font-bold mt-5 ">{registerMessage}</div>
            </form>
          </div>
      </div>
    </AuthProvider>
  )
}

export default Page;
