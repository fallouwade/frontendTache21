import { div } from "motion/react-client";

export default function CardMessage({title,children}) {
    return (
       <div className="flex gap-2 me-10 py-1.5 px-2 bg-white rounded">
        <div className="flex items-center font-semibold bg-blue-700 px-2 rounded text-white">{children}</div>  
        <span className="font-bold text-lg">{title}</span>  
       </div>
    )
}