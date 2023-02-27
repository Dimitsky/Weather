export default class ApiOpenWeather {
    constructor({ token, baseUrl, weatherType = 'weather', lang = 'ru', units = 'metric' }) {
        this.baseUrl = baseUrl;
        this.token = token;
        this.weatherType = weatherType;
        this.lang = lang;
        this.units = units;
    }

    async getData(lat, lon) {
        try {
            const response = await fetch(`${this.baseUrl}/${this.weatherType}?lat=${lat}&lon=${lon}&appid=${this.token}&lang=${this.lang}&units=${this.units}`);

            if (!response.ok || response.stauts === 404 || response.status === 500) {
                switch (response.status) {
                    default:
                        throw new Error('Error! Status is ' + response.status);
                }
            }

            const result = response.json();

            return result;
        } catch (error) {
            return new Promise((resolve, reject) => reject(error));
        }
    }

    async getDatas(coordsArr) {
        return Promise.all(coordsArr.map(({ lat, lon }) => this.getData(lat, lon)));
    }
}