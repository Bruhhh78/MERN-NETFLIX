import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Row = (props) => {


    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        axios.get(props.fetchURL).then((res)=>{
            setMovies(res.data.results)
        })
    }, [props.fetchURL])

    console.log(movies)
    

  return (
    <>
    <h2 className='text-white font-bold md:text-xl p-4'>{props.title}</h2>
    <div className='relative flex items-center'>
        <div id={'slider'}>

        </div>
    </div>
    </>  
  )
}

export default Row