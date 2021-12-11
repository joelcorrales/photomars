import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Photos {
  photos: Photo[];
}

export interface Photo {
  camera: Camera;
  earth_date: string;
  id: number;
  img_src: string;
  rover: Rover;
  sol: number;
}

export interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class MarsService {
  constructor(private http: HttpClient) {}

  getPhotos(rover: string): Observable<Photos> {
    return this.http.get<Photos>(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=DEMO_KEY`
    );
  }
}
