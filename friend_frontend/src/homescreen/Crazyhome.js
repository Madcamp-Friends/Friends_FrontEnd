import React, { useEffect, useRef } from 'react';

const FloatingImage = () => {
  const imgRef = useRef(null);
  let rotationAngle = 0;
  let isSpinning = false;

  useEffect(() => {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    // Random initial direction
    const angle = Math.random() * 360;
    let dx = Math.cos(angle) * 8;
    let dy = Math.sin(angle) * 8;

    // Animation loop
    const animate = () => {
      if (imgRef.current) {
        const img = imgRef.current;
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        // Bounce off walls
        if (x + imgWidth > window.innerWidth && dx > 0) dx = -dx;
        if (x <= 0 && dx < 0) dx = -dx;
        if (y + imgHeight > window.innerHeight && dy > 0) dy = -dy;
        if (y <= 0 && dy < 0) dy = -dy;

        // Update position
        x += dx;
        y += dy;

        // Update rotation angle if spinning
        if (isSpinning){ 
            rotationAngle += 30;
            dx+=1;
            dy-=1
        }else{
            dx-=1;
            dy+=1
        }

        // Apply combined transformations
        img.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Spin logic on click
    const handleClick = () => {
      if (!isSpinning) {
        isSpinning = true;
        setTimeout(() => {
          isSpinning = false;
        }, 1000); // Spin for 1 second
      }
    };

    window.addEventListener('click', handleClick);

    // Cleanup event listener
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src="/assets/뇌진구.png"
      alt="Floating"
      style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
      }}
    />
  );
};

export default FloatingImage;
