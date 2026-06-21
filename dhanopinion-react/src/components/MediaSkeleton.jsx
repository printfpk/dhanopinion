import React, { useState } from 'react';

export default function MediaSkeleton({ type = 'img', src, alt, className, style, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: style?.width || '100%',
        height: style?.height || '100%',
        overflow: 'hidden',
        display: 'block',
        ...style,
      }}
      className={className}
    >
      {!isLoaded && (
        <div className="skeleton-overlay" />
      )}
      {type === 'video' ? (
        <video
          src={src}
          preload="none"
          onCanPlay={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'cover',
            opacity: isLoaded ? (style?.opacity ?? 1) : 0,
            transition: 'opacity 0.8s ease',
            mixBlendMode: style?.mixBlendMode || 'normal',
          }}
          {...props}
        />
      ) : (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'cover',
            opacity: isLoaded ? (style?.opacity ?? 1) : 0,
            transition: 'opacity 0.8s ease',
            mixBlendMode: style?.mixBlendMode || 'normal',
          }}
          {...props}
        />
      )}
    </div>
  );
}
