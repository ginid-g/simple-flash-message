import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface IFlashType {
  type: "success" | "error";
  title: string | number;
  message: string | number;
}

@Injectable({
  providedIn: "root",
})
export class FlashService {
  flash: Subject<IFlashType> = new Subject();

  constructor() {}

  showFlash(
    type: "success" | "error",
    title: string | number,
    message: string | number
  ): void {
    this.flash.next({
      type: type,
      title: title,
      message: message,
    });
  }
}
