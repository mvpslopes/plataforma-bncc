import React from 'react';

interface ActivityImageProps {
  title: string;
  color: string;
  className?: string;
}

export const ActivityImage: React.FC<ActivityImageProps> = ({ title, color, className = "w-full h-48 object-cover" }) => {
  return (
    <div 
      className={`${className} flex items-center justify-center text-white font-bold text-lg text-center p-4`}
      style={{ backgroundColor: color }}
    >
      <div className="max-w-full">
        {title.split(' ').map((word, index) => (
          <div key={index} className="mb-1">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};
