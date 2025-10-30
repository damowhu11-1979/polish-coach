import React from "react";
export function Card({className="",...p}){return <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...p}/>;}
export function CardHeader({className="",...p}){return <div className={`p-4 border-b ${className}`} {...p}/>;}
export function CardTitle({className="",...p}){return <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...p}/>;}
export function CardContent({className="",...p}){return <div className={`p-4 ${className}`} {...p}/>;}
export default Card;
