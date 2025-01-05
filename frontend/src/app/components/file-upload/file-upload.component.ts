import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NgIf
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
    this.hasFile = true;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      this.filename = file.name;
      this.filesize = Math.round(file.size / 1000).toString() + "KB";

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          let base64FileData = e.target.result as string;
          this.fileData = base64FileData.split(",")[1];
          console.log(this.fileData);
        }
      };

      reader.onerror = (e: ProgressEvent<FileReader>) => {
        // Hier mussen wir noch entsprechende fehlermeldujng einbauen
        console.error("Error reading file", e);
      };

      reader.readAsDataURL(file);

      // Clear the data from the drag event
      event.dataTransfer.clearData();
    }
  }


}
