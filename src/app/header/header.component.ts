import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs'
import { AuthenticationService } from '../User/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routerSub: Subscription;
  isInLogin: boolean = true;
  isAdmin: boolean;

  constructor(private router: Router, public auth: AuthenticationService) {
    //this.isAdmin = auth.checkAdmin();
  }

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(
      (event) => ( event instanceof NavigationEnd ) && this.handleRouteChange() );
  }

  handleRouteChange(){
     this.isInLogin = (this.router.url.includes('login') || this.router.url.includes('register'));
     this.isAdmin = this.auth.checkAdmin();
     console.log(this.isAdmin);
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }


}
