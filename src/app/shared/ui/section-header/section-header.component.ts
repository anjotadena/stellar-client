import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc-section-header',
  standalone: true,
  imports: [],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input() title: string = "";

  @Input() breadCrumbs = [{
    title: "Home",
    link: "/"
  }]
}
