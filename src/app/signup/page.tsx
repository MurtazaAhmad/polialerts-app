"use client";
import React from 'react'
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config'

interface Props { }

const Signup = (props: Props) => {

    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    // Calling Hook - Returns array 
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(email, password);

        try {

            const res = await createUserWithEmailAndPassword(email, password)
            console.log("res: ", res);
            // const user = userCredential?.user
            // console.log(user)

        } catch (error: any) {
            console.log("ERROR!");
            console.log(error.message)
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Signup