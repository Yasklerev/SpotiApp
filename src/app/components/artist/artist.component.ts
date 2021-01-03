import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  artist: any = {};
  loading: boolean;
  topTracks: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.loading = true;
    this.activatedRoute.params.subscribe((data) => {
      this.getArtist(data[`id`]);
      this.getTopTracks(data[`id`]);
    });
  }
  ngOnInit(): void {}

  getArtist(id: string): void {
    this.spotifyService.getArtist(id).subscribe((data) => {
      setTimeout(() => {
        this.artist = data;
        this.loading = false;
      }, 1000);
    });
  }

  getTopTracks(id: string): void {
    this.spotifyService.getTopTraks(id).subscribe((data) => {
      this.topTracks = data;
      console.log(this.topTracks);
    });
  }
}
