import { Component } from '@angular/core';
import { FlashService, IFlashType } from './service/flash.service';

interface IFlash {
  id: number;
  flashType: string;
  message: string | number;
  title: string | number;
  createdTimestamp: number;
}

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent {
  flashes: IFlash[] = [];

  constructor(private flashService: FlashService) {
    this.flashService.flash.subscribe((result: IFlashType) => {
      this.flashes.push({
        id: new Date().getTime(),
        title: result.title,
        message: result.message,
        flashType: result.type,
        createdTimestamp: new Date().getTime(),
      });

      if (this.flashes.length > 5) {
        this.flashes.shift();
      }
    });

    setInterval(() => this.filterFlashes(), 500);
  }

  private filterFlashes(): void {
    const currentTimestamp = new Date().getTime();
    this.flashes = this.flashes.filter(
      (flash) => currentTimestamp - flash.createdTimestamp <= 3000
    );
  }

  close(id: number): void {
    this.flashes = this.flashes.filter((flash) => flash.id !== id);
  }
}
