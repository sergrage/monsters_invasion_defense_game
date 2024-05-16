interface IDocument {
  mozCancelFullScreen?(): Promise<void>;
  msExitFullscreen?(): Promise<void>;
  webkitExitFullscreen?(): Promise<void>;
  mozFullscreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
}

interface IHTMLElement {
  msRequestFullscreen?(): Promise<void>;
  mozRequestFullscreen?(): Promise<void>;
  webkitRequestFullscreen?(): Promise<void>;
}

export const toggleFullscreen = (
  elem: Element & IHTMLElement & IDocument = document.body,
): void => {
  elem = elem || document.documentElement;

  if (
    !document.fullscreenElement &&
    !(document as IDocument).mozFullscreenElement &&
    !(document as IDocument).webkitFullscreenElement &&
    !(document as IDocument).msFullscreenElement
  ) {
    let hasFullscreen =
      elem.requestFullscreen ||
      elem.msRequestFullscreen ||
      elem.mozRequestFullscreen ||
      elem.webkitRequestFullscreen ||
      false;
    if (hasFullscreen) {
      hasFullscreen.call(elem);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as IDocument).msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen();
    } else if ((document as IDocument).mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
    } else if ((document as IDocument).webkitExitFullscreen) {
      // @ts-ignore
      document.webkitExitFullscreen();
    }
  }
};
