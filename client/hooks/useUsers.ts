import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/users'; // Replace with user API functions
import type { InsertUser, UpdateUser } from '@/shared/userSchema'; // Adjust to user schema
import { userInsertSchema, updateUserSchema } from '@/shared/userSchema'; // Adjust to user schema

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
      userInsertSchema.parse(newUser);
      return createUser(newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Mutation for updating an existing user
  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: UpdateUser) => {
      // Validate using Zod schema
      updateUserSchema.parse(updatedUser);
      return updateUser(updatedUser); // Adjust to user API
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Mutation for deleting a user
  const deleteUserMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteUser({ id }), // Adjust the type of id if necessary (likely string for user ID)
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
