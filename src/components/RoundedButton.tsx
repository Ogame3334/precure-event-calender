import { ReactNode } from "react";

export default function RoundedButton({onClick, children}: {onClick: Function, children: ReactNode}) {
    return (<button 
    className="round-button w-11/12 rounded-full px-4 py-2 border my-5 mx-auto" 
    onClick={()=>{onClick()}}
    role="button"
    >
    {children}
    </button>
    )
}
