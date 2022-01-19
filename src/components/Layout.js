import { Link } from "react-router-dom"
import { useAuth } from "../context/auth"

const Layout = ( {children} ) => {

    const auth = useAuth()

    return (
        <>
        <div className="h-screen shadow bg-base-200 drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="flex flex-col drawer-content">
                <div className="w-full text-white navbar bg-neutral">
                <div className="flex-none sm:hidden">
                    <label for="my-drawer-3" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    </label>
                </div> 
                <div className='container mx-auto'>
                <div className="flex-none px-2 mx-2">
                    <span className="text-lg font-bold">
                        Movie-App
                    </span>
                </div> 
                <div className="flex-1 px-2 mx-2">
                    <div className="items-stretch hidden sm:flex">
                        <Link className="btn btn-ghost btn-sm rounded-btn no-animation"  to={'/'}> Home </Link>
                        <Link className="btn btn-ghost btn-sm rounded-btn no-animation" to={'/profile'}> Meus Filmes </Link>
                        {auth.user ? (
                            <button onClick={auth.logout} className="ml-3 btn btn-error btn-sm rounded-btn no-animation" to={'/sign-in'}> Sair </button>
                            ) : (
                            <Link className="btn btn-ghost btn-sm rounded-btn no-animation" to={'/sign-in'}> Entrar </Link>
                        )}
                    </div>
                </div> 
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">             
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
                    </svg>
                    </button>
                </div>
            </div> 
               
                </div>
                <div className='container mx-auto'>
                    <div className='mx-2'>
                        {children}
                    </div>
                </div>
            </div> 
            <div className="drawer-side">
                <label for="my-drawer-3" className=" drawer-overlay"></label> 
                <ul className="p-4 overflow-y-auto bg-gray-100 menu w-80">
                    <Link className="my-2 btn btn-ghost btn-sm rounded-btn no-animation"  to={'/'}> Home </Link>
                    <Link className="my-2 btn btn-ghost btn-sm rounded-btn no-animation" to={'/profile'}> Meus Filmes </Link>
                    {auth.user ? (
                        <button onClick={auth.logout} className="my-2 ml-3 btn btn-error btn-sm rounded-btn no-animation" to={'/sign-in'}> Sair </button>
                        ) : (
                        <Link className="my-2 btn btn-ghost btn-sm rounded-btn no-animation" to={'/sign-in'}> Entrar </Link>
                    )}
                </ul>
            </div>
        </div>
        </>

    )
}

export default Layout