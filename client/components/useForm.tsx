import { useState, useCallback, useMemo } from 'react';

export const useForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });

  // Handle input changes
  const handleInputChange = useCallback((event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  // Validations
  const validateForm = useCallback(() => {
    const newErrors = {
      username: '',
      password: '',
    };

    let valid = true;

    // Username validation
    if (formData.username.length > 12) {
      newErrors.username = 'Username must be 12 characters or fewer!';
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be longer than 8 characters, contain a number and a special character!';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  }, [formData]);

  const isFormFilled = useCallback(() => {
    return formData.username.trim() !== '' && formData.password.trim() !== '';
  }, [formData]);

  const formMethods = useMemo(
    () => ({
      setFormData,
      setFormErrors,
      handleInputChange,
      validateForm,
      isFormFilled,
    }),
    [handleInputChange, validateForm, isFormFilled],
  );

  return {
    formData,
    formErrors,
    ...formMethods,
  };
};