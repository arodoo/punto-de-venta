import { Component } from '@angular/core';
import { FormBuilder, Validators,AbstractControl, ValidatorFn } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productoForm = this.fb.group({
    clave: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: ['', [Validators.required, this.decimalValidator]],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  decimalValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const valid = /^\d+\.\d{2}$/.test(value);
    return valid ? null : { invalidNumber: true };
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const formData = this.productoForm.value;
      this.http.post('http://localhost:8080/api/v1/productos', formData).subscribe(
        (response) => {
          console.log('Datos enviados con éxito:', response);
         
        },
        (error) => {
          console.error('Error al enviar los datos:', error);
          
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
  

}
