//класс отвечающий за отрисовку элементов на странице

export default  class Section {
    constructor({ renderer }, containerSelector) {              // конструктор принимает массив с данными, функцию и селектор контейнера. 
      this._renderer = renderer;  
      this._container = document.querySelector(containerSelector);
    }
  
    renderItems(renderedItems) {
      renderedItems.reverse().forEach(item => this._renderer(item));      // метод отвечает за отрисовку всех элементов. Использует функцию из конструктора.
    }
  
    addItem(element) {                                                // меотд для вставки дом элемента в контейнер.
      this._container.prepend(element);
    }
  }