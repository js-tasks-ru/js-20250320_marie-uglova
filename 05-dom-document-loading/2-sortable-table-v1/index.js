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
                ${this.config.map(columnConfig => this.createTableBodyCellTemplate(product, columnConfig)).join('')}
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
    const currentFieldType = currentField.sortType;
    const isCurrentFieldSortable = currentField.sortable;

    this.selectSubElements();

    if (!isCurrentFieldSortable) {
      return;
    }
    else if (currentFieldType === "string") {
      this.data.sort((next, prev) => {
        return order === "asc" ? this.sortStringsAsc(next[field], prev[field]) : this.sortStringsDesc(next[field], prev[field]);
      });
    }
    else if (currentFieldType === "number") {
      this.data.sort((next, prev) => {
        return order === "asc" ? this.sortNumberAsc(next[field], prev[field]) : this.sortNumberDesc(next[field], prev[field]);
      });
    }
    else {
      return;
    }

    this.subElements.body.innerHTML = this.createTableBodyTemplate();
  }

  sortStringsAsc(a, b) {
    return a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
  }

  sortStringsDesc(b, a) {
    return a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
  }

  sortNumberAsc(a, b) {
    return a - b;
  }

  sortNumberDesc(a, b) {
    return b - a;
  }

  destroy() {
    this.element.remove();
  }
}

