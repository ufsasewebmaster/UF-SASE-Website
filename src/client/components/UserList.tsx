// import { Button } from "@client/components/ui/button";
// import type { SelectUser, UpdateUser } from "@schema/userSchema";
// import { useUsers } from "../hooks/useUsers";

// export const UserList = () => {
//   // TODO
//   const { updateUser, users } = useUsers("");
//   if (!users) return;
//   // Handle loading state
//   if (users.isLoading) {
//     return (
//       <div className="flex h-32 items-center justify-center">
//         <p className="text-center">Loading...</p>
//       </div>
//     );
//   }
//   // Handle error state
//   if (users.isError) {
//     return <p className="text-center text-red-500">Error fetching users</p>;
//   }
//   // Handle case when there are no users
//   if (!users.data) {
//     return <p className="text-center text-muted-foreground">No users</p>;
//   }
//   return (
//     <div className="space-y-2">
//       {Array.isArray(users.data) ? (
//         (users.data as Array<SelectUser>).map((user: SelectUser) => (
//           <div key={user.id as string | null} className="flex items-center justify-between rounded-md bg-card p-2">
//             <div className="flex items-center">
//               <span className="text-card-foreground">
//                 {user.username as string} - {user.roles as string}
//               </span>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() =>
//                 updateUser.mutate({
//                   id: user.id,
//                   roles: user.roles === "admin" ? "user" : "admin",
//                 } as UpdateUser)
//               }
//               className="text-muted-foreground hover:bg-muted/50"
//             >
//               Toggle Role
//             </Button>
//           </div>
//         ))
//       ) : (
//         <div>No users available</div>
//       )}
//     </div>
//   );
// };
