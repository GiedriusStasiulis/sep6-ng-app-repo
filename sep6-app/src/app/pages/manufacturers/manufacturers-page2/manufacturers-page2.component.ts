import { Component } from '@angular/core';
import { ManFunc2Model } from '../../../models/manufacturers/man_func2_model';
import { ManufacturerDataService } from '../../../services/data-service/manufacturer-data.service';

@Component({
  selector: 'app-manufacturers-page2',
  templateUrl: './manufacturers-page2.component.html',
  styleUrls: ['./manufacturers-page2.component.css']
})
export class ManufacturersPage2Component {

  constructor(private _manufacturersDataService: ManufacturerDataService) { }

  public isInitialized: boolean = false;

  showSpinner = true;
  showChart = false;

  public barChartData: any[] = [];
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {title:{
    display: true,
    text:"The number of flights each manufacturer with more than 200 planes are responsible for"
  },
  scaleShowVerticalLines: true, responsive: true, maintainAspectRatio: false, scales: {yAxes: [{ticks: {beginAtZero:true}}]}};

  public items: ManFunc2Model[] = [];

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
    this.showChart = false;
    this.showSpinner = true;

    this._manufacturersDataService.getNumFlightsForTopManufacturers()
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
    const ITEMS: ManFunc2Model[] = [];

    for(let i = 0; i < response.length; i++)
    {
      const ITEM: ManFunc2Model = {        
        num_flights: response[i].num_flights,
        manufacturer: response[i].manufacturer
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
      const DATA: number = items[i].num_flights;
      const LABEL: string = items[i].manufacturer;

      DATA_ARRAY.push(DATA);
      LABEL_ARRAY.push(LABEL);
    }

    this.barChartData = [{data: DATA_ARRAY, label: 'Number of Flights'}];
    this.barChartLabels = LABEL_ARRAY;
  }
}