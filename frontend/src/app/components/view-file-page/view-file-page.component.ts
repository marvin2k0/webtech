import {ChangeDetectorRef, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgIf} from "@angular/common";
import {FileUploadService} from '../../services/file-upload.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {BackgroundArtComponent} from '../background-art/background-art.component';

@Component({
  selector: 'app-view-file-page',
  standalone: true,
  imports: [
    CardComponent,
    NgIf,
    BackgroundArtComponent
  ],
  templateUrl: './view-file-page.component.html',
  styleUrl: './view-file-page.component.css'
})
export class ViewFilePageComponent {
  private fileUploadService: FileUploadService = inject(FileUploadService);
  readingMode = true;
  file?: SafeResourceUrl | undefined;
  filename: string | null = "";
  fileType: string | undefined;

  fileTypes = {
    IMAGES: ["png", "jpg", "jpeg"],
    DOCUMENTS: ["pdf"],
    VIDEOS: ["mp4", "webm", "mov"],
    AUDIOS: ["mp3"]
  }

  @ViewChild('overlayCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;


  initCanvas() {
    console.log("initCanvas")
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  onCanvasMouseDown(event: MouseEvent) {
    this.isDrawing = true;
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;
  }

  onCanvasMouseMove(event: MouseEvent) {
    if (!this.isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.strokeStyle = 'rgba(0, 0, 255, 0.8)';
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();

    this.lastX = currentX;
    this.lastY = currentY;
  }

  onDrawStop() {
    this.isDrawing = false;
    this.saveDrawing()
  }

  /**
   * Converts the drawing thats on the canvas into an image, which is base64 encoded
   * Sends the image to server via HTTP-Post as payload
   */
  saveDrawing(): boolean {
    const canvas = this.canvasRef.nativeElement;
    const imageData = canvas.toDataURL('image/png');
    const payload = { rndFilename: this.filename, drawing: imageData };

    this.fileUploadService.addDrawing(payload)!.subscribe();
    return true;
  }

  /**
   * Performs an HTTP-Get. Receives b64 img data. Loads the data into the canvas
   */
  loadImage() {
    this.fileUploadService.getDrawing(this.filename!).subscribe({
      next: (response: any) => {
        const b64ImgData = response.data;
        this.drawImageOnCanvas(b64ImgData);
      },
      error: (err) => {
        console.error('Error fetching image:', err);
        // @ToDo: I might want to add a modal to let the user know something didnt go as planned,
        //        This will do until then
      }
    });
  }

  private drawImageOnCanvas(b64ImgData: string): void {
    const canvas = this.canvasRef.nativeElement;
    const img = new Image();

    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error);
    };

    img.src = b64ImgData;
  }


  constructor(
    private sanitizer: DomSanitizer, private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // using query params to bypass the "CANNOT GET…"-Error
    this.route.queryParamMap.subscribe(params => {
      this.filename = params.get('filename');
    });

    if (!this.filename) {
      return ;
    }

    // Adding 1 to the "Views"-Counter
    this.fileUploadService.addView(this.filename).subscribe({
      next: (res) => { },
      error: (err) => { console.error(err) }
    })

    this.fileType = this.filename.split('.')[1];

    this.getFile(this.filename);
  }


  getFile(rndFilename: string) {
    this.fileUploadService.retrieve(rndFilename).subscribe({
      next: (response: Blob) => {
        const objectUrl = URL.createObjectURL(response);
        this.file = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
      },
      error: (error: any) => {
        console.error('Error fetching file:', error);
      },
    });
  }

  toggleReadingMode(): void {
    this.readingMode = !this.readingMode;
  }

  toggleDrawMode(): void {
    // @ToDo: Implement
    this.initCanvas();
    this.loadImage();
  }
}
