'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';    //棄用from 'next/router';
import { useAuth } from './store/AuthContext';         


const HomePage: React.FC = (): React.ReactElement | null  => {
  const router = useRouter();
  const { user, register, signin, logout } = useAuth();
  const [reminderMessage, setReminderMessage] = useState<string | null>(null);


  const handleRegister = async (e: any) => {
    e.preventDefault();
    const emailInput = document.getElementById('email-register') as HTMLInputElement;
    const passwordInput = document.getElementById('password-register') as HTMLInputElement;
    if (!emailInput.value ||  !passwordInput.value) {
      setReminderMessage('欄位不可空白!'); 
    }else{
      setReminderMessage(''); 
      await register(emailInput.value, passwordInput.value);
      setReminderMessage('已自動登入，可點擊立即開始記帳功能');  //firebae auth 規則: 註冊成功，自動登入
      emailInput.value= "";
      passwordInput.value= "";
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const emailInput = document.getElementById('email-signin') as HTMLInputElement;
    const passwordInput = document.getElementById('password-signin') as HTMLInputElement;
    try {
      setReminderMessage(''); 
      await signin(emailInput.value, passwordInput.value);
      emailInput.value= "";
      passwordInput.value= "";
    } catch (err) {
      console.log(err);
    }
  };

  const handleStart = () => {
    router.push('/accounting');
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      setReminderMessage(''); 
      await logout();
    } catch (error) {
      console.error(error);
    }
  };


  return (       
    <>
        <div className="text-white  text-3xl mb-5 bg-black p-4 w-full text-center pt-10">
          React 練習專案 
        </div>
        <div className="flex flex-col items-center min-h-screen bg-white">
          <div className="mb-10">
            <form>
              {!user ? (
                 <>
                  <h2 className="text-center text-2xl mb-5 font-bold text-black mt-10">登入系統</h2>
                  <div>
                    <label htmlFor="email-signin" className="text-black pr-2">電郵</label>
                    <input type="text"  id="email-signin" className="p-1 mb-2 border rounded text-black"/>
                  </div>
                  <div>
                    <label htmlFor="password-signin" className="text-black pr-2">密碼</label>
                    <input type="password" id="password-signin" className="p-1 mb-2 border rounded text-black"/>
                  </div>
                  <div className="flex justify-center">
                    <button type="button" onClick={handleSignIn} className="bg-gray-100 border border-gray-400 text-black px-2 py-1">
                      登入
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center my-4 text-black mt-7 text-lg">您已經使用{user.email}登入</div>
                  <div className="flex justify-center">
                    <button type="button" onClick={handleStart} className="bg-gray-100 border border-gray-400 text-black px-2 py-1 mr-2">
                      立即開始
                    </button>
                    <button type="button" onClick={handleLogout} className="bg-gray-100 border border-gray-400 text-black px-2 py-1">
                      登出
                    </button>
                  </div>
                </>
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
              <div className="text-center  text-emerald-400  font-bold mt-5 ">{reminderMessage}</div>
            </form>
          </div>
      </div>
      </> 
  )
}

export default HomePage;
