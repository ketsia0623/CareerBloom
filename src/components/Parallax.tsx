import React, { useEffect, useState } from 'react';
import './Parallax.css';

interface ParallaxProps {
  bottomImage: string;
  middleImage: string;
  topImage: string;
}

const Parallax: React.FC<ParallaxProps> = ({ bottomImage, middleImage, topImage }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-container">
      <div 
        className="parallax-layer bottom-layer"
        style={{ 
          backgroundImage: `url(${bottomImage})`,
          transform: `translateY(${scrollPosition * 0.1}px)`
        }}
      />
      <div 
        className="parallax-layer middle-layer"
        style={{ 
          backgroundImage: `url(${middleImage})`,
          transform: `translateY(${scrollPosition * 0.4}px)`
        }}
      />
      <div 
        className="parallax-layer top-layer"
        style={{ 
          backgroundImage: `url(${topImage})`,
          transform: `translateY(${scrollPosition * 0.7}px)`
        }}
      />
    </div>
  );
};

export default Parallax;