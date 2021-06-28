import UseRequest from './Request';
// import OnCheckboxChanged from './CheckBox';
import {useState} from "react";

function App() {
  const [longURL, setLongURL] = useState('');
  const [checkRequest, setCheckRequest] = useState(null);
  
  function handlerSubmit() { setCheckRequest(true) };

  function MessageFromServer() {
    const { getRequest, errorRequest, isLoading } = UseRequest(longURL);
    
    if(isLoading) {
      return <p>Сокращаем вашу ссылку</p>
    } else if(getRequest) {
      return <a href={getRequest}>{getRequest}</a>
    } else {
      return <p>{errorRequest}</p>
    }
  }

  function handleChange(event) {
    setCheckRequest(false)
    setLongURL(event.target.value);
  }

  return (
    <div className="wrapper">
      <div className="form">
        <div id="messegeResult">
          <p> Введите ссылку требующую сокращения:</p>
        </div>
        <form name="formMain" id="formMain" >
          <input id="url"
          value={longURL}
          onChange={handleChange}
          type="text" 
          name="url"
          placeholder="Вставьте здесь" 
          autoComplete="off" 
          size="50" 
          required />
          <input id="button" type="button"  value="Сократить" onClick={handlerSubmit}/>
          { checkRequest && <MessageFromServer /> }
          {/* <p className="check-n-label">
            <input id="check" type="checkbox" name="check" onChange={ OnCheckboxChanged } id="alonecheck"/> 
            <label htmlFor="alonecheck">Ввести краткую ссылку самостоятельно:</label>
          </p>
          <div id="visible">
            <input id="shorturl" type="url" name="shorturl" size="50" />
          </div>  */}
        </form>
        </div>
    </div>
  );
}

export default App;
