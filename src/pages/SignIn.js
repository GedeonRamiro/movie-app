import { useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from '../context/auth'

const SignIn = () => {

    const auth = useAuth()

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    console.log(message)

    const handleSignIn = async (e) => {
        e.preventDefault()

       const signIn = await auth.login(email)
      

       if(signIn.error) {
           setMessage(signIn.error.message)
       } else {
           setMessage('Link enviado para o E-mail')
       }

       setEmail('')

    }


    return (
        <Layout>

            {message && (
                <div className="mt-10 alert alert-info">
                    <div className="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
                    </svg> 
                    <label>{message}</label>
                    </div>
               </div>
              
            )}
            <form onSubmit={handleSignIn} className="mt-10 form-control">
                <label className="label">
                    <span className="label-text">Conectar com E-mail</span>
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