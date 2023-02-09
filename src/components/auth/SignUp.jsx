import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from "../../base.js"

function SignUp() {

    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, psw)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                console.log(error)
            })
        e.target.value = "";
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <h1>Create a new account</h1>
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
                <button type='submit' class="border-2">Sign up</button>
            </form>
        </div>
    )
}

export default SignUp;