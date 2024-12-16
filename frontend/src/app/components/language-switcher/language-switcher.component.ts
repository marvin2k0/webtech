import {Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  translateService: TranslateService = inject(TranslateService)

  languages: { code: string, name: string }[] = [
    {code: "en", name: "English"},
    {code: "de", name: "German"}
  ]

  changeLanguage(language: string): void {
    this.translateService.use(language)
  }
}
