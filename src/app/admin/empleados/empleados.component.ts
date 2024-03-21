import { Component } from '@angular/core';
import { FormBuilder, Validators,AbstractControl, ValidatorFn } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  empleadoForm = this.fb.group({
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    rfc: ['', [Validators.required, this.lengthValidator(13)]],
    fechaNacimiento: ['', Validators.required],
    curp: ['', [Validators.required, this.lengthValidator(18)]]
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  onSubmit() {
    if (this.empleadoForm.valid) {
      const formData = this.empleadoForm.value;
      this.http.post('http://localhost:8080/api/v1/empleados', formData).subscribe(
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

  lengthValidator(length: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isLengthValid = control.value && control.value.length === length;
      return !isLengthValid ? {'invalidLength': {value: control.value}} : null;
    };
  }
}
