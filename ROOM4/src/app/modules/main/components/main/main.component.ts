import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  page: number = 1;
  constructor(
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    // chart.gettoptracks
    // this.http.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&page=${this.page}&api_key=319b2243558a8cb2a53bf688b5670015&format=json`).subscribe(v => console.log(v));   
    // track.search
    // this.http.get('http://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=319b2243558a8cb2a53bf688b5670015&format=json').subscribe(v => console.log(v));   
    
    
    // auth
    // http://www.last.fm/api/auth/?api_key=xxxxxxxxxx
    this.http.get('http://www.last.fm/api/auth/?api_key=319b2243558a8cb2a53bf688b5670015&format=json').subscribe(v => console.log(v));   
  }

  // /2.0/?method=track.search&track=Believe&api_key=YOUR_API_KEY&format=json

}
