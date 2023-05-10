import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1)
  const access_key =  "VQC6YbjEJ1eOyy6q7HfWjD9jxSPZPFwCAL8RlnEdXYA";

  const submitHandler = (e) => {
    e.preventDefault();
    if(!userSearch){
      alert("Please provide your search");
      return;
    }
    axios
    .get(`https://api.unsplash.com/search/photos?page=${page}&query=${userSearch}&client_id=${access_key}`)
    .then((res) => {
      const { results } = res.data;
      console.log(results)
      setSearchResults([...searchResults.concat(results)]);
      setPage((prevState) => prevState + 1);
    })
    .catch(console.log);
  }

  return (
    <div className='App'>
      <h1>Image Search App</h1>    
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='Search for images' value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
        <button>Search</button>
      </form>
      <div className='image-results'>
        {searchResults.map((item) => (
          <div className="image-result" key={item.id}>
            <img src={item.urls.small} alt="" />
            <a href={item.links.html} target='_blank' rel="noreferrer">{item.alt_description}</a>
          </div>
        ))}
      </div>
      {searchResults.length > 1 && 
        <button id="show-more-button" onClick={(e) => submitHandler(e)}>See more</button>
      }
    </div>
  )
}

export default App
