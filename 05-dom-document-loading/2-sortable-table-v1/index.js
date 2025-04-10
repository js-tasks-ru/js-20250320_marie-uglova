export default class SortableTable {
  element = document.createElement("div");
  subElements = {};
  config = [];
  data = [];

  constructor(headerConfig = [], data = []) {
    this.selectSubElements();
    this.config = headerConfig;
    this.data = data;
    this.element.dataset.element = "productsContainer";
    this.element.className = "products-list__container";
    this.element.innerHTML = this.template();
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createTableHeaderTemplate() {
    return this.config.map(columnConfig => (
      `<div class="sortable-table__cell" data-id="${columnConfig['id']}" data-sortable="${columnConfig['sortable']}">
                <span>${columnConfig['title']}</span>
            </div>`
    )).join('');
  }

  createTableBodyCellTemplate(product, columnConfig) {
    if (columnConfig.template) {
      return columnConfig.template(product);
    }
    const fieldId = columnConfig['id'];
    return `<div class="sortable-table__cell">${product[fieldId]}</div>`;
  }

  createTableBodyRowTemplate(product) {
    return `
            <a href="/products/${product.id}" class="sortable-table__row">
                ${this.config.map(columnConfig =>
    this.createTableBodyCellTemplate(product, columnConfig)
  ).join('')}
            </a>
        `;
  }

  createTableBodyTemplate() {
    return this.data.map(product => (
      this.createTableBodyRowTemplate(product)
    )).join('');
  }

  template() {
    return `
            <div class="sortable-table">
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.createTableHeaderTemplate()}
                </div>
                <div data-element="body" class="sortable-table__body">
                    ${this.createTableBodyTemplate()}
                </div>
                <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
                <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                    <div>
                        <p>No products satisfies your filter criteria</p>
                        <button type="button" class="button-primary-outline">Reset all filters</button>
                    </div>
                </div>
            </div>
        `;
  }

  sort(field, order = 'asc') {
    const currentField = this.config.find((el) => el.id === field);
    const k = order === 'asc' ? 1 : -1;

    this.selectSubElements();

    if (!currentField.sortable) {
      return;
    }

    if (currentField.sortType === "string") {
      this.data.sort((a, b) => k * a[field].localeCompare(b[field], ["ru", "eng"], { caseFirst: 'upper' }));
    } else if (currentField.sortType === "number") {
      this.data.sort((a, b) => k * a[field] - k * b[field]);
    }

    this.update();
  }

  update() {
    this.subElements.body.innerHTML = this.createTableBodyTemplate();
  }

  destroy() {
    this.element.remove();
  }
}
