function ShortUrlForm({value, onChange, onSubmit}) {
    return(
        <div className="form">
        <div id="messegeResult">
            <p> Введите ссылку требующую сокращения:</p>
        </div>
        <form name="formMain" id="formMain" >
            <input id="url"
            value={value}
            onChange={onChange}
            type="text"
            name="url"
            placeholder="Вставьте здесь"
            autoComplete="off"
            size="50"
            required />
            <input id="button" type="button" value="Сократить" onClick={onSubmit} />
            {/* <p className="check-n-label">
            <input id="check" type="checkbox" name="check" onChange={onCheckboxChanged} id="alonecheck" />
            <label htmlFor="alonecheck">Ввести краткую ссылку самостоятельно:</label>
            </p>
            <div id="visible">
            <input id="shorturl" type="url" name="shorturl" size="50" />
            </div> */}
        </form>
        </div>
    )
}

export default ShortUrlForm;