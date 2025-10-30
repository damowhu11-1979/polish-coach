import React from "react";
export function Switch({checked,onCheckedChange}){return(<button role="switch" aria-checked={!!checked} onClick={()=>onCheckedChange?.(!checked)} className={`inline-flex h-6 w-10 items-center rounded-full border transition ${checked?"bg-black border-black":"bg-white border-gray-300"}`}><span className={`block h-5 w-5 rounded-full bg-white transition-transform ${checked?"translate-x-4":"translate-x-0.5"}`}/></button>);}
export default Switch;
