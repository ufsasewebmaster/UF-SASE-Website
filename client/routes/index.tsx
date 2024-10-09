import { createFileRoute } from "@tanstack/react-router";

export const Route  = createFileRoute('/')({
  component: () => {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-background p-4 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
        <form onSubmit={handleSubmit} className="mb-4 flex items-center">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="mr-2 flex-1 rounded-md border border-muted p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Add
          </Button>
        </form>
        {todos.isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <p className="text-center">Loading...</p>
          </div>
        ) : todos.isError ? (
          <p className="text-center text-red-500">Error fetching todos</p>
        ) : (
          <div className="space-y-2">
            {todos.data?.todos ? (
              todos.data.todos.length === 0 ? (
                <p className="text-center text-muted-foreground">No todos</p>
              ) : (
                todos.data.todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between rounded-md bg-card p-2"
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={todo.completed}
                        className="mr-2"
                        onCheckedChange={() =>
                          handleComplete({
                            id: todo.id,
                            completed: !todo.completed,
                          })
                        }
                      />
                      <span
                        className={`text-card-foreground ${todo.completed ? "text-muted-foreground line-through" : ""}`}
                      >
                        {todo.title}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(todo.id)}
                      className="text-muted-foreground hover:bg-muted/50"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )
            ) : null}
          </div>
        )}
      </div>
    )
  },
})