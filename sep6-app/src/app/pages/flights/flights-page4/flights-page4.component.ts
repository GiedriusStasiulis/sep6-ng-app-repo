import { Component } from '@angular/core';
import { FlightsFunc4Model } from '../../..//models/flights/flights_func4_model';
import { FlightsDataService } from '../../../services/data-service/flights-data.service';

@Component({
  selector: 'app-flights-page4',
  templateUrl: './flights-page4.component.html',
  styleUrls: ['./flights-page4.component.css']
})
export class FlightsPage4Component {

  constructor(private dataService: FlightsDataService) { }

  public isInitialized: boolean = false;

  showSpinner = true;
  showChart = false;

  public barChartData: any[] = [];
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {scaleShowVerticalLines: true, responsive: true, maintainAspectRatio: false, scales: {yAxes: [{ticks: {beginAtZero:true}}]}};
  
  public items: FlightsFunc4Model[] = [];

  initComponent()
  {
    console.log("Not implemented yet!")

    /*
    if(!this.isInitialized)
    {
      this.getData();
      this.isInitialized = true;
    }   */
  }

  getData()
  {
    this.showChart = false;   
    this.showSpinner = true;

    this.dataService.getTotalNumberOfFlightsPerMonth()
    .subscribe(response =>
      {
        this.items = this.parseResponse(response);
        this.loadItemsToBarChart(this.items);
        this.showSpinner = false;
        this.showChart = true;
      });
  }

  parseResponse(response: any)
  {
    const ITEMS: FlightsFunc4Model[] = [];

    for(let i = 0; i < response.length; i++)
    {
      const ITEM: FlightsFunc4Model = {        
        origin: response[i].origin,
        meanAirTime: response[i].meanAirTime
      };
      
      ITEMS.push(ITEM);
    }
    return ITEMS;
  }

  loadItemsToBarChart(items: any) 
  {
    const DATA_ARRAY: number[] = [];
    const LABEL_ARRAY: string[] = [];

    for(let i = 0; i < items.length; i++)
    {
      const DATA: number = items[i].month;
      const LABEL: string = items[i].flights;

      DATA_ARRAY.push(DATA);
      LABEL_ARRAY.push(LABEL);
    }

    this.barChartData = [{data: DATA_ARRAY, label: 'Total number of Flights'}];
    this.barChartLabels = LABEL_ARRAY;
  }  
}
