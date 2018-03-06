import {Component, OnInit} from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  data: Observable<any>;
  sortColumn: string;
  sortOrder : boolean;

  constructor(private http: Http) {}


  sort(column){
    this.sortColumn =  column;
    this.sortOrder = this.sortColumn == column ? !this.sortOrder : false;
  }

  ngOnInit() {
    this.sortColumn = 'name';
    this.sortOrder = false;
    let url = `https://raw.githubusercontent.com/praneeth464/JSON-DATA/master/data.json`;
    return this.http.get(url, {})
      .map((res) => {        
        return res.json();
      }).subscribe(data => {
        console.log('loaded data.json from git');
        console.log(data);
        this.data = data;
      });
  }
}
