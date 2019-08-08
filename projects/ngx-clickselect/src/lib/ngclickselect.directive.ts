import { Directive, HostListener, EventEmitter, Output } from "@angular/core";

@Directive({
  selector: "[ngxClickSelect]"
})
export class NgclickselectDirective {
  @Output() ngxClickSelect: any = new EventEmitter();

  constructor() {}
  private elementRef: any;
  private click = 0;
  private select = 0;
  private clickCounter: any = null;
  @HostListener("mousedown", ["$event"]) onMouseDown(event: any) {
    this.elementRef = event;
    this.select = 1;
  }

  @HostListener("mouseleave", ["$event"]) onMouseLeave(event: any) {
    if (this.select) {
      copyTextToClipboard();
    }
    this.select = 0;
  }

  @HostListener("click", ["$event"]) onClick(event: any) {
    this.select = 0;
    if (
      Math.abs(this.elementRef.screenX - event.screenX) < 10 &&
      this.click === 0
    ) {
      this.clickCounter = setTimeout(() => {
        this.ngxClickSelect.emit(event);
      }, 200);
      setTimeout(() => {
        this.click = 0;
      }, 500);
      this.click++;
    } else {
      clearTimeout(this.clickCounter);
      this.clickCounter = null;
      copyTextToClipboard();
    }
  }
}

function copyTextToClipboard() {
  let clipboardElement: any = document.getElementById("clipboard");
  let elementCreated: boolean = false;
  if (!clipboardElement) {
    clipboardElement = document.createElement("span");
    clipboardElement.id = "clipboard";
    clipboardElement.innerText = "Copied to Clipboard!!";
    clipboardElement.style.position = "fixed";
    clipboardElement.style.top = "90%";
    clipboardElement.style.left = "48%";
    clipboardElement.style.padding = "3px";
    clipboardElement.style.color = "#000000";
    clipboardElement.style.borderRadius = "5px";
    clipboardElement.style.display = "none";
    elementCreated = true;
  }
  let emptystring = [undefined, null, "", "\n"];
  if (
    window.getSelection().type !== "None" &&
    emptystring.indexOf(window.getSelection().toString()) == -1
  ) {
    try {
      document.body.appendChild(clipboardElement);
      document.execCommand("copy");
      clipboardElement.style.display = "block";
      setTimeout(function() {
        clipboardElement.style.display = "none";
        if (elementCreated) {
          clipboardElement.remove();
        }
      }, 900);
    } catch (err) {
      console.error("Could Not Copy", err);
    }
  }
}
