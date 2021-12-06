function row(content, styles = "") {
  return `<div class="row" style="${styles}">${content}</div>`;
}

function col(content) {
  return `<div class="col-sm">${content}</div>`;
}

function css(styles = {}) {
  if (typeof styles === "string") return styles;
  const toString = (key) => `${key}: ${styles[key]}`;
  return Object.keys(styles).map(toString).join(";");
}

function block(type) {
  return `
  <form name="${type}">
  <h5>${type}</h5>
  <div class="form-group">
    <input class="form-control form-control-sm" name="value" placeholder="value">
  </div>
  <div class="form-group">
    <input class="form-control form-control-sm" name="styles" placeholder="styles">
  </div>
  <button type="submit" class="btn btn-primary btn-sm">Добавить</button>
</form>
<hr />
   `;
}
;

class Block {
  constructor(value, options) {
    this.value = value;
    this.options = options;
  }
  toHTML() {
    throw new Error("Метод toHTML должен быть реализован");
  }
}

class TitleBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHTML() {
    const { tag = "h1", styles } = this.options;
    return row(col(`<${tag}>${this.value}</${tag}>`), css(styles));
  }
}

class ImageBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHTML() {
    const { imageStyles: is, alt = "", styles } = this.options;
    return row(
      `<img src="${this.value}" alt='${alt}' style='${css(is)}'/>`,
      css(this.options.styles)
    );
  }
}

class ColumnsBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHTML() {
    const html = this.value.map(col).join("");
    return row(html, css(this.options.styles));
  }
}

class TextBlock extends Block {
  constructor(value, options) {
    super(value, options);
  }
  toHTML() {
   return row(col(`<p>${this.value}</p>`), css(this.options.styles));
  }
}
