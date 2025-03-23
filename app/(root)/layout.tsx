import Link from 'next/link'; // Import Link from next/link

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="zh-TW">
        <body className="bg-gray-100 text-gray-900">
          {/* 頁首 */}
          <header className="bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
              <h1 className="text-xl font-bold text-purple-600">潮間黨</h1>
              <nav>
                <ul className="flex space-x-4 text-gray-700">
                  <li>
                    <Link href="/" className="hover:text-purple-500">首頁</Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-purple-500">關於我們</Link>
                  </li>
                  <li>
                    <Link href="/news" className="hover:text-purple-500">最新消息</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
  
          {/* 主要內容 */}
          <main>{children}</main>
  
          {/* 頁尾 */}
          <footer className="bg-gray-800 text-white py-6 text-center mt-10">
            <div className="container mx-auto">
              <h3 className="text-lg font-semibold">潮間黨 Intertidal Party</h3>
              <p>地址 | 105 台北市松山區南京東路三段261號3樓</p>
              <p>電話 | 02-27520806</p>
              <p>信箱 | chairperson@dpp.org.tw</p>
            </div>
          </footer>
        </body>
      </html>
    );
}