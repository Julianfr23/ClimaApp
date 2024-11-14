import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface WeatherData {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCondition: string;
}

@Injectable({
  providedIn: 'root'
})


export class WeatherService {

  private apiKey = '922000661300af8163b369dd95a75304';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getWeatherForecast(city: string): Observable<WeatherData[]> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url).pipe(
        map((response) => {

            // Exclude the first day (current day) and select the following four days
            const today = new Date().getDate();
            return response.list
                .filter((item: any) => new Date(item.dt_txt).getDate() !== today)
                .filter((_: any, index: number) => index % 8 === 0) // Take one forecast per day
                .slice(0, 4) // Limit to the next 4 days
                .map((item: any) => ({
                    date: item.dt_txt,
                    maxTemp: item.main.temp_max,
                    minTemp: item.main.temp_min,
                    weatherCondition: item.weather[0].description
                }));
        })
    );
}
}
