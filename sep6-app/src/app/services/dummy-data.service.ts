import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; 

@Injectable()
export class DummyDataService {

    constructor(private _http: HttpClient) {

    }

    getDummyData()
    {
        return this._http.get('https://manufacturersapi-do62tzdoqq-ew.a.run.app/getDummyData?key=AIzaSyBnvzAxsFIL9KgCJcKcAnjYizegXD9bInE');
    }
}