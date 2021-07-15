// import UseRequest from './Request';
// import OnCheckboxChanged from './CheckBox';
import {useState} from "react";
import ShortUrlForm from "./ShortUrlForm";
import axios from 'axios';

function App() {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit() {
    if(longURL !== "") {
      if(longURL.startsWith('https://') || longURL.startsWith('http://')) {
        try {
          const { data } = await axios.post('http://localhost:8080',
            { 
              url: longURL,
              localUrl: window.location.href
            }, {
            headers: {
              "Access-Control-Allow-Origin" : '*',
              'Content-Type': 'application/json'
            }
          });
        if (data.url) setShortURL(data.url);
          else if (data.error) setError(data.error);
        } catch (error) {
          console.error(error);
          setError('Please, try again.');
        } finally {
          error && setError(false);
          setIsLoading(false);
        }
      } else {
        setError('Link must starts with https:// or http://');
      }
    } else {
      setError('Input could not be empty');
    }
  };

  function handleChange(event) {
      setLongURL(event.target.value);
  }

  return (
    <div className="wrapper">
      <ShortUrlForm value={longURL} onChange={handleChange} onSubmit={handleSubmit} />
      {isLoading ? <div>
        Результат загружается...
      </div> : (
        <>
        {error && <div className="error">{error}</div>}
        {shortURL && <a href={shortURL} target="_blank" rel="noreferrer">{shortURL}</a>}
        </>
      )}
    </div>
  );
}

export default App;
