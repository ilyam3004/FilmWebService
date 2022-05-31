import { Link } from 'react-router-dom';
import './HeroSlide.css';

const HeroSlide = ({movie, watchlist, change, isDetail}) => {

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
  
  const RemoveFromWatchList = () => {
    fetch(`https://movie-web-api-service.herokuapp.com/api/watchlist/delete?id=${movie.id}`,
    {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      method: "DELETE",
    })
    change(watchlist.filter((item) => item.id !== movie.id));
  }


  const resultButton = () => {
    if(watchlist.find(item => item.id === movie.id)){
      return (
        <button className='hero-slider-item-add-btn'
                disabled={!localStorage.getItem('isAuth')}
                onClick={RemoveFromWatchList}>
             Remove
        </button>
      )
    }
    return(
      <button className='hero-slider-item-add-btn'
              disabled={!localStorage.getItem('isAuth')}
              onClick={AddToWatchList}>
              Add To Watchlist
      </button>
    )
  }
  return (
    <div className="hero-slide-item" style={{ 
        backgroundImage: `url("${movie.backdrop_path}")`}}>
        <div className='hero-slide-item-container'>
          <div className="hero-slide-item-content-container">
            <div className="hero-slide-item-content-info">
              <h2 className="hero-slide-item-title">
                {movie.title}
              </h2> 
              <div className="hero-slide-item-overview">
                {movie.overview}
              <div className="hero-slide-item-btns">
                  {resultButton()}
                  {
                    isDetail 
                    ? <div className='info-container'>
                        <div className="rate">Rate:  {movie.vote_average}({movie.vote_count})</div>
                        <div className="date">
                          Release date: {movie.release_date 
                            ? movie.release_date.replace(/-/g, '.')
                            : "-"}
                      </div>
                      </div>
                    : <Link to={`/detail/${movie.id}`} className='hero-slider-item-more-btn'>More</Link>
                  }
              </div>
              </div>
            </div>
              <img src={movie.poster_path} className="hero-slide-item-content-poster" alt=""/>
          </div> 
        </div> 
    </div>
  )
}

export default HeroSlide;
