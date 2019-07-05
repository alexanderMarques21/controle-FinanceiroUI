import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

@Input() error: string;
@Input() control: FormControl;
@Input() text: string;

  constructor() { }

  ngOnInit() {
  }

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
