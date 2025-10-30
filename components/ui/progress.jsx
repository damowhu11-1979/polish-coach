import React from "react";
export function Progress({value=0,className=""}){const pct=Math.max(0,Math.min(100,Number(value)||0));return(<div className={`h-2 w-full rounded bg-gray-200 ${className}`}><div className="h-2 rounded bg-black" style={{width:`${pct}%`}}/></div>);}
export default Progress;
