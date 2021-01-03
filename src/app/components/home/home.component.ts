import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newMusic: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private spotifyService: SpotifyService) {
    this.loading = true;
    this.error = false;

    this.spotifyService.getNewReleases().subscribe(
      (data: any) => {
        setTimeout(() => {
          this.newMusic = data;
          this.loading = false;
        }, 1000);
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = err.error.error.message;
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
