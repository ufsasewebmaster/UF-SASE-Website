import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/users';
import type { InsertUser, UpdateUser } from '@/shared/userSchema';

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users query
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Mutation for creating a new user
  const createUserMutation = useMutation({
    mutationFn: async (newUser: InsertUser) => {
      return createUser(newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Mutation for updating an existing user
  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: UpdateUser) => {
      return updateUser(updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Mutation for deleting a user
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: usersQuery,
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    deleteUser: deleteUserMutation,
  };
};
