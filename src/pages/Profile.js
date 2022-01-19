import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from "../context/auth"
import { supabase } from "../services/supabase"
import { toast } from 'react-toastify';


const Profile = () => {

    const auth = useAuth()
    const [movies, setMovies] = useState([])
    const [loading, setLoading] =useState(false)

    const getWatchList = async () => {
        
        try {
            const {data, error} = await supabase.from('watchlists')
            .select('movie_id')
            .match({user_id: auth.user.id})
            
            if(error) {
                console.log({error})
            }
            if(data){
                
                const promises = data.map(async (movie) => {
                    const result = new Promise((resolve, reject) => {
                        resolve(axios.get(`https://api.themoviedb.org/3/movie/${movie.movie_id}`, {
                            params: {
                                api_key: '6b6ae76e6d9c5a01035fc17ae4f4a0df'
                            }
                        }))
                    });
                    return result
                })
                
                const dataPromise = await Promise.all(promises)
                setMovies(dataPromise.map(movie => movie.data))
                setLoading(true)
            }
            
        } catch (error) {
            console.log({error})
        }
        
        

    }

    const removeFromWatchList = async (id) => {

        const { error } = await supabase.from('watchlists')
            .delete()
            .match({movie_id: id, user_id: auth.user.id})

        if(error){
            console.log({error})
        }
        toast.success('Filme removido sucesso!')
        getWatchList()
        

    } 
            
    

    useEffect(() => {
        getWatchList()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout>
            <h1 className='my-10 text-xl font-bold text-center uppercase sm:my-20'> Meus Filmes</h1>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {movies.length > 0 && movies.map(movie => (
                    <div key={movie.id} className="text-center shadow-2xl card">
                        <figure className="px-10 pt-10">
                            <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} className="rounded-lg" />
                        </figure> 
                        <div className="card-body">
                            <h2 className="card-title">{movie.title}</h2> 
                            <p>Popularidade: {movie.popularity}</p> 
                            <div className="justify-center card-actions">
                            <button onClick={() => removeFromWatchList(movie.id)} className="btn btn-outline btn-neutral">Remover Filme</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!loading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <button class="btn btn-sm btn-ghost loading">loading</button>
                </div>
            )}
            {movies.length < 1 && loading && (
                <div className='flex flex-col items-center'>
                     <div className='mb-10 text-lg font-semibold text-center'>Lista vazia!</div>
                 </div>
            )}
        </Layout>
    )
}

export default Profile