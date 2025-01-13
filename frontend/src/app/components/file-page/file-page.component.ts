import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FileUploadService } from '../../services/file-upload.service';
import {NgIf} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FileDetails} from '../../model/file.model';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-file-page',
  standalone: true,
  imports: [
    CardComponent,
    NgIf,
    BackgroundArtComponent,
    ButtonComponent
  ],
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.css']
})
export class FilePageComponent implements OnInit {
  private fileUploadService: FileUploadService = inject(FileUploadService);
  file?: SafeResourceUrl | undefined;
  readingMode = true;
  filesFound: FileDetails[] = [];
  fileSelected: boolean = false;

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {

    // Load all files (No search params)
    this.fileUploadService.find("").subscribe(response => {
      this.filesFound = response.data.files
    })

  }

  getFile( rndFilename: string ) {

    this.fileSelected = true;

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
