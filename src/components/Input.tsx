import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocation } from '@fortawesome/free-solid-svg-icons';
import React, { forwardRef, useRef } from 'react';
import "../assets/css/Input.css";

const InputComponent = forwardRef <IInputRef | null, TInputProps> (({ onclick, getLocation, errorMessage, disabled, geolocationOff}, ref) => {
    const town = useRef <HTMLInputElement | null> (null)
    const parent = useRef <HTMLElement | null> (null)
    const placeholder = "Enter the town...";

    React.useImperativeHandle<IInputRef, IInputRef>(ref, () => ({
        getParentElement: () => parent.current,
        getTownName: () => town.current?.value ?? null,
        resetTownName: () => {
            if(town.current) town.current.value = ""
        }
    }))

    return (
        <article className="input" ref={parent}>
            <div className="space"></div>
            <div className="input-field">
                <div className="errorMessage">{errorMessage?.message}</div>
                <input 
                    id="town" ref={town} type="text" className={`input-text ${errorMessage?.inputError ? 'error' : ''}`.trim()}
                    placeholder={placeholder} autoComplete="off" disabled={disabled}
                    onFocus={e => e.target.placeholder = ""} 
                    onBlur={e => e.target.placeholder = placeholder}
                />
            </div>
            <div className="buttons">
                <button className="button" onClick={() => onclick()} disabled={disabled}>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Search</span>
                </button>
                <button className="button" onClick={() => getLocation()} disabled={disabled || geolocationOff}>
                    <FontAwesomeIcon icon={faLocation} />
                    <span>Get Location</span>
                </button>
            </div>
        </article>
        )
    })
    
export type TInputProps = { 
    onclick: () => Promise<void>; 
    getLocation: () => Promise<void>; 
    errorMessage: IErrorResponse | null; disabled: boolean;
    geolocationOff: boolean; 
}

export default InputComponent;