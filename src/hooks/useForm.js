import { useState } from 'react';


export const useForm = (intialValue = {}) => {

  const [value, setValue] = useState(intialValue);

  //Resetea el formulario.
  const resetForm = () => setValue(intialValue) 
  
  // Cargamos valores al formulario
  const handleChange = ({ target }) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  return [value, handleChange, resetForm];
};