import React from "react";
export function Input({className="",...p}){return <input className={`h-9 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-black/20 ${className}`} {...p}/>;}
export default Input;
