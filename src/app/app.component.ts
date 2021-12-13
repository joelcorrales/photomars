import { Component } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { Photo } from './interfaces/photos';
import { MarsService } from './mars.service';
import { Constants } from './app.constants';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'photomars';
  destroy$ = new Subject();
  photos: Photo[] = [];
  page = 1;
  currentRover = '';
  isLoading = false;
  placeholders = Array(25);
  cameras = Constants.cameras;
  selectedCamera: string = '';
  maxDate = new Date();
  selectedDay = DateTime.now().minus({ day: 1 }).toJSDate();

  constructor(private mars: MarsService) {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        if (
          document.body.scrollHeight * 0.8 > window.pageYOffset ||
          this.isLoading
        ) {
          return;
        }
        this.page++;
        this.loadRoverPhotos(this.currentRover);
      });
  }

  loadRoverPhotos(rover: string) {
    this.isLoading = true;
    if (this.currentRover !== rover) {
      this.currentRover = rover;
      this.resetParams();
    }

    const date = DateTime.fromJSDate(this.selectedDay).toFormat('yyyy-M-d');

    this.mars
      .getPhotos(
        rover,
        this.page,
        date,
        this.selectedCamera !== '' ? this.selectedCamera : undefined
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((photos) => {
        this.photos = [...this.photos, ...photos];
        this.isLoading = false;
      });
  }

  resetParams() {
    this.photos = [];
    this.page = 1;
  }

  isValidCamera(camera: any): boolean {
    return camera[this.currentRover];
  }

  dateChanged() {
    this.resetParams();
    this.loadRoverPhotos(this.currentRover);
  }

  selectCamera(e: any) {
    this.selectedCamera = e.target.value;
    this.resetParams();
    this.loadRoverPhotos(this.currentRover);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
