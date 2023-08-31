import {
  Component,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import anime from "animejs";
import { DialogService } from "primeng/dynamicdialog";
import { Color } from "src/app/shared/auto-generated/apis";
import { HowToMixComponent } from "src/app/shared/components/how-to-mix/how-to-mix.component";
import { ColorUtils, HSLColor } from "src/app/shared/utils";

@Component({
  selector: "app-universal-gradient-palette",
  templateUrl: "./universal-gradient-palette.component.html",
  styleUrls: ["./universal-gradient-palette.component.scss"],
})
export class UniversalGradientPaletteComponent {
  @Input() cardCss = "";
  @Input() isDarkening = false;

  private _color: Color = new Color({
    red: 0,
    green: 0,
    blue: 0,
  });

  private hsl: HSLColor = ColorUtils.toHSL(this._color);
  @Input() set color(value: Color) {
    this._color = value;
    this.hsl = ColorUtils.toHSL(value);
  }

  get color(): Color {
    return this._color;
  }

  steps = 5;
  @ViewChild("card") card!: ElementRef<HTMLDivElement>;
  animation?: anime.AnimeInstance;
  shouldPlayAnimation = true;
  @ViewChildren("grow") grows!: QueryList<ElementRef<HTMLDivElement>>;

  /// Methods
  constructor(private $dialog: DialogService) {}

  private refresh() {
    this.animation = anime({
      targets: this.grows.map((g) => g.nativeElement),
      scale: [
        { value: 0.5, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1000 },
      ],
      delay: anime.stagger(200),
    });
  }

  ngAfterViewInit(): void {
    this.grows.changes.subscribe(() => {
      this.refresh();
    });

    this.refresh();
  }

  getColor(step: number) {
    // #845EC2 -> hsl(263, 45%, 56%)
    // #D65DB1 -> hsl(318, 60%, 60%)
    // #ff6f91 -> hsl(346, 100%, 72%)
    // #FF9671 -> hsl(16, 100%, 72%)
    // #ffc75f -> hsl(39, 100%, 69%)
    // #F9F871 -> hsl(60, 92%, 71%)

    const result = ColorUtils.toHex("hsl", {
      h: this.hsl.h,
      s: this.hsl.s,
      l: this.isDarkening
        ? this.hsl.l - (this.hsl.l * step) / this.steps
        : this.hsl.l + ((100 - this.hsl.l) * step) / this.steps,
    });

    return result;
  }

  showHowToMix(hex: any) {
    if (!hex) return;
    const color = ColorUtils.toColor(hex);

    this.$dialog.open(HowToMixComponent, {
      header: `How to mix color ${hex}`,
      draggable: true,
      data: {
        color: color,
        showColorPalettesHidden: true,
      },
    });
  }

  @HostListener("document:scroll", ["$event"])
  public onViewportScroll() {
    // ⤵️ Captures / defines current window height when called
    const windowHeight = window.innerHeight;
    const boundingRect = this.card.nativeElement.getBoundingClientRect();

    if (boundingRect.top >= 0 && boundingRect.bottom <= windowHeight) {
      if (this.shouldPlayAnimation) {
        this.shouldPlayAnimation = false;
        this.animation?.play();
      }
    } else {
      this.shouldPlayAnimation = true;
    }
  }
}
