import { Component } from "@angular/core";
import { BackgroundChangeService } from "src/app/shared/services/background-change.service";

@Component({
  selector: "app-json-escape-unescape",
  templateUrl: "./json-escape-unescape.component.html",
  styleUrls: ["./json-escape-unescape.component.scss"],
})
export class JsonEscapeUnescapeComponent {
  srcString = "";
  destString = "";
  buttonsDisabled = false;

  constructor(private $backgroundChange: BackgroundChangeService) {}

  escape() {
    let output = "";
    for (let i = 0; i < this.srcString.length; ++i) {
      const ch = this.srcString[i];
      if (ch == "\n") {
        output = output.concat("\\n");
      } else if (ch == "\t") {
        output = output.concat("\\t");
      } else if (ch == "\r") {
        output = output.concat("\\r");
      } else if (ch == "\\") {
        output = output.concat("\\\\");
      } else if (ch == "\"") {
        output = output.concat("\\\"");
      } else if (ch == "\b") {
        output = output.concat("\\b");
      } else if (ch == "\f") {
        output = output.concat("\\f");
      } else {
        output = output.concat(ch);
      }
    }

    this.destString = output;
    this.$backgroundChange.randomize();
  }

  unescape() {
    let builder = "";

    let i = 0;
    while (i < this.srcString.length) {
      const delimiter = this.srcString.charAt(i);
      i++; // consume letter or backslash

      if (delimiter == "\\" && i < this.srcString.length) {
        // consume first after backslash
        const ch = this.srcString.charAt(i);
        i++;

        if (ch == "\\" || ch == "/" || ch == "\"" || ch == "'") {
          builder = builder.concat(ch);
        } else if (ch == "n") builder = builder.concat("\n");
        else if (ch == "r") builder = builder.concat("\r");
        else if (ch == "t") builder = builder.concat("\t");
        else if (ch == "b") builder = builder.concat("\b");
        else if (ch == "f") builder = builder.concat("\f");
        else if (ch == "u") {
          let hex = "";

          // expect 4 digits
          if (i + 4 > this.srcString.length) {
            throw Error("Not enough unicode digits!");
          }

          const sub = this.srcString.substring(i, i + 4);
          for (let j = i; j < i + 4; ++j) {
            const x = sub.charAt(j);
            if (!/^[A-Za-z0-9]*$/.test(x))
              throw Error("Bad character in unicode escape.");
            hex = hex.concat(x.toLowerCase());
          }

          i += 4; // consume those four digits.

          const code = Number.parseInt(hex, 16);
          builder = builder.concat(String.fromCharCode(code));
        } else {
          throw Error("Illegal escape sequence: \\" + ch);
        }
      } else {
        // it's not a backslash, or it's the last character.
        builder = builder.concat(delimiter);
      }
    }

    this.destString = builder;
    this.$backgroundChange.randomize();
  }

  beautify() {
    try {
      const obj = JSON.parse(this.srcString);
      this.destString = JSON.stringify(obj, null, 2);
      this.$backgroundChange.randomize();
    } catch {
      throw Error("Invalid JSON format!");
    }
  }

  onTextareaKeyDown(event: KeyboardEvent, textArea: HTMLTextAreaElement) {
    if (event.key === "Tab") {
      textArea.setRangeText(
        "  ",
        textArea.selectionStart,
        textArea.selectionStart,
        "end"
      );

      return false;
    }

    return true;
  }
}
