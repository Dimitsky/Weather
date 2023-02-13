export default class ApiSuggestions {
    constructor(token, url) {
        this.url = url;
        this.method = 'POST';
        this.mode = 'cors';
        this.headers = {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'Authorization': 'Token ' + token, 
        };
    }

    async get(query) {
        const init = {
            method: this.method, 
            mode: this.mode, 
            headers: this.headers, 
            body: JSON.stringify({query}), 
        }

        try {
            const response = await fetch(this.url, init);

            if (!response.ok || response.status === 404 || response.status === 500) {
                switch (response.status) {
                    case 400:
                        throw new Error('Некорректный запрос (невалидный JSON или XML)');
                    case 401:
                        throw new Error('В запросе отсутствует API-ключ');
                    case 403:
                        throw new Error('В запросе указан несуществующий API-ключ, или не подтверждена почта, или исчерпан дневной лимит по количеству запросов');
                    case 405:
                        throw new Error('Запрос сделан с методом, отличным от POST');
                    case 413:
                        throw new Error('Слишком большая длина запроса или слишком много условий');
                    case 429:
                        throw new Error('Слишком много запросов в секунду или новых соединений в минуту');
                    default:
                        if (response.status >= 500) {
                            throw new Error('Произошла внутренняя ошибка сервиса');
                        } else {
                            throw new Error('Неизвестная ошибка. Код: ' + response.status);
                        }
                }
            }

            const result = await response.json();

            return result;
        } catch (error) {
            return new Promise((resolve, reject) => reject(error));
        }
    }
}