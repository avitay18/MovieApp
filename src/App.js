import React,{ useState , useEffect } from "react";

const api_search={
  base: 'https://api.themoviedb.org/3/search/movie',
  key: '3be0cc54660ae3d1e2796710f99cdf9b'
}
const image_api='https://image.tmdb.org/t/p/w200'

//https://api.themoviedb.org/3/search/movie?api_key=3be0cc54660ae3d1e2796710f99cdf9b&query=Inception


function App() {
  
  const [inception,setInception]=useState({})
  const [interstellar,setInterstellar]=useState({})
  const [movie,setMovie]=useState({})
  const [query,setQuery]=useState('')

  useEffect(() =>{
    fetch(`${api_search.base}?api_key=${api_search.key}&query=inception`)
    .then(res=>res.json())
    .then(result=>{
      setInception(result)
      console.log(result)
    })},[])
  useEffect(() =>{
    fetch(`${api_search.base}?api_key=${api_search.key}&query=interstellar`)
    .then(res=>res.json())
    .then(result=>{
      setInterstellar(result)
      console.log(result)
    })},[])

  const search = (e) =>{
    if(e.key === 'Enter'){
      fetch(`${api_search.base}?api_key=${api_search.key}&query=${query}`)
      .then(res=>res.json())
      .then(result => {
        setQuery('')
        setMovie(result)
        console.log(result)
      })
    }
  }
  
  return (
    <div className='app'>
    <div className='search-box'>
      <input 
        type='text'
        className='search-bar'
        placeholder='Enter a movie..'
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      ></input>
    </div>
    {movie.total_results > 0 ?(
    <div>
     <div className='searched-movie'>
      <div className="searched-title">Movie Name : {movie.results[0].title}</div>
      <div className='searched-poster'><img src={image_api+movie.results[0].poster_path}/></div>
      <div className="searched-overview">Summury : {movie.results[0].overview}</div>
      <div className='searched-vote'>Score : {movie.results[0].vote_average}</div>
      <div className='searched-realease'>Release Date: {movie.results[0].release_date}</div>
     </div>
    </div>
    ) : (
    typeof (inception.results && interstellar.results) != 'undefined' ?(
     <div className='favorite-movies'>
      <div className="inception">
       <div className="inception-title">Movie Name: {inception.results[0].title}</div>
       <div className='inception-poster'><img src={image_api+inception.results[0].poster_path}/></div>
       <div className="inception-overview">Summury: {inception.results[0].overview}</div>
       <div className='inception-vote'>Score: {inception.results[0].vote_average}</div>
       <div className='inception-realease'>Release Date: {inception.results[0].release_date}</div>
      </div>
      <div className="interstellar">
       <div className="interstellar-title">Movie Name: {interstellar.results[0].title}</div>
       <div className='interstellar-poster'><img src={image_api+interstellar.results[0].poster_path}/></div>
       <div className="interstellar-overview">Summury: {interstellar.results[0].overview}</div>
       <div className='interstellar-vote'>Score: {interstellar.results[0].vote_average}</div>
       <div className='interstellar-realease'>Release Date: {interstellar.results[0].release_date}</div>
      </div>  
     </div>
    ) : ('error'))}
  </div>);
}

export default App;
