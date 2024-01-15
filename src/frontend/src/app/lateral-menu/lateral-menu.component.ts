import { Component, Input } from '@angular/core';

import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
        }),
        animate(
          100,
          style({
            transform: 'translateX(0%)',
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0%)',
        }),
        animate(
          100,
          style({
            transform: 'translateX(100%)',
          })
        ),
      ]),
    ]),
  ],
})
export class LateralMenuComponent {
  @Input()
  show: boolean = false;
}
