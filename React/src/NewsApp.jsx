import React, { useState, useEffect } from 'react';

const NewsApp = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Using Spaceflight News API (Free, no-key, real headlines)
                const res = await fetch('https://api.spaceflightnewsapi.net/v4/articles/?limit=10');
                const data = await res.json();
                
                if (data.results) {
                    setNews(data.results);
                } else {
                    throw new Error('No news articles found');
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p>Loading latest news...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Latest Space News App</h2>
            <div style={{ marginTop: '20px' }}>
                {news.map(article => (
                    <div key={article.id} border="1" style={{ border: '1px solid black', padding: '15px', marginBottom: '15px', textAlign: 'left', maxWidth: '600px', margin: '0 auto 15px auto' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{article.title}</h3>
                        <p style={{ fontSize: '14px', color: '#555' }}>
                            <strong>Source:</strong> {article.news_site} | <strong>Published:</strong> {new Date(article.published_at).toLocaleDateString()}
                        </p>
                        <p>{article.summary.substring(0, 200)}...</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsApp;
