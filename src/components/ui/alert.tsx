import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  variant = 'default', 
  children, 
  className = '' 
}) => {
  const baseClasses = 'relative w-full rounded-lg border p-4';
  const variantClasses = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    destructive: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
}; 