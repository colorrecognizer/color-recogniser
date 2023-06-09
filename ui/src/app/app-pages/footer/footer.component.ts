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
  isAnimationPlaying = false;

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

    const textWrapper = document.querySelector(".ml2")!;
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

    // ⤵️ IF the top of the element is greater or = to 0 (it's not ABOVE the viewport)
    // AND IF the bottom of the element is less than or = to viewport height
    // show the corresponding icon after half a second
    // else hide all icons
    if (boundingRect.top >= 0 && boundingRect.bottom <= windowHeight) {
      if (!this.isAnimationPlaying) {
        this.isAnimationPlaying = true;
        this.animations.forEach((a) => a.play());
      }
    } else {
      if (this.isAnimationPlaying) {
        this.isAnimationPlaying = false;
        this.animations.forEach((a) => a.pause());
      }
    }
  }
}
