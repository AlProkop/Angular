import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Output() addNew = new EventEmitter(); 

  constructor(protected dataService: DataService) { }

  ngOnInit() {}

  onClickAdd(){
    this.addNew.emit();
  }

  onClickHome(){
    this.dataService.onGoHome();
  }
}
