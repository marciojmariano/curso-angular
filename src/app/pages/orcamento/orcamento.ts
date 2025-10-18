import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-orcamento',
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './orcamento.html',
  styleUrl: './orcamento.scss'
})
export class Orcamento {

}

