import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocation } from '@fortawesome/free-solid-svg-icons';
import React, { forwardRef, useRef } from 'react';
import "../assets/css/Input.css";

const InputComponent = forwardRef <IInputRef | null, TInputProps> (({ onclick, getLocation }, ref) => {
    const town = useRef <HTMLInputElement | null> (null)
    const parent = useRef <HTMLElement | null> (null)
    const placeholder = "Enter the town...";

    React.useImperativeHandle<IInputRef, IInputRef>(ref, () => ({
        getParentElement: () => parent.current,
        getTownName: () => town.current?.value ?? null
    }))

    return (
        <article className="input" ref={parent}>
            <input 
                id="town" ref={town} type="text" 
                placeholder={placeholder} 
                onFocus={e => e.target.placeholder = ""} 
                onBlur={e => e.target.placeholder = placeholder}
            />
            <div className="buttons">
                <button className="button" onClick={() => onclick()}>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Search</span>
                </button>
                <button className="button" onClick={() => getLocation()}>
                    <FontAwesomeIcon icon={faLocation} />
                    <span>Get Location</span>
                </button>
            </div>
        </article>
        )
    })
    
export type TInputProps = { onclick: () => Promise<void>; getLocation: () => Promise<void> }
export default InputComponent;