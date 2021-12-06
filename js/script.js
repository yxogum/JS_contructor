
// function to change the new webp picture format do not delete=========================================
function testWebP(callback) {
   var webP = new Image();
   webP.onload = webP.onerror = function () {
     callback(webP.height == 2);
   };
   webP.src =
     "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
 }
 testWebP(function (support) {
   if (support == true) {
     document.querySelector("body").classList.add("webp");
   } else {
     document.querySelector("body").classList.add("no-webp");
   }
 });
 // function to change the new webp picture format do not delete=========================================

// app ===========================================

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
;
class Site {
  constructor(selector) {
    this.$el = document.querySelector(selector);
  }

  render(model) {
    this.$el.innerHTML = "";
    model.forEach((block) => {
      this.$el.insertAdjacentHTML("beforeend", block.toHTML());
    });
  }
}
;
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

class Sidebar {
  constructor(selector, updateCallback) {
   this.$el = document.querySelector(selector);
   this.update = updateCallback;
   this.init();
  }

  init() {
   this.$el.insertAdjacentHTML("afterbegin", this.template);
   this.$el.addEventListener('submit', this.add.bind(this))
  }

  get template() {
   return [
      block("text"), 
      block("title")
   ].join("");
  }  

  add(event) {
   event.preventDefault()

   const type = event.target.name
   const value = event.target.value.value
   const styles = event.target.styles.value

   const newBlock = type === 'text'
   ? new TextBlock(value, {styles})
   : new TitleBlock(value, {styles}) 

   this.update(newBlock);

   event.target.value.value = ''
   event.target.styles.value = ''
  }
}
;

class App {
  constructor(model) {
    this.model = model;
  }

  init() {
    const site = new Site("#site");

    site.render(this.model);

    const updateCallback = newBlock => {
      this.model.push(newBlock);
      site.render(this.model);
    };

    new Sidebar("#panel", updateCallback);
  }
}
;

new App(model).init()