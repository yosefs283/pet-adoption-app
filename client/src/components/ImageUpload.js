import React, { useState } from 'react'

function ImageUpload({ value,handleChange }) {
    return (
        <input name='image' value={value} type='file' accept='.img,.png,.jpeg' onChange={handleChange} />

    )
}

export default ImageUpload