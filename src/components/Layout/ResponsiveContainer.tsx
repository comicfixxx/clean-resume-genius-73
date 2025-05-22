
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  fullHeight?: boolean;
  noPadding?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '5xl' | '7xl' | 'full';
  withGradient?: boolean;
  centered?: boolean;
}

const maxWidthMap = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '5xl': 'max-w-5xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full'
};

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  as: Component = 'div',
  fullHeight = false,
  noPadding = false,
  maxWidth = '2xl',
  withGradient = false,
  centered = false
}) => {
  return (
    <Component
      className={cn(
        'w-full mx-auto transition-all duration-300',
        maxWidthMap[maxWidth],
        !noPadding && 'px-4 sm:px-6 md:px-8',
        fullHeight && 'h-full',
        withGradient && 'bg-gradient-to-b from-primary/5 to-transparent rounded-xl',
        centered && 'flex flex-col items-center justify-center',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ResponsiveContainer;
