// app/page.tsx
'use client';

import React, {  useState, useEffect } from 'react';
// useRef,
import { useRouter } from 'next/navigation'; // 使用 next/navigation 路由器

// import Image from 'next/image';
import ImageLoader from '../../components/ImageLoader'; // Adjust the path as necessary
// import Draggable from 'react-draggable';
// import puzzleBg from '../../public/puzzle-bg-5.png'; // Adjust the path as necessary


export default function Page() {
  const router = useRouter();
  const [isOverDropZone, setIsOverDropZone] = useState(false);
  const [holePosition, setHolePosition] = useState({ x: 300, y: 200 });
  const [puzzlePosition, setPuzzlePosition] = useState({ x: 50, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);  // 新增：追踪拼圖是否完成
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [backgroundSize, setBackgroundSize] = useState({ width: 0, height: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

  // const [borderStyle, setBorderStyle] = useState('none'); // 新增狀態來管理邊框樣式
  // const [borderStyle, setBorderStyle] = useState('2px solid white'); // 初始邊框樣式

  // 定義拼圖形狀
  const PUZZLE_SHAPE_PIXELS = `polygon(
    20px 0px, 
    30px 0px, 
    30px 10px, 
    40px 10px,
    50px 10px, 
    60px 10px, 
    70px 0px, 
    80px 0px, 
    100px 0px, 
    100px 20px, 
    90px 30px,
    90px 40px, 
    90px 50px, 
    90px 60px,
    100px 70px, 
    100px 80px, 
    100px 100px, 
    80px 100px, 
    70px 90px, 
    60px 90px, 
    50px 90px, 
    40px 90px, 
    30px 100px, 
    20px 100px, 
    0px 100px, 
    0px 80px, 
    10px 70px, 
    10px 60px, 
    10px 50px, 
    10px 40px, 
    0px 30px, 
    0px 20px
  )`;


  const isInSafeZone = React.useCallback((x: number, y: number, size: number): boolean => {
    return (
      x + size > window.innerWidth * 0.18 &&
      x < window.innerWidth * 0.18 + window.innerWidth * 0.22 &&
      y + size > window.innerHeight * 0.35 &&
      y < window.innerHeight * 0.35 + window.innerHeight * 0.35
    );
  }, []);

useEffect(() => {
  const PUZZLE_SIZE = 100;
  const SAFE_DISTANCE = 150; // 確保拼圖與缺口垂直方向也有足夠距離
  
  // 將畫面分成左右兩半
  const leftHalf = Math.floor(window.innerWidth / 2) - PUZZLE_SIZE;
  const rightHalf = Math.floor(window.innerWidth / 2);

  const isPuzzleOnLeft = Math.random() > 0.5;
  
  let puzzleX: number, puzzleY: number, holeX: number, holeY: number;
  
  // 生成拼圖塊的位置（避開 safeZone）
  do {
    puzzleX = isPuzzleOnLeft
      ? Math.floor(Math.random() * (leftHalf - PUZZLE_SIZE))
      : Math.floor(Math.random() * (window.innerWidth - rightHalf - PUZZLE_SIZE)) + rightHalf;
    puzzleY = Math.floor(Math.random() * (window.innerHeight - PUZZLE_SIZE));
  } while (isInSafeZone(puzzleX, puzzleY, PUZZLE_SIZE));

  // 生成缺口的位置（在另一半且避開 safeZone）
  do {
    holeX = !isPuzzleOnLeft
      ? Math.floor(Math.random() * (leftHalf - PUZZLE_SIZE))
      : Math.floor(Math.random() * (window.innerWidth - rightHalf - PUZZLE_SIZE)) + rightHalf;
    holeY = Math.floor(Math.random() * (window.innerHeight - PUZZLE_SIZE));
  } while (isInSafeZone(holeX, holeY, PUZZLE_SIZE));
  
  // 確保垂直方向也有足夠距離
  if (Math.abs(puzzleY - holeY) < SAFE_DISTANCE) {
    const offset = SAFE_DISTANCE - Math.abs(puzzleY - holeY);
    if (puzzleY < window.innerHeight / 2) {
      setPuzzlePosition({ x: puzzleX, y: puzzleY });
      setHolePosition({ x: holeX, y: holeY + offset });
    } else {
      setPuzzlePosition({ x: puzzleX, y: puzzleY });
      setHolePosition({ x: holeX, y: Math.max(0, holeY - offset) });
    }
  } else {
    setPuzzlePosition({ x: puzzleX, y: puzzleY });
    setHolePosition({ x: holeX, y: holeY });
  }
}, [isInSafeZone]);
 
  // 生成不重疊的位置
  // useEffect(() => {
  //   // const maxX = window.innerWidth - 100;  // 減去拼圖寬度
  //   // const maxY = window.innerHeight - 100; // 減去拼圖高度
  //   // const randomX = Math.floor(Math.random() * maxX);
  //   // const randomY = Math.floor(Math.random() * maxY);
  //   // setHolePosition({ x: randomX, y: randomY });
  //   const PUZZLE_SIZE = 100;
  //   const SAFE_DISTANCE = 150; // 確保兩個位置之間有足夠的距離

  //   // 將畫面分成左右兩半
  //   const leftHalf = Math.floor(window.innerWidth / 2) - PUZZLE_SIZE;
  //   const rightHalf = Math.floor(window.innerWidth / 2);

  //   // 隨機決定拼圖塊在左邊還是右邊
  //   const isPuzzleOnLeft = Math.random() > 0.5;

  //   // 生成拼圖塊的位置
  //   const puzzleX = isPuzzleOnLeft
  //     ? Math.floor(Math.random() * (leftHalf - PUZZLE_SIZE))
  //     : Math.floor(Math.random() * (window.innerWidth - rightHalf - PUZZLE_SIZE)) + rightHalf;
  //   const puzzleY = Math.floor(Math.random() * (window.innerHeight - PUZZLE_SIZE));
    
  //   // 生成缺口的位置（在另一半）
  //   const holeX = !isPuzzleOnLeft
  //     ? Math.floor(Math.random() * (leftHalf - PUZZLE_SIZE))
  //     : Math.floor(Math.random() * (window.innerWidth - rightHalf - PUZZLE_SIZE)) + rightHalf;
  //   const holeY = Math.floor(Math.random() * (window.innerHeight - PUZZLE_SIZE));

  //   // 確保垂直方向也有足夠距離
  //   if (Math.abs(puzzleY - holeY) < SAFE_DISTANCE) {
  //     const offset = SAFE_DISTANCE - Math.abs(puzzleY - holeY);
  //     if (puzzleY < window.innerHeight / 2) {
  //       setPuzzlePosition({ x: puzzleX, y: puzzleY });
  //       setHolePosition({ x: holeX, y: holeY + offset });
  //       console.log('位置生成 (上半部調整):', {
  //         puzzle: { x: puzzleX, y: puzzleY },
  //         hole: { x: holeX, y: holeY + offset },
  //         isPuzzleOnLeft
  //       });
  //     } else {
  //       setPuzzlePosition({ x: puzzleX, y: puzzleY });
  //       setHolePosition({ x: holeX, y: Math.max(0, holeY - offset) });
  //       console.log('位置生成 (下半部調整):', {
  //         puzzle: { x: puzzleX, y: puzzleY },
  //         hole: { x: holeX, y: Math.max(0, holeY - offset) },
  //         isPuzzleOnLeft
  //       });
  //     }
  //   } else {
  //     setPuzzlePosition({ x: puzzleX, y: puzzleY });
  //     setHolePosition({ x: holeX, y: holeY });
  //     console.log('位置生成 (無需調整):', {
  //       puzzle: { x: puzzleX, y: puzzleY },
  //       hole: { x: holeX, y: holeY },
  //       isPuzzleOnLeft
  //     });
  //   }
    
  // }, []);

  useEffect(() => {
    // 設置初始視窗大小
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // 監聽視窗大小變化
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 計算背景圖片的實際尺寸和位置
  useEffect(() => {
    const img = new window.Image();
    // img.src = puzzleBg.src; // Use the custom loader
    img.src = ImageLoader({ src: 'puzzle-bg-5.png' }); // Use the custom loader
    // img.src = '/puzzle-bg-5.png';
    // img.src = 'https://averybigwhale.github.io/entry/public/puzzle-bg-5.png';
    img.onload = () => {
      const imgRatio = img.width / img.height;
      const windowRatio = windowSize.width / windowSize.height;
      
      let bgWidth, bgHeight, bgX, bgY;
      
      if (windowRatio > imgRatio) {
        // 窗口比圖片寬，圖片會填滿寬度
        bgWidth = windowSize.width;
        bgHeight = windowSize.width / imgRatio;
        bgX = 0;
        bgY = (windowSize.height - bgHeight) / 2;
      } else {
        // 窗口比圖片窄，圖片會填滿高度
        bgHeight = windowSize.height;
        bgWidth = windowSize.height * imgRatio;
        bgX = (windowSize.width - bgWidth) / 2;
        bgY = 0;
      }

      setBackgroundSize({ width: bgWidth, height: bgHeight });
      setBackgroundPosition({ x: bgX, y: bgY });
    };
  }, [windowSize]);

  

  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.dataTransfer.setData('text', e.currentTarget.id);

  //   // Create a custom drag image
  //   const dragImage = document.createElement('div');
  //   dragImage.style.width = '100px';
  //   dragImage.style.height = '100px';
  //   // dragImage.style.backgroundColor  = '#fff'; // Change to desired color
  //   dragImage.style.backgroundImage = `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`;

  //   dragImage.style.backgroundSize = `${backgroundSize.width}px ${backgroundSize.height}px`;
  //   dragImage.style.backgroundPosition = `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`;
            
  //   dragImage.style.opacity = '1'; // Optional: make it slightly transparent
  //   dragImage.style.position = 'absolute';
  //   dragImage.style.pointerEvents = 'none'; // Prevent interaction with the drag image
  //   dragImage.style.clipPath = PUZZLE_SHAPE_PIXELS;
  //   // dragImage.style.WebkitClipPath = PUZZLE_SHAPE_PIXELS,
  //   // Append to body to make it visible
  //   document.body.appendChild(dragImage);

  //   // Set the custom drag image
  //   e.dataTransfer.setDragImage(dragImage, 50, 50); // Offset to center the image

    
  //   // Remove the custom drag image after a short delay
  //   setTimeout(() => {
  //     document.body.removeChild(dragImage);
  //   }, 0);
  //   setIsDragging(true);
  //   // setBorderStyle(BORDER_STYLE); // 拖曳時設置白色邊框
  // };

  // // 拖曳結束
  // const handleDragEnd = () => {
  //   setIsDragging(false);
  // };

  // 拖曳進入區域時顯示放置提示
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOverDropZone(true);
  };

  // 拖曳離開區域時，隱藏提示
  const handleDragLeave = () => {
    setIsOverDropZone(false);
  };

  // 修改放置處理函數
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOverDropZone(false);
    
    const data = e.dataTransfer.getData('text');
    if (data === 'puzzlePiece') {
        setIsCompleted(true);  // 設置完成狀態
        // 延遲跳轉
        setTimeout(() => {
            router.replace('./arg-home/uncover');  // 使用 replace 來確保不保留當前狀態
        }, 1200);  // 2秒後跳轉
    }
  };  

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setPointerOffset({
      x: touch.clientX - puzzlePosition.x,
      y: touch.clientY - puzzlePosition.y,
    });
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const newPos = {
      x: touch.clientX - pointerOffset.x,
      y: touch.clientY - pointerOffset.y,
    };
    setPuzzlePosition(newPos);
  
    // 評估拼圖塊是否進入放置區 (這裡以寬高 100px 為例)
    if (
      newPos.x + 40 > holePosition.x &&
      newPos.x < holePosition.x + 40 &&
      newPos.y + 40 > holePosition.y &&
      newPos.y < holePosition.y + 40
    ) {
      setIsOverDropZone(true);
    } else {
      setIsOverDropZone(false);
    }
  };
  

  // 假設拼圖和缺口寬高均為100px
  const isInDropZone = (): boolean => {
    return (
      puzzlePosition.x + 10 > holePosition.x &&
      puzzlePosition.x < holePosition.x + 10 &&
      puzzlePosition.y + 10 > holePosition.y &&
      puzzlePosition.y < holePosition.y + 10
    );
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (isInDropZone()) {
      setIsCompleted(true); // 與 drop 一樣的完成邏輯
      setTimeout(() => {
        router.replace('./arg-home/uncover');
      }, 1200);
    }
  };

  // const handleTouchEnd = () => {
  //   setIsDragging(false);
  // };

  // 狀態與偏移同上
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  // Pointer down 時
  // const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
  //   // 把事件 target 綁定為 pointer capture，未來 pointer move 都會發送到這個元素
  //   e.currentTarget.setPointerCapture(e.pointerId);
  //   setPointerOffset({
  //     x: e.clientX - puzzlePosition.x,
  //     y: e.clientY - puzzlePosition.y,
  //   });
  // };

  // // Pointer move 時更新位置
  // const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
  //   // 檢查是否已經 capture pointerId
  //   e.preventDefault(); // 防止預設行為，如頁面滾動
  //   if (e.pressure === 0) return;
  //   setPuzzlePosition({
  //     x: e.clientX - pointerOffset.x,
  //     y: e.clientY - pointerOffset.y,
  //   });
  // };

  // const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
  //   e.currentTarget.releasePointerCapture(e.pointerId);
  //   setIsDragging(false);
  //   // 檢查是否在放置區域內
  //   if (isInDropZone()) {
  //     setIsCompleted(true);
  //     setTimeout(() => {
  //       router.replace('./arg-home/uncover');
  //     }, 1200);
  //   }
  // };

  // Pointer up（拖曳結束）
  // const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
  //   e.currentTarget.releasePointerCapture(e.pointerId);
  //   setIsDragging(false);
  // };

  
  return (

    <div style={{ 
      width: '100vw',
      height: '100vh',
      position: 'relative',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundSize: `${windowSize.width}px ${windowSize.height}px`,
    }}>

      {/* <div
        style={{
          position: 'absolute',
          left: `${window.innerWidth * 0.18}px`,
          top: `${window.innerHeight * 0.35}px`,
          width: `${window.innerWidth * 0.22}px`,
          height: `${window.innerHeight * 0.35}px`,
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          zIndex: 1000, // 確保在頂層可以看到
        }}
      /> */}


      {/* 底層背景 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#332',
          zIndex: 1,
        }}
      />

      {/* 拼圖背景 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}
      >

        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            // backgroundImage: "url('https://averybigwhale.github.io/entry/public/puzzle-bg-5.png')",
            // backgroundImage: "url('/puzzle-bg-5.png')",
            backgroundImage: `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`,
            backgroundSize: 'cover',
            // backgroundSize: `${windowSize.width}px ${windowSize.height}px`,
            backgroundPosition: 'center',
          }}
        />

        <div 
          style={{
            position: 'relative',
            zIndex: 2, 
            color: 'white',
            textAlign: 'left',
            padding: '20%',
          }}>
          <h2 
            style={{
              fontSize: '32px',
              marginBottom: '5px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              // 

            }}
          >
            <div className='justify-left'>
            鯨魚擱淺海灘
            <br/>
            
            </div>
            
          </h2>
          <p 
            style={{
              fontSize: '32px',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            See you at the shore
          </p>
        </div>  
      </div>
      
      {/* 漸層遮罩層 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(to top,


            transparent 100%)`,
          zIndex: 6,
          pointerEvents: 'none', // 確保遮罩不會影響互動
        }}
      />
      
      {/* 可拖曳的拼圖塊 */}
      <div
        // ref={nodeRef}
        id="puzzlePiece"
        // draggable
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        // onPointerDown={handlePointerDown}
        // onPointerMove={handlePointerMove}
        // onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}   // 備援的 touch 事件
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          touchAction: 'none', // 禁止預設觸控行為
          position: 'absolute',
          left: `${puzzlePosition.x}px`,
          top: `${puzzlePosition.y}px`,
        //   left: isCompleted ? `${holePosition.x}px` : `${puzzlePosition.x}px`,
        //   top: isCompleted ? `${holePosition.y}px` : `${puzzlePosition.y}px`,
          width: '100px',
          height: '100px',
          backgroundImage: `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`,
          // backgroundColor: "#fff",
          // backgroundColor: isDragging ? 'red' : '#fff',
          // backgroundColor: puzzleColor, // 使用顏色狀態
          // backgroundColor: isDragging ? draggingColor : puzzleColor, // 使用拖曳顏色
          backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
          backgroundPosition: `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`,
          cursor: 'grab',
          opacity: isDragging ? '0.5' : '1',
          boxShadow: isDragging 
            ? '0 8px 16px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)' 
            : '0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1), 0 0 2px rgba(0,0,0,0.1)',
          clipPath: PUZZLE_SHAPE_PIXELS,
          WebkitClipPath: PUZZLE_SHAPE_PIXELS,
        //   zIndex: 3,
          zIndex: isCompleted ? 10 : 30,
          // transition: 'all 0.3s ease-in-out',
          transition: 'border 0.3s ease', // 添加邊框過渡效果
          // border: borderStyle, // 使用邊框樣式狀態
          outline: '4px solid white', // 使用 outline 來顯示邊框
          outlineOffset: '-4px', // 調整邊框位置
          // transition: 'background-color 0.3s ease', 
        }}
      />

      <div>
        {/* 被切下來的底圖 */}
        <div
          style={{
            position: 'absolute',
            left: `${holePosition.x}px`,
            top: `${holePosition.y}px`,
            width: '100px',
            height: '100px',
            // backgroundImage: "url('/bottom-img.png')",
            backgroundSize: `${windowSize.width}px ${windowSize.height}px`,
            backgroundPosition: `-${holePosition.x}px -${holePosition.y}px`,
            clipPath: PUZZLE_SHAPE_PIXELS,
            WebkitClipPath: PUZZLE_SHAPE_PIXELS,
            backgroundColor: '#332', // 使用與底層背景相同的顏色
            zIndex: 5,
          }}
        />
      </div>

      {/* 被切下來的底圖 */}
      {/* <div
        style={{
          position: 'absolute',
          left: `${holePosition.x}px`,
          top: `${holePosition.y}px`,
          width: '100px',
          height: '100px',
          // backgroundImage: "url('https://averybigwhale.github.io/entry/public/puzzle-bg-5.png')",
          // backgroundImage: "url('/puzzle-bg-5.png')",
          backgroundImage: `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`,
          backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
          backgroundPosition: `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`,
          clipPath: PUZZLE_SHAPE_PIXELS,
          WebkitClipPath: PUZZLE_SHAPE_PIXELS,
          backgroundColor: '#332',
          zIndex: 5,
          opacity: isCompleted ? 1 : 0,  // 完成時顯示
          transition: 'opacity 0.3s ease-in-out',
        }}
      /> */}

      {/* 放置區域 */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        style={{
          position: 'absolute',
          left: `${holePosition.x}px`,
          top: `${holePosition.y}px`,
          width: '100px',
          height: '100px',
          // backgroundImage: "url('https://averybigwhale.github.io/entry/public/puzzle-bg-5.png')",
          // backgroundImage: "url('/puzzle-bg-5.png')",
          backgroundImage: `url(${ImageLoader({ src: 'puzzle-bg-5.png' })})`,
          backgroundSize: `${backgroundSize.width}px ${backgroundSize.height}px`,
          backgroundPosition: `${-holePosition.x + backgroundPosition.x}px ${-holePosition.y + backgroundPosition.y}px`,
          opacity: isOverDropZone && !isCompleted ? 0.5 : 0,
          clipPath: PUZZLE_SHAPE_PIXELS,
          WebkitClipPath: PUZZLE_SHAPE_PIXELS,
          zIndex: 8,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* 完成時的閃光效果 */}
      {isCompleted && (
        <div
          style={{
            position: 'absolute',
            left: `${holePosition.x - 50}px`,
            top: `${holePosition.y - 50}px`,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            animation: 'completion-glow 2s ease-out',
            zIndex: 9,
            pointerEvents: 'none',
          }}
        />
      )}

      <style jsx>{`
        @keyframes completion-glow {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }
      `}</style>
    </div> 
  );
}