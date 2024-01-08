import { Component } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css'],
  animations: [
    trigger('openClose', [
      transition('* => void', [
        animate(
          500,
          style({
            transform: 'translateX(100%)',
          })
        ),
      ]),
      transition('void => *', [
        animate(
          500,
          style({
            transform: 'translateX(0%)',
          })
        ),
      ]),
    ]),
  ],
})
export class LateralMenuComponent {}
