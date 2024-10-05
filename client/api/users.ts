import type { InsertUser, UpdateUser, DeleteUser } from "@/shared/userSchema";

export const fetchUsers = async () => {
    const response = await fetch('/api/users');
    return response.json();
  };
  
  export const createUser = async (user: InsertUser) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
  
  export const updateUser = async (user: UpdateUser) => {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
  
  // Delete user (new function)
export const deleteUser = async (user: DeleteUser) => {
    const response = await fetch(`/api/users/${user}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  
    return response.json();
  };