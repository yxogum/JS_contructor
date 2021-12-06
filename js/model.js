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
;

const model = [
  new TitleBlock("Конструктор сайтов на чистом JavaScript", {
    tag: "h2",
    styles: {
      background: "linear-gradient(to right, #ff0099, #493240)",
      color: "#fff",
      "text-align": "center",
      padding: "1.5rem",
    },
  },),
  new ImageBlock("../image/home-page.jpg", {
  styles: {
    padding: "2rem 0",
    display: "flex",
    "justify-content": "center",
  },
  imageStyles: {
    width: "500px",
    height: "auto",
  },
  alt: "Это картинка",
  },),
  new ColumnsBlock([
  "Приложение на чистом JavaScript, без использования библиотек",
  "Цель: Узнать как работает SOLID и ООП в JavaScript",
  "JavaScript. Создавать любые UI своими руками",
  ], {
  styles: {
    background: "linear-gradient(to bottom, #8e2de2, #4a00e0)",
    padding: "2rem",
    color: "#fff",
    "font-weight": "bold",
  },
  },),
  new TextBlock("Курс по JavaScript", {
    styles: {
      background: "linear-gradient(to left, #f2994a, #f2c94c)",
      padding: "1rem",
      "font-weight": "bold",
    },
  },),
];
