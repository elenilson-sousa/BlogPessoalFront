import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0,0)


  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin)=>{
      this.usuarioLogin = resp

      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id
      environment.nome =  this.usuarioLogin.nome
      environment.token = this.usuarioLogin.token

      this.router.navigate(['/inicio'])
    }, erro =>{
      if(erro.status == 500){
     alert('Usuário ou senha estão incorretos!')
      }
    })
  }

}
