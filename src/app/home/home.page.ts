import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  produtos: any[] = [];

  constructor(public ac : AlertController) {
    this.CarregarLista();
  }

  async MostrarAdd(){
    const alert = await this.ac.create({
      cssClass: 'my-custom-class',
      header: 'Insira o nome do produto',
      inputs: [
        {
          name: "Tarefa",
          type: 'text',
          placeholder: 'Nome do produto'
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("Cancelar Funfando");
          }
        },
        {
          text: "Adicionar",
          handler: (form) => {
            this.Add(form.Tarefa);
            console.log("Adicionar Funfando");
            console.log();
          }
        }
      ]
    });
    await alert.present();
  }

  async Add(task: string){
    let prod = {name: task.toUpperCase(), marcado: false};
    this.produtos.push(prod);
    this.AtualizarEstoque();
  }

  Remover(task: object){
    this.produtos = this.produtos.filter((prodArray) => prodArray != task);
    this.AtualizarEstoque();
  }

  CarregarLista(){
    let task = localStorage.getItem('tarefaDb');
    if(task){
      this.produtos = JSON.parse(task);
      console.log(task);
    }
  }

  Checar(task){
    if(!task.marcado)
    task.marcado = true;
    else
    task.marcado = false;

    this.AtualizarEstoque();
  }

  AtualizarEstoque(){
    localStorage.setItem('tarefaDb', JSON.stringify(this.produtos));
  }
}
