import { forwardRef } from 'react';
import "../assets/css/Input.css";

const InputComponent = forwardRef<HTMLInputElement | null, TInputProps>(({ onclick, getLocalization }, ref) => {
    const placeholder = "Enter the town...";

    return (
        <article className="input">
            <input 
                id="town" ref={ref} type="text" 
                placeholder={placeholder} 
                onFocus={e => e.target.placeholder = ""} 
                onBlur={e => e.target.placeholder = placeholder}
            />
            <div className="buttons">
                <button className="button" onClick={onclick}>Search</button>
                <button className="button" onClick={getLocalization}>Get Localication</button>
            </div>
        </article>
        )
    })
    
export type TInputProps = { onclick: () => void; getLocalization: () => void }
export default InputComponent;