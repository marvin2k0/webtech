import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent implements OnInit{
  @ViewChild("languageSwitcher") languageSwitcher!: ElementRef;
  localStorageLanguageKey = "lang"
  translateService: TranslateService = inject(TranslateService)

  languages: { code: string, name: string }[] = [
    {code: "en", name: "English"},
    {code: "de", name: "German"}
  ]

  ngOnInit(): void {
    if (localStorage.getItem(this.localStorageLanguageKey)) {
      const localStorageLang = localStorage.getItem(this.localStorageLanguageKey)!
      this.translateService.use(localStorageLang)
      console.log(`Found language ${localStorageLang} in localStorage`)
    }
  }

  ngAfterViewInit(): void {
    this.languageSwitcher.nativeElement.value = this.translateService.currentLang;
  }

  changeLanguage(language: string): void {
    this.translateService.use(language)
    localStorage.setItem("lang", language)
  }

  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.changeLanguage(selectedLanguage);
  }
}
