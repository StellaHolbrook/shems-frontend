// Contexts.js
import React, {createContext, useState} from 'react';

// global state todos:
const TodosContext = createContext({
    todos: [], fetchTodos: () => {}
})

//authentication
export const AuthContext = createContext(null);

//user to display for the database query
export const CurrentUserContext = createContext(null);

//function to manage logged-in user // -- should i export to log in?
export default function MyApp() {
    const [currentUser, setCurrentUser] = useState(null);
    return (
        <CurrentUserContext.Provider
            value={{
                currentUser,
                setCurrentUser
            }}
        >
        </CurrentUserContext.Provider>
    );
}

function GetName() {
    const [name, setName] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`name is: ${name} `);
    }
    return(
        <form  onSubmit={handleSubmit}>
            <input className="rect_form"
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
            />
        </form>
    )
}
export default GetName;

//component todos
export default function Todos() {
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/todo")
        const todos = await response.json()
        setTodos(todos.data)
    }
}

// get address, fetch address, get all addresses associated with a user, you have to fetch the user id from the flask backend

useEffect(() => {
    fetchAddresses()
}, [])

return (
    <TodosContext.Provider value={{todos, fetchTodos}}>
            {Addresses.map((Address) => (
                {} ))}
    </TodosContext.Provider>
)