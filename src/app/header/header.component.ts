import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routerSub: Subscription;
  isInLogin: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(
      (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange() );
  }

  handleRouteChange(){
     this.isInLogin = (this.router.url.includes('login') || this.router.url.includes('register') );
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }


}
