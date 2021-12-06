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
