import { createFileRoute } from '@tanstack/react-router'

import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { useForm } from "../components/useForm";
import { Page } from '../components/Page';
import axios from 'axios'

export const Route = createFileRoute('/login')({
  component: () => {
    const { formData, formErrors, ...formMethods } = useForm();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      const isValid = formMethods.validateForm();
  
      if (isValid) {
  
        try {
          await axios.post('https://sheetdb.io/api/v1/79fo2g87zoqgy', formData);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Form has errors.');
      }
    };
  
    return (
      <Page>
      <div className="flex items-center justify-center min-h-screen">
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col items-center justify-center w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-lg bg-white"
          >
            <h3 className="heading mb-6">Login</h3>

            <label className="mb-2">Username:</label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              maxLength={12}
              value={formData.username}
              onChange={formMethods.handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded" 
            />
            {formErrors.username && <span className="errorMessage mb-4 text-red-600">{formErrors.username}</span>}

            <label className="mb-2">Password:</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={formMethods.handleInputChange}
              className="mb-4 p-2 border border-gray-300 rounded" 
            />
            {formErrors.password && <span className="errorMessage mb-4 text-red-600">{formErrors.password}</span>}

            <Button type="submit" className="w-full p-2 border border-gray-300 rounded bg-blue-500 text-white" disabled={!formMethods.isFormFilled()}>
              Login
            </Button>
          </form>
        </div>
    </Page>
    );  

}

})

