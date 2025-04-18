import SortableTable from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTableV2 extends SortableTable {
  sortableCells = [];
  currentCell = null;
  caret = null;

  constructor(headerConfig, {data = [], sorted = {}} = {}) {
    super(headerConfig, data);

    this.sorted = sorted;
    this.sortableCells = this.element.querySelectorAll('[data-sortable="true"]');
    this.caret = this.createArrow();

    this.defaultSort();
    this.sortableCells.forEach((el) => {
      el.addEventListener('pointerdown', this.sortHandler);
    });
  }

  defaultSort() {
    if (this.sorted.id) {
      this.sort(this.sorted.id, this.sorted.order);
    }
  }

  createArrow() {
    const el = document.createElement('div');
    el.innerHTML = `
    <span data-element='arrow' class='sortable-table__sort-arrow'>
    <span class='sort-arrow'></span>
    </span>    
    `;
    return el.firstElementChild;
  }

  sort(field, order = 'asc') {
    this.currentCell = this.element.querySelector(`[data-id='${field}']`);

    super.sort(field, order);

    this.currentCell.dataset.order = order;
    this.currentCell.append(this.caret);
  }

  sortHandler = (evt) => {
    this.sort(evt.currentTarget.dataset.id, evt.currentTarget.dataset.order === 'desc' ? 'asc' : 'desc');
  };

  destroy() {
    super.destroy();

    this.sortableCells.forEach((el) => {
      el.removeEventListener('pointerdown', this.sortHandler);
    });
  }

}
