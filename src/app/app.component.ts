import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { DownloadCvComponent } from './components/download-cv/download-cv.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    DownloadCvComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <app-about></app-about>
    <app-skills></app-skills>
    <app-experience></app-experience>
    <app-education></app-education>
    <app-download-cv></app-download-cv>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'cv-landing';
}

