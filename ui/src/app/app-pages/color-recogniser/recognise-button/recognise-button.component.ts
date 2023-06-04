import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import anime from "animejs";

@Component({
  selector: "app-recognise-button",
  templateUrl: "./recognise-button.component.html",
  styleUrls: ["./recognise-button.component.scss"],
})
export class RecogniseButtonComponent implements AfterViewInit {
  @ViewChild("logo") logo!: ElementRef<HTMLImageElement>;
  @Output() clicked = new EventEmitter();

  _disabled = false;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.normalAnimation?.pause();
      this.loadingAnimation?.seek(
        (this.loadingAnimation.duration * this.normalAnimation.progress) / 100
      );
      this.loadingAnimation?.play();
    } else {
      this.loadingAnimation?.pause();
      this.normalAnimation?.seek(
        (this.normalAnimation.duration * this.loadingAnimation.progress) / 100
      );
      this.normalAnimation?.play();
    }
  }

  get disabled(): boolean {
    return this._disabled;
  }

  normalAnimation: any;
  loadingAnimation: any;
  targets: any;

  ngAfterViewInit(): void {
    this.targets = [this.logo.nativeElement];
    this.normalAnimation = anime({
      targets: this.targets,
      loop: true,
      autoplay: true,
      rotate: -360,
      duration: 5000,
      easing: "linear",
    });

    this.loadingAnimation = anime({
      targets: this.targets,
      loop: true,
      autoplay: false,
      rotate: -360,
      duration: 1000,
      easing: "linear",
    });
  }

  click() {
    this.clicked.emit();
  }
}
