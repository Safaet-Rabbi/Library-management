import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import Loader2 from '../components/Loader2';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const librarianEmail = import.meta.env.VITE_LIBRARIANEMAIL;

    // Mock function to simulate user registration
    const userRegister = (email, password) => {
        return new Promise((resolve, reject) => {
            // Simulate user creation
            setTimeout(() => {
                const newUser = { email, password, displayName: "User" };
                setUser(newUser);
                resolve(newUser);
            }, 1000);
        });
    };

    // Mock function to simulate user login
    const userLogin = (email, password) => {
        return new Promise((resolve, reject) => {
            // Simulate user login
            setTimeout(() => {
                const loggedInUser = { email, password, displayName: "User" };
                setUser(loggedInUser);
                resolve(loggedInUser);
            }, 1000);
        });
    };

    // Mock function to simulate Google login
    const googleLogIn = () => {
        return new Promise((resolve, reject) => {
            // Simulate Google login
            setTimeout(() => {
                const googleUser = { email: "googleuser@example.com", displayName: "Google User" };
                setUser(googleUser);
                resolve(googleUser);
            }, 1000);
        });
    };

    // Mock function to simulate user logout
    const userLogOut = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setUser(null);
                resolve();
            }, 1000);
        });
    };

    // Mock function to simulate user profile update
    const userProfileUpdate = (name, photo) => {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject("No user is logged in.");
            } else {
                // Simulate profile update
                setTimeout(() => {
                    const updatedUser = { ...user, displayName: name, photoURL: photo };
                    setUser(updatedUser);
                    resolve(updatedUser);
                }, 1000);
            }
        });
    };

    useEffect(() => {
        // Simulate checking for an existing session (e.g., from local storage)
        setTimeout(() => {
            setUser(null); // No user is logged in by default
            setLoading(false);
        }, 1000);
    }, []);

    const AuthData = { librarianEmail, user, userRegister, userLogin, userLogOut, googleLogIn, userProfileUpdate };

    if (loading) {
        return <Loader2></Loader2>;
    }

    return (
        <AuthContext.Provider value={AuthData}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;
