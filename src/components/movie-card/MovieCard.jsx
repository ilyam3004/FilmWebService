import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({movie, change, watchlist}) => {
  
  const AddToWatchList = () => {
    fetch(`https://movie-web-api-service.herokuapp.com/api/watchlist/addmovie?id=${movie.id}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      method: "POST",
    })
    const newWatchlist = [...watchlist];
    newWatchlist.push(movie);
    change(newWatchlist);
  }

  return (
    <div>
      <div className='card-container'>
       {movie.poster_path ? <img className='card-content' src={movie.poster_path} alt=''/>
         : null    
       }
       <div className="description">
        <h3 className="card-title">
          {movie.title}
        </h3>
        <div className="subtitle-container">
          <p className='release-date'>
            {movie.release_date ? 
              movie.release_date.replace(/-/g, '.')
              :
              "-"
            }
          </p>
          <div className="overview-container">
            <div className='overview'>{movie.overview.substring(0, 180) + "..."}</div>
          </div>
          <div className="btn-container">
            <button className="card-btn" disabled={!localStorage.getItem('isAuth')}
                onClick={AddToWatchList}>+ Add</button>
            <Link to={`/detail/${movie.id}`} className="card-btn">More</Link>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default MovieCard
