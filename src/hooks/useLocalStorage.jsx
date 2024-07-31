import React, { useEffect, useState } from 'react'

const useLocalStorage = (key,data) => {

    const storedValue = JSON.parse(localStorage.getItem(key)) || data;
    const [value,setValue] = useState(storedValue);

    useEffect(() => {
        localStorage.setItem(key , JSON.stringify(value))    
    }, [key,value]);


  return [value,setValue]
}



export default useLocalStorage