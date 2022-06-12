import React from 'react'

function FormSelect({labelText,name,value,handleChange,petList}) {
    return (
        <div className='form-row' >
            <label htmlFor={name} className='form-label'  >{labelText || name}</label>
            <select name={name} value={value} onChange={handleChange} className='form-select'>
                {petList.map((pet, index) => {
                    return <option key={index} value={pet}>{pet}</option>
                })}
            </select>
        </div>
    )
}

export default FormSelect