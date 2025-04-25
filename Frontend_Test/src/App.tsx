import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";
import useTodos from "./hooks/useTodos";
import Nav from "./components/nav";

function App() {
  const {
    todos,
    addTodo,
    setTodoComplete,
    deleteTodo,
    deleteAllCompleted,
  } = useTodos();
  return (
    <main className="py-10 h-screenc space-y-5">
      <Nav/>
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addTodo} />
        <TodoList
          todos={todos}
          onCompleteChange={setTodoComplete}
          onDelete={deleteTodo}
        />
      </div>
      <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompleted} />

    </main>
  );
}

export default App;
