// import UseRequest from './Request';
// import OnCheckboxChanged from './CheckBox';
import {useState} from "react";
import ShortUrlForm from "./ShortUrlForm";
import axios from 'axios';

function App() {
  const [longURL, setLongURL] = useState('');

  const [shortURL, setShortURL] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    // const urlResponse = '/api/form.php';
    try {
      console.log(longURL);
      const { data } = await axios.post('http://shorturl/api/form.php', {
        url: longURL
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    if (data.url) setShortURL(data.url);
      else if (data.error) setError(data.error);
    } catch (error) {
      setError('Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
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
        {shortURL && <a href={shortURL}>{shortURL}</a>}
        </>
      )}
    </div>
  );
}

export default App;
