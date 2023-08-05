import { Component, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { Subscription } from "rxjs";
import { Color } from "src/app/shared/auto-generated/apis";
import { ColorPickerTypeComponent } from "src/app/shared/components/formly-form/color-picker-type/color-picker-type.component";
import { ColorUtils } from "src/app/shared/utils";

@Component({
  selector: "app-color-palettes",
  templateUrl: "./color-palettes.component.html",
  styleUrls: ["./color-palettes.component.scss"],
})
export class ColorPalettesComponent implements OnDestroy {
  form = new FormGroup({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any = {
    color: {
      r: 0,
      g: 34,
      b: 238,
    },
  };

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "color",
      type: ColorPickerTypeComponent,
      props: {
        required: true,
      },
    },
  ];

  readonly cardCss = "surface-card p-3 lg:p-5 shadow-2 border-round-md";
  color = new Color({
    red: this.model.color.r,
    green: this.model.color.g,
    blue: this.model.color.b,
  });

  private routeSub: Subscription;

  /// Methods
  constructor($title: Title, $route: ActivatedRoute, $meta: Meta) {
    $title.setTitle("Color Palettes");
    $meta.addTags([
      {
        name: "description",
        content:
          "Discover a world of captivating color palettes on our Color Palettes page. Explore a diverse collection of harmonious color combinations for your designs, artworks, and creative projects. Get inspired and find the perfect color schemes to elevate your creations.",
      },
    ]);

    this.routeSub = $route.params.subscribe((params) => {
      if (!params["hex"]) return;

      const color = ColorUtils.toColor(params["hex"]);
      this.model.color = {
        r: color.red,
        g: color.green,
        b: color.blue,
      };

      this.submit();
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  submit() {
    this.color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });
  }
}
