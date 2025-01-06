import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadModalService {
  private modalVisibility = new BehaviorSubject<boolean>(false);
  modalVisibility$ = this.modalVisibility.asObservable();


  openModal() {
    this.modalVisibility.next(true);
  }

  closeModal() {
    this.modalVisibility.next(false);
  }

  toggleModal() {
    this.modalVisibility.next(!this.modalVisibility.value);
  }
}
