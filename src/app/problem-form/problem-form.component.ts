import { Component, OnInit, Input} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss']
})
export class ProblemFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() problem = new FormControl('', Validators.required);


}
