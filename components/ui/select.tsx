"use client";

import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({ children, ...props }: SelectProps) {
  return (
    <select
      className="border px-2 py-1 rounded-md w-full"
      {...props}
    >
      {children}
    </select>
  );
}