import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-acces',
  templateUrl: './set-acces.component.html',
  styleUrls: ['./set-acces.component.css']
})
export class SetAccesComponent implements OnInit {

  private right:String[] = ['*', 'admin', 'user', 'investor'];
  public visible:boolean = false;
  public visibleAnimate:boolean = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
