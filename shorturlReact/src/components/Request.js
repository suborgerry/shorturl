import axios from 'axios';
import {useState} from "react";

const UseRequest = (longURL) => {
    const [errorRequest, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [getRequest, setGetRequest] = useState(null);

        (async () => {
            try {
                const urlObj = { url: longURL };
                const res = await axios.post('http://localhost:8080/ping', urlObj, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      }
                });

                res.data.url && setGetRequest(res.data.url);
                res.data.error && setError(res.data.error);
            } catch (error) {
                console.error(error);
                setError('Пожалуйста, попробуйте еще раз.');
            } finally {
                setIsLoading(false);
            }
        })();

    return {getRequest, errorRequest, isLoading};
};

export default UseRequest;