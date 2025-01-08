
// import React, { useEffect, useRef, useState } from 'react';

// const FloatingImage = () => {
//   const imgRef = useRef(null);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [images,setImages]=useState([{id:1}]);
//   let rotationAngle = 0;

//   // Random initial position and direction
//   let x = Math.random() * (window.innerWidth - 300);
//   let y = Math.random() * (window.innerHeight - 300);
//   let dx = Math.cos(Math.random() * 360) * 4;
//   let dy = Math.sin(Math.random() * 360) * 4;

//   // Animation loop
//   useEffect(() => {
//     const animate = () => {
//       if (imgRef.current) {
//         const img = imgRef.current;
//         const imgWidth = img.offsetWidth;
//         const imgHeight = img.offsetHeight;

//         // Bounce off walls
//         if (x + imgWidth > window.innerWidth && dx > 0) dx = -dx;
//         if (x <=0 && dx < 0) dx = -dx;
//         if (y + imgHeight > window.innerHeight && dy > 0) dy = -dy;
//         if (y <=0 && dy < 0) dy = -dy;

//         // Update position
//         x += dx;
//         y += dy;

//         // Update rotation angle if spinning
//         if (isSpinning) {
//           rotationAngle += 10;
//         }

//         // Apply combined transformations
//         img.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`;
//       }

//       requestAnimationFrame(animate);
//     };

//     animate();
//   }, [isSpinning]);

//   // Handle image click to start spinning
//   const handleImageClick = () => {
//     if (!isSpinning) {
//       setIsSpinning(true);
//       setTimeout(() => setIsSpinning(false), 3000); // Spin for 3 seconds
//     }
//   };

//   return (
//     <img
//       ref={imgRef}
//       src="/assets/뇌진구.png"
//       alt="Floating"
//       onClick={handleImageClick}
//       style={{
//         position: 'absolute',
//         width: '300px',
//         height: '300px',
//         cursor: 'pointer',
//         transition: 'transform 0.1s linear',
//       }}
//     />
//   );
// };

// export default FloatingImage;

// import React, { useEffect, useRef, useState } from 'react';

// const FloatingImage = () => {
//   const [images, setImages] = useState([{ id: 1 }]); // Store images with unique IDs

//   // Handle screen double-click to add a new image
//   const handleScreenDoubleClick = () => {
//     const newImage = {
//       id: images.length + 1,
//       x: Math.random() * (window.innerWidth - 300),
//       y: Math.random() * (window.innerHeight - 300),
//       dx: Math.cos(Math.random() * 360) * 4,
//       dy: Math.sin(Math.random() * 360) * 4,
//       rotationAngle: 0,
//       isSpinning: false,
//     };

//     setImages((prevImages) => [...prevImages, newImage]);
//   };

//   // Animation loop for each image
//   useEffect(() => {
//     const animate = () => {
//       setImages((prevImages) =>
//         prevImages.map((img) => {
//           let { x, y, dx, dy, rotationAngle, isSpinning } = img;

//           // Bounce off walls
//           if (x + 300 > window.innerWidth && dx > 0) dx = -dx;
//           if (x < 0 && dx < 0) dx = -dx;
//           if (y + 300 > window.innerHeight && dy > 0) dy = -dy;
//           if (y < 0 && dy < 0) dy = -dy;

//           // Update position
//           x += dx;
//           y += dy;

//           // Update rotation if spinning
//           if (isSpinning) {
//             rotationAngle += 10;
//           }

//           return { ...img, x, y, dx, dy, rotationAngle };
//         })
//       );

//       requestAnimationFrame(animate);
//     };

//     animate();
//   }, []);

//   // Handle image click to start spinning
//   const handleImageClick = (id) => {
//     setImages((prevImages) =>
//       prevImages.map((img) =>
//         img.id === id ? { ...img, isSpinning: true } : img
//       )
//     );

//     // Stop spinning after 3 seconds
//     setTimeout(() => {
//       setImages((prevImages) =>
//         prevImages.map((img) =>
//           img.id === id ? { ...img, isSpinning: false } : img
//         )
//       );
//     }, 3000);
//   };

//   return (
//     <div
//       onDoubleClick={handleScreenDoubleClick}
//       style={{ width: '100%', height: '100vh', position: 'relative' }}
//     >
//       {/* Render each image */}
//       {images.map((img) => (
//         <img
//           key={img.id}
//           src="/assets/뇌진구.png"
//           alt="Floating"
//           onClick={() => handleImageClick(img.id)}
//           style={{
//             position: 'absolute',
//             width: '300px',
//             height: '300px',
//             transform: `translate(${img.x}px, ${img.y}px) rotate(${img.rotationAngle}deg)`,
//             cursor: 'pointer',
//             transition: 'transform 0.1s linear',
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default FloatingImage;
import React, { useEffect, useRef, useState } from 'react';

const FloatingImage = () => {
  const [images, setImages] = useState([]);
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  // Predefined image collection
  const imageCollection = [
    '/assets/뇌진구.png',
    '/뇌진구친구.png',
    '/앵무새.png',
    '/과자별.png',
  ];

  // Animation loop for each floating image
  useEffect(() => {
    const animate = () => {
      setImages((prevImages) =>
        prevImages.map((img) => {
          let { x, y, dx, dy, rotationAngle, isSpinning } = img;

          // Bounce off walls
          if (x + 300 > window.innerWidth && dx > 0) dx = -dx;
          if (x < 0 && dx < 0) dx = -dx;
          if (y + 300 > window.innerHeight && dy > 0) dy = -dy;
          if (y < 0 && dy < 0) dy = -dy;

          // Update position
          x += dx;
          y += dy;

          // Update rotation if spinning
          if (isSpinning) {
            rotationAngle += 10;
          }

          return { ...img, x, y, dx, dy, rotationAngle };
        })
      );

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // Handle image click to start spinning
  const handleImageClick = (id) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id ? { ...img, isSpinning: true } : img
      )
    );

    // Stop spinning after 3 seconds
    setTimeout(() => {
      setImages((prevImages) =>
        prevImages.map((img) =>
          img.id === id ? { ...img, isSpinning: false } : img
        )
      );
    }, 3000);
  };

  // Handle screen double-click to duplicate an image
  const handleScreenDoubleClick = () => {
    if (images.length > 0) {
      const lastImage = images[images.length - 1];
      const newImage = {
        ...lastImage,
        id: images.length + 1,
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 300),
      };

      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  // Handle image selection from the box
  const handleSelectImage = (src) => {
    const newImage = {
      id: images.length + 1,
      src,
      x: Math.random() * (window.innerWidth - 300),
      y: Math.random() * (window.innerHeight - 300),
      dx: Math.cos(Math.random() * 360) * 4,
      dy: Math.sin(Math.random() * 360) * 4,
      rotationAngle: 0,
      isSpinning: false,
    };

    setImages((prevImages) => [...prevImages, newImage]);
    setIsBoxOpen(false); // Close the box after selecting an image
  };

  return (
    <div
      onDoubleClick={handleScreenDoubleClick}
      style={{ width: '100%', height: '100vh', position: 'relative' }}
    >
      {/* Box for selecting images */}
      <img
        src='/보물상자.png'
        onClick={() => setIsBoxOpen(!isBoxOpen)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '100px',
          height: '100px',
          backgroundColor: '#ccc',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />

      {/* Grid of images when the box is open */}
      {isBoxOpen && (
        <div
          style={{
            position: 'absolute',
            top: '140px',
            left: '20px',
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }}
        >
          {imageCollection.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              onClick={() => handleSelectImage(src)}
              style={{
                width: '100px',
                height: '100px',
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Render each floating image */}
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt="Floating"
          onClick={() => handleImageClick(img.id)}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            transform: `translate(${img.x}px, ${img.y}px) rotate(${img.rotationAngle}deg)`,
            cursor: 'pointer',
            transition: 'transform 0.1s linear',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingImage;


