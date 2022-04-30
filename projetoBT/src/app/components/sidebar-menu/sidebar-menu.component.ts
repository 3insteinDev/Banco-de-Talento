import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  @ViewChild('sidebar') sidebar: any

  slide() {
    this.sidebar.nativeElement.classList.toggle('active')
    console.log(this.sidebar)
  }

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
