import React, { useState } from 'react';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiKey, setApiKey] = useState(''); // User provides their OMDB Key

    const searchMovies = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        if (!apiKey.trim()) {
            setError('Please enter your OMDB API Key first.');
            return;
        }

        setLoading(true);
        setError(null);
        setMovies([]);

        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                throw new Error(data.Error || 'Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Movie Search App (OMDB)</h2>
            
            <div border="1" style={{ border: '1px solid black', padding: '15px', marginBottom: '20px', display: 'inline-block' }}>
                <label>OMDB API Key: </label>
                <input 
                    type="password" 
                    placeholder="Enter OMDB Key" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <br /><br />
                <form onSubmit={searchMovies}>
                    <input 
                        type="text" 
                        placeholder="Search for movies..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                {movies.map(movie => (
                    <div key={movie.imdbID} border="1" style={{ border: '1px solid gray', padding: '10px', width: '200px' }}>
                        <img 
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} 
                            alt={movie.Title} 
                            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                        />
                        <h4 style={{ margin: '10px 0 5px 0' }}>{movie.Title}</h4>
                        <p style={{ margin: 0 }}>Year: {movie.Year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieSearch;
