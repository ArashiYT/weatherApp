import { forwardRef } from 'react';
import "../assets/css/Input.css";

const InputComponent = forwardRef<HTMLInputElement | null, TInputProps>(({ onclick }, ref) => {
    return (
        <article className="input">
            <input type="text" id="town" placeholder="Enter the town..." ref={ref} />
            <button className="button" onClick={onclick}>Search</button>
        </article>
        )
    })
    
export type TInputProps = { onclick: () => void; }
export default InputComponent;