import { Component } from '@angular/core';
import { AuthService } from './auth.service';

enum NavAccess {
  ALL,
  AUTH_ONLY,
  ANON_ONLY,
}

class NavLink {
  public label: string = '';
  public url: string = '';
  public access: NavAccess = NavAccess.ALL;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public navAccess = NavAccess;

  title = 'frontend';

  constructor(public authService: AuthService) {}

  public navLinks: NavLink[] = [
    { label: 'Index', url: '/index', access: NavAccess.ALL },
    { label: 'Sign In', url: '/signin', access: NavAccess.ANON_ONLY },
    {
      label: 'Register',
      url: '/register',
      access: NavAccess.ANON_ONLY,
    },
    {
      label: 'My Tasks',
      url: '/tasks',
      access: NavAccess.AUTH_ONLY,
    },
  ];
}
