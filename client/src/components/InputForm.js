import React, { memo } from 'react';

import classNames from "classnames/bind";
import styles from "./InputForm.module.scss";
const cx = classNames.bind(styles);

const InputForm = ({label, type, value, setValue,invalidFields, setInvalidFields, types}) => {
    return (
        <div className={cx("input")}>
            <label htmlFor='phone' style={{color:'#000'}}>{label}</label>
            <input 
            id='phone'
            type= {types}
            value={value}
            onChange={(e) => setValue(prev =>({...prev, [type]: e.target.value}))}
            onFocus={()=> setInvalidFields([])}
            />
            {invalidFields.length > 0 && invalidFields.some(i=>i.name ===type)&& <small style={{color: 'red', textAlign:'start', fontWeight:'500',fontStyle:'italic'}}>{invalidFields.find(i => i.name === type)?.message}</small>}
        </div>
    );
}

export default memo(InputForm);
