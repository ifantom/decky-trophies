import Platinum from "../../assets/trophies/trophy-platinum.png";
import { findClassByName, findSP } from "@decky/ui";

export function patchLibraryPage() {
  const document = findSP().window.document;
  const className = findClassByName("ClassAllAchieved");

  let style = document.getElementById("achievement-trophies-library-patch");

  if (!style && className) {
    style = document.createElement("style");
    style.id = "achievement-trophies-library-patch";
    style.textContent = `
      .${className} svg {
        background: url(${encodeURI(Platinum)});
        background-size: 40px;
        background-repeat: no-repeat;
        background-position: center;
        left: -16px !important;
        top: -12px !important;
      }
      
      .${className} svg * {
        display: none;
      }
    `;
    document.head.append(style);
  }
}

export function unpatchLibraryPage() {
  let style = findSP().window.document.getElementById("achievement-trophies-library-patch");

  console.log('unpatchLibraryPage', style);

  style?.remove();
}
