export default class NotificationMessage {
    static lastShownComponent;
    element = document.createElement("div");
    duration = 0;

    constructor(message, options) {
      this.duration = options?.duration;
      this.element.className = `notification ${options?.type}`;
      this.element.innerHTML = `
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${options?.type}</div>
                <div class="notification-body">
                    ${message}
                </div>
            </div>
        `;
      this.element.style.setProperty("--value", this.duration + "ms");
    }

    show(body = document.body) {
      if (NotificationMessage.lastShownComponent) {
        NotificationMessage.lastShownComponent.remove();
      }
      NotificationMessage.lastShownComponent = this;

      body.append(this.element);

      this.timerId = setTimeout(() => {
        this.remove();
      }, this.duration);
    }

    remove() {
      this.element.remove();
    }

    destroy() {
      clearTimeout(this.timerId);
      this.remove();
    }
}
