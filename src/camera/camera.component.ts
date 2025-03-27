import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  template: `
    <video #videoElement autoplay playsinline></video>
    <button (click)="switchCamera()">Switch Camera</button>
  `
})
export class CameraComponent implements OnInit {
  private stream: MediaStream | any;
  private videoElement: HTMLVideoElement | any;
  private currentFacingMode = 'environment'; // 'environment' là camera sau, 'user' là camera trước

  @ViewChild('videoElement', { static: true }) videoElementRef:any;

  ngOnInit() {
    this.videoElement = this.videoElementRef.nativeElement;
    this.startCamera();
  }

  async startCamera() {
    try {
      const constraints = {
        video: {
          facingMode: this.currentFacingMode
        }
      };
      
      // Dừng stream hiện tại nếu có
      if (this.stream) {
        this.stopMediaTracks();
      }
      
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  stopMediaTracks() {
    this.stream.getTracks().forEach((track:any) => track.stop());
  }

  switchCamera() {
    this.currentFacingMode = this.currentFacingMode === 'environment' ? 'user' : 'environment';
    this.startCamera();
  }

  ngOnDestroy() {
    if (this.stream) {
      this.stopMediaTracks();
    }
  }
}