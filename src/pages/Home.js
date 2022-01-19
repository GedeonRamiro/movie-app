import Layout from "../components/Layout"
import axios from 'axios'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { supabase } from "../services/supabase"
import { useAuth } from "../context/auth"
import { Link } from "react-router-dom";

const Home = () => {

    const auth = useAuth()

    const [movies, setMovies] = useState([])
  
    const getMovies =  async () => {
        const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                page: Math.random() * 501,
                api_key: '6b6ae76e6d9c5a01035fc17ae4f4a0df'
            }
        })

        setMovies(data.results)
    }

    const addToWatchList = async (movie) => {
        console.log(movie.id)
        const { data, error, status } = await supabase.from('watchlists')
            .insert({movie_id: movie.id, user_id: auth.user.id})

            if(error){
                console.log(error)
            }

            if(data) {
                toast.success('Filme adicionado com sucesso!')
            }

            if(status === 409){
                toast.error('Esse filme já está na sua lista!')
            }

    } 

    const refresh = () => getMovies()

    useEffect(() => {
        if(auth.user){
            getMovies()
        }
    }, [])

    return (
        <Layout>
            <div className="mt-10">
                {auth.user && (
                    <>
                        {movies.length > 1 ? (
                            <div className='flex justify-center'>
                                <button onClick={refresh} class="btn btn-wide text-center">Atualizar Lista</button> 
                            </div>
                        ) : (
                            <div className='flex justify-center'>
                                <button onClick={refresh} class="btn btn-wide text-center loading">loading</button> 
                            </div>     
                        )}
                        {movies.map(movie => (
                            <div key={movie.id} className="my-10 shadow-md card md:card-side card-bordered">
                                <figure  className="px-6">
                                    <img className='rounded-lg' src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
                                </figure> 
                                <div className="card-body">
                                    <h2 className="card-title">{movie.title}</h2> 
                                    <p>{movie.overview}</p> 
                                    <div className="justify-end card-actions">
                                    <button onClick={() => addToWatchList(movie)} className="btn btn-neutral">add favoritos</button>
                                    </div>
                                </div>
                            </div> 
                        ))}
                    </>
                )}
                {!auth.user && (
                <div className="mt-40 hero bg-base-200">
                    <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            Movie-App
                        </h1> 
                        <p className="mb-5">
                           Use seu E-mail para acessar e encontre todos os Filmes que você procura.
                        </p>
                        <Link to={'/sign-in'}>
                            <button className="btn">
                                Entrar agora
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 ml-2 stroke-current">  
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>                        
                                </svg>
                            </button> 
                        </Link> 
                    </div>
                    </div>
                </div>
                )}
            </div>
        </Layout>
    )
}

export default Home