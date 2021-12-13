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
  imageLoaded?: boolean;
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
