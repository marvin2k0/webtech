import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  isDragging: boolean = false;
  hasFile: boolean = false;

  filename: string = "";
  filesize: string = "";
  fileData: string = "";

  @ViewChild('dragDropField') dragDropField: ElementRef | undefined;
  @Input() currentSite!: number;
  uploaded: boolean = false;
  file: File | undefined;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      this.appendFile(file);

      // Clear the data from the drag event
      event.dataTransfer.clearData();
    }
  }

  onFileSelected(): void {
    const fileInputField = document.getElementById("file-input") as HTMLInputElement;

    if (fileInputField && fileInputField.files) {
      const fileToUpload = fileInputField.files[0];
      if (fileToUpload) {
        this.appendFile(fileToUpload);
      }
    }
  }

  /**
   * Converts the file to base64 and sets the filesize and filename texts.
   * @param file
   */
  appendFile(file: File): void {

    if (!file) return ;

    this.hasFile = true;
    this.filename = file.name;
    this.filesize = Math.round(file.size / 1000).toString() + "KB";
    this.file = file;
  }

  uploadFile(): void {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        let base64FileData = e.target.result as string;
        this.fileData = base64FileData.split(",")[1];

        // Datei muss noch hochgeladen werden.
        this.uploaded = true;
      }
    };

    reader.onerror = (e: ProgressEvent<FileReader>) => {
      // Hier mussen wir noch entsprechende fehlermeldujng einbauen
      console.error("Error reading file", e);
    };

    reader.readAsDataURL(this.file!);
  }

  deleteFile(): void {
    this.filename = "";
    this.filesize = "";
    this.hasFile = false;
    this.fileData = "";
    this.currentSite = 1;
    this.uploaded = false;
    this.file = undefined;
  }

  async copyFileUrl() {
    await navigator.clipboard.writeText("@ToDo…");
  }

}
