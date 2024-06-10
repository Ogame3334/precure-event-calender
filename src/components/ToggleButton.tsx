interface ToggleButtonProperty {
  id: string;
  color: string;
  onChange: Function;
  className: string;
}

export default function ToggleButton(props: ToggleButtonProperty) {
  return (
    <div className={"inline-flex items-center" + props.className}>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onChange={(e)=>{props.onChange(e.target.checked);}} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600" onClick={(e) => e.stopPropagation()}></div>
      </label> 
    </div>
  )
}
