import React from "react";
const base="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border transition";
const variants={default:"bg-black text-white border-black",secondary:"bg-white text-black border-gray-300",outline:"bg-transparent text-black border-gray-300",destructive:"bg-red-600 text-white border-red-600",ghost:"bg-transparent border-transparent"};
const sizes={sm:"px-2 py-1 text-xs",default:"",icon:"p-2 w-9 h-9"};
export function Button({variant="default",size="default",className="",asChild=false,...props}) {
  const Cmp=asChild?"span":"button";
  return <Cmp className={[base,variants[variant]||"",sizes[size]||"",className].join(" ")} {...props}/>;
}
export default Button;
