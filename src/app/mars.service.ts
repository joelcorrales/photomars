import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Photo, Photos } from './interfaces/photos';

@Injectable({
  providedIn: 'root',
})
export class MarsService {
  constructor(private http: HttpClient) {}

  getPhotos(
    rover: string,
    page: number = 1,
    date: string | number,
    camera?: string
  ): Observable<Photo[]> {
    let params = new HttpParams();
    params = params.append(
      'api_key',
      '5T7cky1l1KeoWdQTeSOGkDSFKa7Jt0DHiBzUURQy'
    );
    params = params.append('page', page);
    if (typeof date === 'string') {
      params = params.append('earth_date', date);
    } else {
      params = params.append('sol', date);
    }
    if (camera) {
      params = params.append('camera', camera);
    }

    return this.http
      .get<Photos>(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
        { params }
      )
      .pipe(map((res) => res?.photos));
  }
}
