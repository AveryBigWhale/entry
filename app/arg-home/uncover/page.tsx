"use client";

// import { useRouter } from 'next/navigation';
// import ImageLoader from '../../../components/ImageLoader';
// import Image from 'next/image';

import startBg from '../../../public/start-bg.png';
export default function NextPage() {
  // const router = useRouter();

  const handleStartGame = () => {
    window.location.href = "https://www.messenger.com/t/645669168623450/?ref=suuchen-kao&messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0";
  };

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundImage: `url(${startBg.src})`,
        // backgroundImage: `url(${ImageLoader({ src: 'start-bg.png' })})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      {/* 漸層遮罩層 - 讓按鈕更容易看見 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(to bottom, 
              rgba(0,0,0,0.4) 0%,
              rgba(0,0,0,0.2) 50%,
              rgba(0,0,0,0.6) 100%
            ),
            linear-gradient(to right,
              rgba(0,0,0,0.4) 0%,
              rgba(0,0,0,0.1) 50%,
              rgba(0,0,0,0.4) 100%
            )
          `,
          zIndex: 1
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
          // marginBottom: '20px',
          maxWidth: '80%',  // 限制文字寬度
          // padding: '20px'
        }}
      >
        <h2 
          style={{
            fontSize: '32px',
            marginBottom: '15px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Current Effect 總裁失蹤案
        </h2>
        <p 
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >

          這天在潮間黨的造勢會上，名氣鼎盛的總裁王凱麗突然消失無蹤，Current Effect 也因此開出了高額獎金，希望能盡快找到總裁的下落⋯⋯
        </p>
      </div>
      
      <button
        
        onClick={handleStartGame}
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '15px 30px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          border: '2px solid white',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginBottom : '80px', // 新增底部間距
          // marginTop: '20px',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        進入對話
      </button>
    </div>
  );
}