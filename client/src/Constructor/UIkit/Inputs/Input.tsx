import React, { useState } from 'react'
import { RequiredIcon } from '../Icons.tsx';

export interface IInput {
    isRequired: boolean,
    title: string,
    isLittle: boolean,
    value?: any,
    onchange?: any,
    type?: string,
    onblur?: any,
    length?: number,
    valid?: boolean,
}

function Input(props: IInput) {
    const { isRequired, title, isLittle, value, onchange, type, onblur, length, valid } = props;
    const [isFocused, setFocused] = useState(false)
    return (
        <div className="input">
            {
                !isLittle &&
                <div className="input__label label">
                    {title}
                    {
                        isRequired && <RequiredIcon />
                    }
                </div>
            }
            <div className={`input__container ${isFocused ? 'input__container_focused' : ''}`}>
                <input
                    min={0}
                    type={type || 'text'}
                    value={value}
                    onFocus={() => setFocused(true)}
                    onBlur={(e) => {
                        // e.target.value.trim().replace(/\'/g, '"')
                        onchange(e.target.value.trim().replace(/\'/g, '"'));
                        // console.log(e.target.value.trim())
                        onblur && onblur()
                        setFocused(false);
                    }}
                    onChange={(e) => onchange(e.target.value)}
                    className={`input__field${isLittle ? ' input__field_small' : ''}`}
                    required={isRequired}
                    placeholder={isLittle ? title : ''}
                    maxLength={length}
                />

            </div>
            {
                valid && <div className="input__validation">Поле обязательно</div>
            }
        </div>
    )
}

export default Input