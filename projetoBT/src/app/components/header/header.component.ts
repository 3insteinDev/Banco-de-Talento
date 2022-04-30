import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
//import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})




export class HeaderComponent implements OnInit {

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
    console.log('estou aqui')
  }

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }


}
