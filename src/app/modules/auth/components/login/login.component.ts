import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // auth
    window.location.href = 'http://www.last.fm/api/auth/?api_key=a48c123f0a8cd036e88d6524b67f9bc1&cb=http://localhost:4200/main';
  }

}
