import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { RouteEnum } from "src/app/shared/utils";
import anime from "animejs";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements AfterViewInit {
  @ViewChild("footer") footer!: ElementRef<HTMLDivElement>;
  @ViewChild("logo") logo!: ElementRef<HTMLImageElement>;
  animations: anime.AnimeInstance[] = [];

  constructor(private $router: Router) {}

  ngAfterViewInit(): void {
    this.animations.push(
      anime({
        targets: [this.logo.nativeElement],
        loop: true,
        duration: 3000,
        rotate: -360,
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const textWrapper = document.querySelector(".ml2")!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    textWrapper.innerHTML = textWrapper.textContent!.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    this.animations.push(
      anime({
        targets: ".ml2 .letter",
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i,
      })
    );

    this.animations.push(
      anime({
        targets: ".icon",
        delay: anime.stagger(100), // increase delay by 100ms for each elements.
        translateY: -10,
        direction: "alternative",
      })
    );
  }

  navigateToColorRecogniser() {
    this.$router.navigate([RouteEnum.HomePage]);
  }

  @HostListener("document:scroll", ["$event"])
  public onViewportScroll() {
    // ⤵️ Captures / defines current window height when called
    const windowHeight = window.innerHeight;
    const boundingRect = this.footer.nativeElement.getBoundingClientRect();

    if (boundingRect.top >= 0 && boundingRect.bottom <= windowHeight) {
      this.animations.forEach((a) => a.play());
    }
  }
}
