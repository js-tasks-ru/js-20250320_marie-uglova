class Tooltip {
  constructor () {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;

    this.element = document.createElement('div');
    this.element.className = 'tooltip';
  }

  initialize () {
    this.tooltip = document.querySelector('[data-tooltip]');

    this.tooltip.addEventListener('pointerover', this.render);
    this.tooltip.addEventListener('pointerout', this.remove);
    this.tooltip.addEventListener('pointermove', this.updatePosition);
  }

  render = (event) => {
    this.element.textContent = event.target?.dataset.tooltip;
    document.body.append(this.element);
    this.updatePosition(event);
  };

  updatePosition = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const offset = 15;

    const tooltipWidth = this.element.offsetWidth;
    const tooltipHeight = this.element.offsetHeight;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = x + offset;
    let top = y + offset;

    if (left + tooltipWidth > windowWidth) {
      left = x - offset - tooltipWidth;
    }

    if (top + tooltipHeight > windowHeight) {
      top = y - offset - tooltipHeight;
    }

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  remove = () => {
    this.element.remove();
  };

  destroy() {
    this.tooltip.removeEventListener('pointerover', this.render);
    this.tooltip.removeEventListener('pointerout', this.remove);
    this.tooltip.removeEventListener('pointermove', this.updatePosition);
    this.remove();
    Tooltip.instance = null;
  }

}

export default Tooltip;
