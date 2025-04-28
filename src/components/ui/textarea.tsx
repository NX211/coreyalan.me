import React from 'react';

interface TextareaProps {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  required?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  name, 
  value, 
  onChange, 
  className = '', 
  required = false 
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded-md ${className}`}
      required={required}
    />
  );
}; 