import { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,

    setUser: () => { },
    setToken: () => { },
    setNotification: () => { },
    getUsers: () => [],
    saveUser: () => { },
    deleteUser: () => { },
    authenticateUser: () => null,
    getUserByEmail: () => null,
    getUserById: () => null,
})

// Helper functions to manage users in localStorage
const getUsersFromStorage = () => {
    const users = localStorage.getItem('APP_USERS');
    return users ? JSON.parse(users) : [];
}

const saveUsersToStorage = (users) => {
    localStorage.setItem('APP_USERS', JSON.stringify(users));
}

export const ContextSource = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('CURRENT_USER');
        return storedUser ? JSON.parse(storedUser) : {};
    });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('CURRENT_USER');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const setToken = (token) => {
        _setToken(token)
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }else {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('CURRENT_USER');
            setUser({});
        }
    }

    const setUserState = (userData) => {
        setUser(userData);
        if (userData && Object.keys(userData).length > 0) {
            localStorage.setItem('CURRENT_USER', JSON.stringify(userData));
        } else {
            localStorage.removeItem('CURRENT_USER');
        }
    }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('');
        }, 5000);
    }

    const getUsers = () => {
        const users = getUsersFromStorage();
        // Return users without passwords for display
        return users.map(({ password, ...user }) => user);
    }

    const getUserByEmail = (email) => {
        const users = getUsersFromStorage();
        const user = users.find(u => u.email === email);
        return user ? { ...user, password: undefined } : null;
    }

    const getUserById = (id) => {
        const users = getUsersFromStorage();
        const user = users.find(u => u.id === Number(id));
        return user ? { ...user, password: undefined } : null;
    }

    const authenticateUser = (email, password) => {
        const users = getUsersFromStorage();
        const user = users.find(u => u.email === email && u.password === password);
        return user ? { ...user, password: undefined } : null;
    }

    const saveUser = (userData) => {
        const users = getUsersFromStorage();
        
        if (userData.id) {
            // Update existing user
            const index = users.findIndex(u => u.id === userData.id);
            if (index !== -1) {
                // Update user fields
                const updatedUser = { ...users[index] };
                
                // Update name and email if provided
                if (userData.name !== undefined) updatedUser.name = userData.name;
                if (userData.email !== undefined) updatedUser.email = userData.email;
                
                // Only update password if provided
                if (userData.password) {
                    updatedUser.password = userData.password;
                }
                
                users[index] = updatedUser;
            }
        } else {
            // Create new user (signup or new user form)
            const newUser = {
                id: Date.now(), // Simple ID generation
                name: userData.name,
                email: userData.email,
                password: userData.password,
                created_at: new Date().toISOString().split('T')[0],
            };
            users.push(newUser);
        }
        saveUsersToStorage(users);
    }

    const deleteUser = (userId) => {
        const users = getUsersFromStorage();
        const filtered = users.filter(u => u.id !== userId);
        saveUsersToStorage(filtered);
    }

    return(
        <StateContext.Provider value={{
            user,
            setUser: setUserState,

            token,
            setToken,

            notification,
            setNotification,

            getUsers,
            saveUser,
            deleteUser,
            authenticateUser,
            getUserByEmail,
            getUserById,
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);