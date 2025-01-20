import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UploadModalService} from '../../services/uplaod-modal.service';
import {UserService} from '../../services/user.service';
import {FileUploadService} from '../../services/file-upload.service';
import {FormsModule} from '@angular/forms';
import {equals} from '@ngx-translate/core';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    FormsModule
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

  userService: UserService = inject(UserService)

  @ViewChild('dragDropField') dragDropField: ElementRef | undefined;
  @Input() currentSite: number = 1;
  uploaded: boolean = false;
  file: File | undefined;

  private fileUploadService: FileUploadService = inject(FileUploadService);
  selectedOption: string = "0";
  isCourseSelectionVisible: boolean = false;

  fileLink: string = "";
  enrolledCourses: String[] = [];


  constructor(protected modalService: UploadModalService) {}


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

    // Ugly nested code. @ToDo: Refactor

    console.log("Enter Uplaod File...")
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) return ;

      let base64FileData = e.target.result as string;
      this.fileData = base64FileData.split(",")[1];

      const courseField = document.getElementById("file-course") as HTMLSelectElement;
      const course = courseField?.value;

      const visibilityField = document.getElementById("file-visibility") as HTMLSelectElement;
      const visibility = visibilityField?.value;

      const descriptionField = document.getElementById("file-description") as HTMLTextAreaElement;
      const description = descriptionField?.value;

      this.fileUploadService.upload({ filename: this.filename, course, visibility, fileContent: this.fileData, description })?.subscribe(response => {

        if (response.successful) {
          this.fileLink = "http://localhost:4200/files/read?filename=" + response.data.rndFilename;

          this.uploaded = true;
          console.log("response", response)
          console.log("Success!")
          this.currentSite++;
        } else {
          console.error("Fehler bei verarbeitung")
        }
      })

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
    await navigator.clipboard.writeText(this.fileLink);
  }

  closeModal(): void {
    this.deleteFile();
    this.modalService.closeModal();
  }

  canDeny() {
    return this.currentSite < 3;
  }

  onDeny(): void {
    switch (this.currentSite) {
      case 1:
        this.deleteFile()
        this.modalService.closeModal();
        break;
      case 2:
        this.currentSite--;
        break;
      case 3:
      default:
        this.deleteFile()
        this.modalService.closeModal();
    }
  }

  getDenyButtonText(): string {
    switch (this.currentSite) {
      case 1:
        return "Cancel"
      case 2:
        return "Go Back"
      case 3:
      default:
        return "";
    }
  }

  onConfirm() {
    if (!this.hasFile) return ;
    switch (this.currentSite) {
      case 1:
        this.currentSite++
        break;
      case 2:
        this.uploadFile();
        break;
      case 3:
        this.deleteFile()
        this.modalService.closeModal();
    }
  }

  getConfirmButtonText() {
    switch (this.currentSite) {
      case 1:
        return "Next"
      case 2:
        return "Upload"
      case 3:
      default:
        return "Ok";
    }
  }

  canConfirm(): boolean {
    switch (this.currentSite) {
      case 1:
      case 2:
      case 3:
        return this.hasFile;
      default:
        return false;
    }
  }

  onSelectionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === '2') {
      // Load the courses taht the user is enrolled in
      // @ToDo:   Refactor!!!
      this.userService.getUserInformation().subscribe(response => {
        console.log(JSON.stringify(response))
        this.enrolledCourses = response.data.enrolledCourses;
      });

      this.isCourseSelectionVisible = true;
    } else {
      this.isCourseSelectionVisible = false;
    }
  }
}
