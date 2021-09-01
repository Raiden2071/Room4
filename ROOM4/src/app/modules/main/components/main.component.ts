import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RootObject, Track, RootObject1, UpdateTrack, SearchValue } from 'src/app/models/tracks';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  trackList$!: Observable<Track[]>;
  page: number = 1;
  total: number = 0;
  searchTrack: string = '';

  reactiveForm: FormGroup = this.fb.group({
    searchTrack: ['', [Validators.required]],
    page:        [1, [Validators.required]],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.trackList$ = this.getTracks();
    this.retrieveFilterChanges();
  }

  getTracks(): Observable<Track[]> {
    return this.http.get<RootObject>(`chart.gettoptracks&page=${this.page}&limit=28`).pipe(
      tap((attr: any) => this.total = +attr.tracks['@attr'].totalPages),
      map((tracks: RootObject) => tracks.tracks.track.map((track: UpdateTrack) => ({
        name: track.name,
        artist: track.artist.name,
        image: track?.image[2]['#text'],
        url: track.url
      }))))
  }

  filterTrack(): Observable<Track[]> {
    return this.http.get<RootObject1>(`track.search&track=${this.reactiveForm.value.searchTrack}&page=${this.page}&limit=28`).pipe(
      tap((v: any) => this.total = +v.results['opensearch:totalResults']),
      map((tracks: RootObject1) => tracks.results.trackmatches.track.map((track: UpdateTrack) => ({
        name: track.name,
        artist: track.artist,
        image: track?.image[2]['#text'],
        url: track.url
      }))))
  }

  retrieveFilterChanges(): void {    
    this.reactiveForm.valueChanges.pipe(
      debounceTime(300),
      ).subscribe((searchValue: SearchValue) => 
        searchValue.searchTrack === '' ? this.trackList$ = this.getTracks() : this.trackList$ = this.filterTrack()
      )
  }

}
