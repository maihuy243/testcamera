import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'testcamera';
  time: number = 5;
  callbackUrl: string = '';
  constructor(private router: ActivatedRoute) {
    this.router.queryParams.subscribe((params: any) => {
      const callback = params?.callback;
      const timeout = params?.timeout;
      if (timeout) {
        this.time = timeout;
      }
      this.callbackUrl = callback;
    });

    this.coutdown();
  }

  async delay() {
    return new Promise((rel) => setTimeout(rel, 1000));
  }

  async coutdown() {
    for(let i = this.time; i>=0; i--){
        this.time = i
        await this.delay()
    }

    if(this.callbackUrl){
      window.open(this.callbackUrl);
    }
  }
}
