'use client';

import { useEffect } from 'react';

type NotificationProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
};

export default function Notification({ message, isVisible, onClose }: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`
        fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg
        transform transition-all duration-300 z-50
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      {message}
    </div>
  );
} 