import { TranslateService } from '../../core/services/TranslateService/translate.service';
import { TranslatePipe } from './../../core/pipes/translate.pipe';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  constructor(public translateService: TranslateService) {}

  ngOnInit() {}

  onChangeLanguage(event: Event) {
    const select = event.target as HTMLSelectElement;
    console.log(select.value);
    this.translateService.setLanguage(select.value);
  }

  // public readonly name = "Dana Alexandra Pascal";
  // public readonly description = "Desarrolladora Fullstack";
  // public readonly about = "Sobre mi";
  // public readonly skills = "Habilidades";
  // public readonly workExperience = "Experiencia laboral";
  // public readonly education = "Educacion";
  // public readonly projects = "Proyectos";
  // public readonly contact = "Contacto";

}
