import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.sass']
})
export class VirtualKeyboardComponent implements OnInit, AfterViewInit {
  keyboard!: Keyboard;
  isKeyboardClick = false;

  @Input() activeFormControl?: AbstractControl;

  @ViewChild('keyboard') keyboardElement!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button)
    });
  }

  onChange(input: string) {
    this.activeFormControl!.setValue(input);
  };

  onKeyPress(button: string) {
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift() {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
    this.keyboardElement.nativeElement.classList.add('active');
  };

  onKeyboardClick() {
    this.isKeyboardClick = true;
    setTimeout(() => {
      this.isKeyboardClick = false;
    });
  }
}
