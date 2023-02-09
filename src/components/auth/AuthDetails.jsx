import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth } from '../../base.js';

const AuthDetails = () => {

    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out succesfully');
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>{authUser ?
            <>
                <p>{`Sign In as ${authUser.email}`}</p>
                <button onClick={userSignOut} class="border-2">Sign out</button>
            </>
            : <p> Signed Out </p>}</div>
    )
}

export default AuthDetails;