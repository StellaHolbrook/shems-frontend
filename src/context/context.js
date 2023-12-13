// Contexts.js
import React, {createContext, useState} from 'react';

//authentication
export const AuthContext = createContext(null);

//user to display for the database query
export const CurrentUserContext = createContext(null);

//function to manage logged-in user
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
