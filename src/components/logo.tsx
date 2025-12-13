import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-2 group hover:opacity-90 transition-all duration-200"
    >
      <Image 
        src="/logo.png" 
        alt="CliniQ Logo" 
        width={40} 
        height={40} 
        className="h-10 w-10"
      />
      <div className="flex flex-col">
        <span className="text-2xl font-bold leading-none tracking-tight text-[#1E40AF]">
          CliniQ
        </span>
        <span className="text-xs text-muted-foreground mt-1">
            AI-Powered Pneumonia Detection
        </span>
      </div>
    </Link>
  );
};
