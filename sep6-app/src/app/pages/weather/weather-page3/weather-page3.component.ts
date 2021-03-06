import { Component } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import * as moment from 'moment';

import { WeatherFunc3Model } from '../../..//models/weather/weather_func3_model';
import { ScatterChartPoint } from '../../../models/misc/scatter_chart_point';
import { WeatherDataService } from '../../../services/data-service/weather-data.service';

const INIT_SCATTERCHART_DATA: any[] = [{x: 0, y: 0}];

const JFK_DATASET: ScatterChartPoint[] = []

@Component({
  selector: 'app-weather-page3',
  templateUrl: './weather-page3.component.html',
  styleUrls: ['./weather-page3.component.css']
})
export class WeatherPage3Component {

  constructor(private _weatherDataService: WeatherDataService) { }

  public isInitialized: boolean = false;

  showSpinner = true;  
  showChart = false;   

  public scatterChartType: ChartType = 'scatter';

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display: true,
      text:"The temperature (in Celsius) at JFK"
    },
    maintainAspectRatio: false,
    animation:
    {
      duration: 0
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
        	unit: 'month',
      		unitStepSize: 1,
          displayFormats: {
            'month': 'MMM DD YYYY'
          }
        }
      }],
    }
  };

  //Initialize empty scatter chart
  public scatterChartData: ChartDataSets[] = [
    {
      data: INIT_SCATTERCHART_DATA, 
      label: 'EWR',
      pointRadius: 2,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)',
      pointBorderColor: 'green',
      backgroundColor: 'green'
    },
    {
      data: INIT_SCATTERCHART_DATA, 
      label: 'JFK',
      pointRadius: 2,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)',
      pointBorderColor: 'cyan',
      backgroundColor: 'cyan'
    },
    {
      data: INIT_SCATTERCHART_DATA, 
      label: 'LGA',
      pointRadius: 2,
      pointBackgroundColor: 'rgba(255, 255, 255, 0)',
      pointBorderColor: 'yellow',
      backgroundColor: 'yellow'
    },
  ];  

  public items: WeatherFunc3Model[] = [];

  initComponent()
  {
    if(!this.isInitialized)
    {
      this.getData();
      this.isInitialized = true;
    }   
  }

  getData()
  {
    this._weatherDataService.getTempInJFKinCelcius()
    .subscribe(response =>
      {
        this.items = this.parseResponse(response);
        this.loadItemsToScatterChartDatasets(this.items);
        this.loadChartWithData();
        this.showSpinner = false;
        this.showChart = true;
      });
  }

  parseResponse(response: any)
  {
    const ITEMS: WeatherFunc3Model[] = [];

    for(let i = 0; i < response.length; i++)
    {
      const ITEM: WeatherFunc3Model = {        
        time_epoch: response[i].time_epoch,
        jfk_temp: response[i].jfk_temp
      };
      
      ITEMS.push(ITEM);
    }
    return ITEMS;
  }

  loadItemsToScatterChartDatasets(items: any) 
  {
    for(let i = 0; i < items.length; i++) {
      const DATA_POINT: ScatterChartPoint ={
        x: moment.unix(items[i].time_epoch)
            .format('MMM DD YY'),
        y: items[i].jfk_temp };
      JFK_DATASET.push(DATA_POINT); }    
  }

  loadChartWithData()
  {
    this.scatterChartData = [
      {
        data: JFK_DATASET, //JFK x = epoch, y = temp
        label: 'JFK',
        pointRadius: 2,
        pointBackgroundColor: 'rgba(255, 255, 255, 0)',
        pointBorderColor: 'red',
        backgroundColor: 'red'
      }
    ]
  }
}