import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() inputType: string = '';
  @Input() placeholder: string = '';
  @Input() class: string = '';
  @Input() HasIconLeft: boolean = false;
}
