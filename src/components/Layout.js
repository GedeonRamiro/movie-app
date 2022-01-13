import { Link } from "react-router-dom"

const Layout = ( {children} ) => {
    return (
        <>
        <nav className="items-center mb-2 shadow-lg navbar bg-neutral text-neutral-content">
            <div className="flex-none px-2 mx-2">
                <span className="text-lg font-bold">
                    Movie-App
                </span>
            </div> 
            <div className="flex-1 px-2 mx-2">
                <div className="items-stretch hidden lg:flex">
                    <Link className="btn btn-ghost btn-sm rounded-btn no-animation"  to={'/'}> Home </Link>
                    <Link className="btn btn-ghost btn-sm rounded-btn no-animation" to={'/sign-in'}> SignIn </Link>
                </div>
            </div> 
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">             
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>             
                </svg>
                </button>
            </div>
        </nav>
        {children}
        </>

    )
}

export default Layout