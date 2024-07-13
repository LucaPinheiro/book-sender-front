import { CaretDown } from '@phosphor-icons/react'

export function RadioContainer({ label, value, selectedValue, onChange }:any){
    return (
        <div 
            className={`w-64 cursor-pointer p-3 border-2 rounded-md inline-block duration-300 m-1 ${selectedValue === value ? 'border-red-500' : ''}`} 
            onClick={() => onChange(value)}
        >
            <div className="flex items-center justify-between">
                <label className="font-bold text-xl">{label}</label>
                <input 
                    type="radio" 
                    value={value}
                    checked={selectedValue === value} 
                    onChange={() => onChange(value)}
                />
            </div>
            <div className='flex items-center justify-center mt-6'>
                <label>Ver Lista</label>
                <CaretDown size={16} />
            </div>
        </div>
    )
}