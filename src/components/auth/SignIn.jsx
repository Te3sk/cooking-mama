import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from "../../base.js"

function SignIn() {

    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, psw)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <form onSubmit={signIn}>
                <h1>Log in in your account</h1>
                <input
                    class="border-2"
                    type="email"
                    placeholder='enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    class="border-2"
                    type="psw"
                    placeholder='enter your psw'
                    value={psw}
                    onChange={(e) => setPsw(e.target.value)} />
                <button type='submit' class="border-2">Log In</button>
            </form>
        </div>
    )
}

export default SignIn;