import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
          <div className="text-white  text-3xl mb-5 bg-black p-4 w-full text-center pt-10">
            React 練習專案 
          </div>
          <div className="flex flex-col items-center min-h-screen bg-white">
            <div className="mb-10">
              <h2 className="text-center text-2xl mb-5 font-bold text-black mt-10">登入系統</h2>
              <form>
                <div>
                  <label htmlFor="email-login" className="text-black pr-2">電郵</label>
                  <input type="text"  className="p-1 mb-2 border rounded"/>
                </div>
                <div>
                  <label htmlFor="password-login" className="text-black pr-2">密碼</label>
                  <input type="password"  className="p-1 mb-2 border rounded"/>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className=" bg-gray-100  border border-gray-400 text-black px-2 py-1">登入</button>
                </div>
              </form>
              <h2 className="text-center text-2xl mb-5 font-bold text-black mt-10">註冊帳戶</h2>
              <form>
              <div>
                  <label htmlFor="email-login" className="text-black pr-2">電郵</label>
                  <input type="text"  className="p-1 mb-2 border rounded"/>
                </div>
                <div>
                  <label htmlFor="password-login" className="text-black pr-2">密碼</label>
                  <input type="password"  className="p-1 mb-2 border rounded"/>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-gray-100  border border-gray-400 text-black px-2 py-1">註冊</button>
                </div>
              </form>
            </div>
        </div>
    </>
  )
}

export default HomePage;
