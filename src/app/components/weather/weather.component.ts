import { Component} from '@angular/core';
import { WeatherService } from '../../services/weather.service';

interface WeatherData {  //Weather forecast data
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCondition: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  // Forecast data
  data: WeatherData[] = [];

  // Columns to display in the table
  displayedColumns: string[] = ['date', 'maxTemp', 'minTemp', 'weatherCondition'];

  // City entered by user
  city: string = '';

  constructor(private weatherService: WeatherService) {}

  // Method to obtain the weather forecast
  getWeatherForecast() {
    if (this.city.trim() === '') {
      alert('Por favor, ingresa una ciudad');
      return;
    }

    this.weatherService.getWeatherForecast(this.city).subscribe(
      (data) => this.data = data, // Assign the forecast data to the table data source
      (error) => {
        console.error('Error al obtener el pronóstico del clima', error);
        alert('No se pudo obtener el pronóstico. Verifica el nombre de la ciudad.');
      }
    );
  }
}
