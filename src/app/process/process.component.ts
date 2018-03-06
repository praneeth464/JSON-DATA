import {Component, OnInit} from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'process',
  styleUrls: ['./process.component.css'],
  templateUrl: './process.component.html'
})
export class ProcessComponent implements OnInit {
  
    data: Array<any>;
    categoryColumns: Array<any>;

  constructor(private http: Http) {}


  ngOnInit() {
    let url = `https://raw.githubusercontent.com/praneeth464/JSON-DATA/master/data.json`;
    return this.http.get(url, {})
      .map((res) => {        
        return res.json();
      }).subscribe(data => {
        console.log('loaded data.json from git');
        console.log(data);
        let categoryColumns = ['name'];
        let processedData = [];
        data.map(row => {
            console.log(row);

            let pRow = processedData.filter(d => {
                return d.name == row.name;
            });
            let pr = {};
            
            if(pRow.length > 0){
                pr = pRow[0];
            }
            else{
                pr = {
                    name : row.name
                };
                processedData.push(pr);
            }

            let category = row.category;
            pr[category] = row.amount;

            let pCategory = categoryColumns.filter(c => {
                return c == category;
            });

            if(pCategory.length == 0){
                categoryColumns.push(category);
            }
            
        });
        console.log(processedData);
        console.log(processedData, categoryColumns);

        this.data = processedData;
        this.categoryColumns = categoryColumns;
      });
  }
}
