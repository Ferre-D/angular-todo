import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: `<ng-lottie
    [options]="options"
    (animationCreated)="animationCreated($event)"
  ></ng-lottie>`,
})
export class HomeComponent implements OnInit {
  constructor() {}

  banner: AnimationOptions = {
    path: '/assets/managing.json',
  };
  manage: AnimationOptions = {
    path: '/assets/manage-project.json',
  };
  phone: AnimationOptions = {
    path: '/assets/phone.json',
  };
  color: AnimationOptions = {
    path: '/assets/color.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {}
}
