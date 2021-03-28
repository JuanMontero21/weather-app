interface _Coord {
    lon: number;
    lat: number;
};

interface _Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
};

interface _Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
};

interface _Wind {
    speed: number;
    deg: number;
};

interface _Clouds {
    all: number;
};

interface _Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
};

export class Weather {

    constructor(
        // public temp: number,
        // public feels_like: number,
        // public temp_min: number,
        // public temp_max: number,
        // public pressure: number,
        // public humidity: number,
        public coord: _Coord,
        public weather: _Weather[],
        public base: string,
        public main: _Main,
        public visibility: number,
        public wind: _Wind,
        public clouds: _Clouds,
        public dt: number,
        public sys: _Sys,
        public timezone: number,
        public id: number,
        public name: string,
        public cod: number
    ) {}

}