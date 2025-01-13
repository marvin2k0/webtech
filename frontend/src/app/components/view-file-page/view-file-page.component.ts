import {Component, inject} from '@angular/core';
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

    this.fileType = this.filename.split('.')[1];

    this.getFile(this.filename);
  }


  getFile( rndFilename: string ) {

    this.fileUploadService.retrieve(rndFilename).subscribe({
      next: (response: Blob) => {
        const objectUrl = URL.createObjectURL(response);
        this.file = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
        console.log(this.file);
      },
      error: (error: any) => {
        console.error('Error fetching file:', error);

      },
    });
  }


  toggleReadingMode(): void {
    this.readingMode = !this.readingMode;
  }
}
