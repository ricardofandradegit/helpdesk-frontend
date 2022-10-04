import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

tecnico: Tecnico = {
  id: '',
  nome: '',
  cpf: '',
  email: '',
  senha: '',
  perfis: [],
  dataCriacao: ''
}

nome: FormControl = new   FormControl(null, Validators.minLength(3));
cpf: FormControl = new    FormControl(null, Validators.required);
email: FormControl = new  FormControl(null, Validators.email);
senha: FormControl = new  FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.tecnico).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos']);
    }, ex => {
      console.log(ex);
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        if(ex.error.message != '') {
          this.toast.error(ex.error.message);
        } else {
          this.toast.error('Problemas ao incluir técnico, favor verificar informações de CPF.');
        }
        
      }
    })
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
     // console.log(this.tecnico.perfis);
    } else {
      this.tecnico.perfis.push(perfil);
     // console.log(this.tecnico.perfis);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

}
