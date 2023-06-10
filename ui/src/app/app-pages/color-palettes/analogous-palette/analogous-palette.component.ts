import {
  AfterViewInit,
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
import { ColorUtils } from "src/app/shared/utils";

@Component({
  selector: "app-analogous-palette",
  templateUrl: "./analogous-palette.component.html",
  styleUrls: ["./analogous-palette.component.scss"],
})
export class AnalogousPaletteComponent implements AfterViewInit {
  @Input() cardCss = "";
  colors: Color[] = [];
  @Input() label = "Analogous";

  private _color: Color = new Color({
    red: 0,
    green: 0,
    blue: 0,
  });

  @Input() set color(value: Color) {
    this._color = value;
    this.refresh();
  }

  get color(): Color {
    return this._color;
  }

  private _hueVariation = 30;
  @Input() set hueVariation(value: number) {
    this._hueVariation = value;
    this.refresh();
  }

  get hueVariation(): number {
    return this._hueVariation;
  }

  @ViewChild("card") card!: ElementRef<HTMLDivElement>;
  animation?: anime.AnimeInstance;
  shouldPlayAnimation = true;
  @ViewChildren("grow") grows!: QueryList<ElementRef<HTMLDivElement>>;

  /// Methods
  constructor(private $dialog: DialogService) {}

  ngAfterViewInit(): void {
    this.animation = anime({
      targets: this.grows.map((g) => g.nativeElement),
      scale: [
        { value: 0.5, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 1000 },
      ],
      delay: anime.stagger(200),
    });
  }

  refresh() {
    this.colors.length = 0;

    for (let i = this.label === "Complementary" ? 1 : 0; i < 3; ++i) {
      const hsl = ColorUtils.toHSL(this.color);
      const hex = ColorUtils.toHex("hsl", {
        h: (360 + ((hsl.h + (i - 1) * this.hueVariation) % 360)) % 360,
        s: hsl.s,
        l: hsl.l,
      });

      this.colors.push(ColorUtils.toColor(hex));
    }
  }

  showHowToMix(color: Color) {
    if (!color) return;

    this.$dialog.open(HowToMixComponent, {
      header: `How to mix color ${color.hexValue}`,
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
