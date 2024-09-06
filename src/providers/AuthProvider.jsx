/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import auth from '../Config/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); 
    }

    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); 
    }

    const userSignOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false)); 
    }

    const userUpdateProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        }).then(() => {
            setUser(prevUser => ({
                ...prevUser,
                displayName: name,
                photoURL: photoURL,
            }));
        }).finally(() => setLoading(false)); 
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        setUser,
        createUser,
        userSignIn,
        userSignOut,
        userUpdateProfile,
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
export default AuthProvider;