// App.js
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getTimeStories");
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p className="loading">Loading stories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Latest Time Stories</h1>
      <div className="stories-container">
        {stories.map((story, index) => (
          <div key={index} className="story-card">
            <a
              href={story.link}
              target="_blank"
              rel="noopener noreferrer"
              className="story-link"
            >
              {story.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
