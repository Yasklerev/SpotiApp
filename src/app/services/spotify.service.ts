import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private httpClient: HttpClient) {
    console.log('Spotify servicio listo!!');
  }

  getQuery(termino: string): Observable<object> {
    const url = `https://api.spotify.com/v1/${termino}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCUF7RvzvDFiTsmN0c4aNkkj08YU4v1INXy2FAeJshVMoDggzZqbBc-71rPYE_W9N7-qFqjznsIQwy7Cu0',
    });
    return this.httpClient.get(url, { headers });
  }

  getNewReleases(): Observable<object> {
    return this.getQuery('browse/new-releases').pipe(
      map((data) => data[`albums`].items)
    );
  }

  getArtists(termino: string): Observable<object> {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => data[`artists`].items)
    );
  }

  getArtist(id: string): Observable<object> {
    return this.getQuery(`artists/${id}`);
  }

  getTopTraks(id: string): Observable<object> {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => data[`tracks`])
    );
  }
}
