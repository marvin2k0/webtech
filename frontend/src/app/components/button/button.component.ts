import {booleanAttribute, Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'cta-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  private router: Router = inject(Router)

  @Input() link: string | null = null
  @Input() buttonStyle: "cta" | "secondary" | "disabled" = "cta"
  @Input() size: "square" | "wide" | "normal" = "normal"
  @Input({transform: booleanAttribute}) raised: boolean = true

  navigate() {
    if (this.link)
      this.router.navigateByUrl(this.link).then()
  }
}
