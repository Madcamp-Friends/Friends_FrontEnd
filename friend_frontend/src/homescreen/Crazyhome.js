import React, { useEffect, useRef } from 'react';

const FloatingImage = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    // Random initial direction
    const angle = Math.random() * 360;
    let dx = Math.cos(angle) * 4; // Adjust speed
    let dy = Math.sin(angle) * 4; // Adjust speed

    const animate = () => {
      if (imgRef.current) {
        const img = imgRef.current;
        const rect = img.getBoundingClientRect();

        // Check collisions and update directions
        if (rect.right >= window.innerWidth && dx > 0) {
          dx = -dx;
        }
        if (rect.left <= 0 && dx < 0) {
          dx = -dx;
        }
        if (rect.bottom >= window.innerHeight && dy > 0) {
          dy = -dy;
        }
        if (rect.top <= 0 && dy < 0) {
          dy = -dy;
        }

        // Update position
        x += dx;
        y += dy;

        img.style.transform = `translate(${x}px, ${y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <img
      ref={imgRef}
      src="https://via.placeholder.com/100"
      alt="Floating"
      style={{ position: 'absolute', width: '100px', height: '100px' }}
    />
  );
};

export default FloatingImage;
