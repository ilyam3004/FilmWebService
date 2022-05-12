import React, {useState} from 'react'
import ResultCard from '../components/result-card/ResultCard';

const Add = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); 

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
    
    if(query.length > 1){
      fetch(`https://localhost:5001/api/search?title=${e.target.value}`)
        .then(res => res.json())
        .then((data) => {
            if(!data.errors){
              setResults(data.results);
            } else {
                setResults();
            }
        });
    }
  };
  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input type="text" 
            placeholder='SearchMovie'
            value={query}
            onChange={onChange}/>
            </div>
            {results.length > 0 && (
              <ul className="results">
                {results.map((movie) => (
                  <li key={movie.id}>
                    <ResultCard movie={movie}/>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
    </div>
  )
}

export default Add;
