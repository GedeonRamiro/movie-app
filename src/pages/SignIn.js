import { useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from '../context/auth'

const SignIn = () => {

    const auth = useAuth()

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    console.log(email)

    const handleSignIn = async (e) => {
        e.preventDefault()

       const signIn = await auth.login(email)

       if(signIn.error) {
           console.log(signIn)
           setMessage(signIn.error.message)
       } else {
           setMessage('Link enviado para o E-mail')
       }

       setEmail('')

    }


    return (
        <Layout>
            {message && message}
            <form onSubmit={handleSignIn} className="form-control">
                <label className="label">
                    <span className="label-text">Connected com E-mail</span>
                </label> 
                <div className="relative">
                    <input 
                        onChange={e => setEmail(e.target.value)} 
                        type="text" 
                        placeholder="E-mail" 
                        className="w-full pr-16 input input-neutral-focus input-bordered" 
                    /> 
                    <button type={'submit'} className="absolute top-0 right-0 rounded-l-none btn btn-neutral">go</button>
                </div>
            </form>  
        </Layout>
    )
}

export default SignIn