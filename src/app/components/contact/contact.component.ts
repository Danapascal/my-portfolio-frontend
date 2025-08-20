import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  onSubmit() {
    alert(`Gracias, ${this.name}. Tu mensaje ha sido enviado.`);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
