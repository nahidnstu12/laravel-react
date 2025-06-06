import { useRef } from 'react';

interface DateRangeInputProps {
    label: string;
    value: {
        from: string | undefined;
        to: string | undefined;
    };
    onChange: (value: { from: string | undefined; to: string | undefined }) => void;
    name: string;
}

// NOTE: Add this CSS globally to hide the browser's default calendar icon:
// input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0; display: none; }
// input[type="date"]::-ms-input-placeholder { color: #fff; }
// input[type="date"]::-webkit-input-placeholder { color: #fff; }
// input[type="date"]::-moz-placeholder { color: #fff; }
// input[type="date"]:-ms-input-placeholder { color: #fff; }
// input[type="date"]::placeholder { color: #fff; }

export default function DateRangeInput({ label, value, onChange, name }: DateRangeInputProps) {
    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor={name} className="text-right">
                {label}
            </label>
            <div className="col-span-3 flex gap-2">
                <div className="relative w-full">
                    <input
                        ref={fromInputRef}
                        type="date"
                        className="input input-bordered w-full bg-white pr-3 text-black"
                        value={value.from || ''}
                        onChange={(e) => onChange({ ...value, from: e.target.value })}
                        name={`${name}_from`}
                        placeholder="From date"
                    />
                   
                </div>
                <div className="relative w-full">
                    <input
                        ref={toInputRef}
                        type="date"
                        className="input input-bordered w-full bg-white pr-3 text-black"
                        value={value.to || ''}
                        onChange={(e) => onChange({ ...value, to: e.target.value })}
                        name={`${name}_to`}
                        placeholder="To date"
                        min={value.from || undefined}
                    />
                    {/* <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                            <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 18H5V8h14v12zm0-14H5V6h14v2z"/>
                        </svg>
                    </span> */}
                </div>
            </div>
        </div>
    );
}
