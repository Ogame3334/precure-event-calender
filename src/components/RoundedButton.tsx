import { ReactNode } from "react";

export default function RoundedButton({onClick, children}: {onClick: Function, children: ReactNode}) {
    return (<button 
    className="bg-pink-400 hover:bg-pink-500 w-10/12 text-white rounded-full px-4 py-2 border border-black my-5 mx-10 active:bg-pink-600" 
    onClick={()=>{onClick()}}
    role="button"
    >
    {children}
    </button>
    )
}
