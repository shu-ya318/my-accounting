'use client';
import { useRouter } from 'next/navigation';          //棄用from 'next/router';
import { AuthProvider } from './store/AuthProvider';  //已含AuthContext
import useAuth from './hooks/useAuth';

const Page: React.FC = () => {
  const router = useRouter();
  const { register, signIn, logout } = useAuth();


  const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const emailInput = document.getElementById('email-login') as HTMLInputElement;
    const passwordInput = document.getElementById('password-login') as HTMLInputElement;
    if (emailInput && passwordInput) {
      await register(emailInput.value, passwordInput.value);
    }
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const emailInput = document.getElementById('email-signup') as HTMLInputElement;
    const passwordInput = document.getElementById('password-signup') as HTMLInputElement;
    if (emailInput && passwordInput) {
      await signIn(emailInput.value, passwordInput.value);
    }
  };

  const handleStart = () => {
    router.push('/accounting');
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
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
                <label htmlFor="email-login" className="text-black pr-2">電郵</label>
                <input type="text"  className="p-1 mb-2 border rounded text-black"/>
              </div>
              <div>
                <label htmlFor="password-login" className="text-black pr-2">密碼</label>
                <input type="password"  className="p-1 mb-2 border rounded text-black"/>
              </div>
              <div className="flex justify-center">
                <button type="button" onClick={handleSignIn} className=" bg-gray-100  border border-gray-400 text-black px-2 py-1">登入</button>
              </div>
              <div className="flex justify-center">
                <button type="button" onClick={handleStart}  className=" bg-gray-100  border border-gray-400 text-black px-2 py-1  mr-2 ">立即開始</button>
                <button type="button" onClick={handleLogout} className=" bg-gray-100  border border-gray-400 text-black px-2 py-1">登出</button>
              </div>
            </form>
            <h2 className="text-center text-2xl mb-5 font-bold text-black mt-10">註冊帳戶</h2>
            <form>
              <div>
                <label htmlFor="email-login" className="text-black pr-2 ">電郵</label>
                <input type="text"  className="p-1 mb-2 border rounded text-black"/>
              </div>
              <div>
                <label htmlFor="password-login" className="text-black pr-2">密碼</label>
                <input type="password"  className="p-1 mb-2 border rounded  text-black"/>
              </div>
              <div className="flex justify-center">
                <button onClick={handleRegister} type="button" className="bg-gray-100  border border-gray-400 text-black px-2 py-1">註冊</button>
              </div>
            </form>
          </div>
      </div>
    </AuthProvider>
  )
}

export default Page;

