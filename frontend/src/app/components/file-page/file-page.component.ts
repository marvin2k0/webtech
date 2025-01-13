import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FileUploadService } from '../../services/file-upload.service';
import {NgIf, SlicePipe} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FileDetails} from '../../model/file.model';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {ButtonComponent} from '../button/button.component';
import {RouterLink} from "@angular/router";
import {InputWithIconComponent} from "../input-with-icon/input-with-icon.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-file-page',
  standalone: true,
  imports: [
    CardComponent,
    BackgroundArtComponent,
    ButtonComponent,
    SlicePipe,
    RouterLink,
    InputWithIconComponent,
    TranslatePipe
  ],
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.css']
})
export class FilePageComponent implements OnInit {
  private fileUploadService: FileUploadService = inject(FileUploadService);
  file?: SafeResourceUrl | undefined;
  filesFound: FileDetails[] = [];


  ngOnInit() {

    // Load all files (No search params)
    this.fileUploadService.find("").subscribe(response => {
      this.filesFound = response.data.files
    })

  }

}
