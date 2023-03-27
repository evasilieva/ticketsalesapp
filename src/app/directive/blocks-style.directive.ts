import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  activeElementIndex: number = 0;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      console.log(this.el.nativeElement);
      console.log(this.items);
      if (this.initFirst) {
        if (this.items[0]) {
          this.items[0].classList.add('border');
          this.items[0].classList.add('border-primary');
        }
      }
    }

    setTimeout(() => {
      this.renderComplete.emit(true);
    })
  }

  ngOnChanges(data: SimpleChanges) {
    console.log(data);
  }

  initKeyUp(ev: KeyboardEvent): void {
    if (ev.key === 'ArrowRight') {
      if (this.activeElementIndex + 1 >= this.items.length) {
        return;
      }
      (this.items[this.activeElementIndex] as HTMLElement) ? this.items[this.activeElementIndex].classList.remove('border', 'border-primary') : null;
      this.activeElementIndex++;
      if (this.items[this.activeElementIndex]) {
        this.items[this.activeElementIndex].classList.add('border', 'border-primary');
      }
    } else if (ev.key === 'ArrowLeft') {
      if (this.activeElementIndex - 1 < 0) {
        return;
      }
      (this.items[this.activeElementIndex] as HTMLElement) ? this.items[this.activeElementIndex].classList.remove('border', 'border-primary') : null;
      this.activeElementIndex--;
      if (this.items[this.activeElementIndex]) {
        this.items[this.activeElementIndex].classList.add('border', 'border-primary');
      }
    }

  }

  initStyle(index: number) {
    if (this.items[index]) {
      this.activeElementIndex = index;
      this.items[this.activeElementIndex].classList.add('border', 'border-primary');
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }
}
