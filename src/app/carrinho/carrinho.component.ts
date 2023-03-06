import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = []
  total = 0
  constructor(
    public carrinhoService: CarrinhoService,
    private router : Router
  ){}
  
  ngOnInit(): void {
      this.itensCarrinho = this.carrinhoService.obterCarrinho()
      this.calcularTotal()
  }

  calcularTotal(){
    this.total = this.itensCarrinho.reduce((ant, atual) => ant + (atual.preco * atual.quantidade),0)
  }

  removeProdutoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho?.filter(item => item.id !== produtoId)
    this.carrinhoService.removerProdutoDoCarrinho(produtoId)
    this.calcularTotal()
  }

  comprar(){
    alert("Parabéns, você finalizou sua compra!")
    this.carrinhoService.limparCarrinho()
    this.router.navigate(['produtos'])
  }
}
