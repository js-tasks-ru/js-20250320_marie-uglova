export default class DoubleSlider {
  constructor({
    min = 100,
    max = 200,
    formatValue = value => value,
    selected = {}
  } = {}) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected;
    this.currentFrom = selected.from || min;
    this.currentTo = selected.to || max;

    this.createElement();
    this.addEventListeners();
    this.update();
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'range-slider';
    this.element.innerHTML = `
      <span data-element="from">${this.formatValue(this.currentFrom)}</span>
      <div class="range-slider__inner">
        <span class="range-slider__progress"></span>
        <span class="range-slider__thumb-left"></span>
        <span class="range-slider__thumb-right"></span>
      </div>
      <span data-element="to">${this.formatValue(this.currentTo)}</span>
    `;

    this.subElements = {
      from: this.element.querySelector('[data-element="from"]'),
      to: this.element.querySelector('[data-element="to"]'),
      progress: this.element.querySelector('.range-slider__progress'),
      thumbLeft: this.element.querySelector('.range-slider__thumb-left'),
      thumbRight: this.element.querySelector('.range-slider__thumb-right'),
      inner: this.element.querySelector('.range-slider__inner')
    };
  }

  addEventListeners() {
    this.subElements.thumbLeft.addEventListener('pointerdown', this.onThumbPointerDown);
    this.subElements.thumbRight.addEventListener('pointerdown', this.onThumbPointerDown);
  }

  onThumbPointerDown = event => {
    event.preventDefault();
    const thumbElem = event.target;

    document.addEventListener('pointermove', this.onThumbPointerMove);
    document.addEventListener('pointerup', this.onThumbPointerUp);

    this.dragging = thumbElem;
    this.element.classList.add('range-slider_dragging');
  }

  onThumbPointerMove = event => {
    event.preventDefault();
    const { left, width } = this.subElements.inner.getBoundingClientRect();
    const clientX = event.clientX;

    let newPercent = (clientX - left) / width * 100;

    if (this.dragging === this.subElements.thumbLeft) {
      newPercent = Math.min(newPercent, this.getRightPercent());
      newPercent = Math.max(newPercent, 0);
      this.currentFrom = Math.round(this.min + (this.max - this.min) * newPercent / 100);
    } else {
      newPercent = Math.max(newPercent, this.getLeftPercent());
      newPercent = Math.min(newPercent, 100);
      this.currentTo = Math.round(this.min + (this.max - this.min) * newPercent / 100);
    }

    this.update();
  }

  onThumbPointerUp = () => {
    this.element.classList.remove('range-slider_dragging');
    document.removeEventListener('pointermove', this.onThumbPointerMove);
    document.removeEventListener('pointerup', this.onThumbPointerUp);

    this.element.dispatchEvent(new CustomEvent('range-select', {
      detail: { from: this.currentFrom, to: this.currentTo },
      bubbles: true
    }));
  }

  getLeftPercent() {
    return (this.currentFrom - this.min) / (this.max - this.min) * 100;
  }

  getRightPercent() {
    return (this.currentTo - this.min) / (this.max - this.min) * 100;
  }

  update() {
    const leftPercent = this.getLeftPercent();
    const rightPercent = 100 - this.getRightPercent();

    this.subElements.progress.style.left = `${leftPercent}%`;
    this.subElements.progress.style.right = `${rightPercent}%`;

    this.subElements.thumbLeft.style.left = `${leftPercent}%`;
    this.subElements.thumbRight.style.right = `${rightPercent}%`;

    this.subElements.from.textContent = this.formatValue(this.currentFrom);
    this.subElements.to.textContent = this.formatValue(this.currentTo);
  }

  destroy() {
    this.element.remove();
    document.removeEventListener('pointermove', this.onThumbPointerMove);
    document.removeEventListener('pointerup', this.onThumbPointerUp);
    document.removeEventListener('pointerdown', this.onThumbPointerDown);
  }
}
