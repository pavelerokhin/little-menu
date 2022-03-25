"use  strict";

class Menu {
  constructor({
    menuContainerId,
    items,
    activeMenuItemClassname = "menu-item-active",
    menuItemClassname = "menu-item",
  }) {
    if (!menuContainerId) {
      console.error("no menu container specified");
      return;
    }

    this.menu = document.getElementById(menuContainerId);
    if (!this.menu) {
      console.error(
        "no menu container with id ${menuContainerId} found in DOM"
      );
      return;
    }

    if (!items) {
      console.error("no menu items specified");
      return;
    }

    this.activeMenuItemClassname = activeMenuItemClassname;
    this.menuItemClassname = menuItemClassname;
    this.items = this._initItems(items);

    this._appendItems();
    this.sectionYs = [];
  }

  _appendItems() {
    let order = Object.keys(this.items).sort();

    for (let i of order) {
      this.menu.appendChild(this.items[i].dom);
    }
  }

  _initItems(items) {
    let itemsConfig = {};

    items.forEach((item, order) => {
      if (!item.href || !item.caption) {
        console.warn(`necessary info missing for menu item #${order}`);
        return;
      }

      let type = this._tryHref(item.href);
      if (!type) {
        console.warn(
          `problem to associate href ${item.href} to the menu item #${order}`
        );
        return;
      }

      // configure DOM element of menu-item
      let itemDOM = document.createElement("a");
      let id = `menu-item-${order}`;
      itemDOM.classList.add(this.menuItemClassname);
      itemDOM.id = id;
      itemDOM.innerText = item.caption;
      if (order == 0) {
        itemDOM.classList.add(this.activeMenuItemClassname);
      }

      itemsConfig[order] = {
        dom: itemDOM,
        caption: item.caption,
        href: item.href,
        id: `menu-item-${order}`,
        type: type,
      };
    });

    return itemsConfig;
  }

  _toggleAtiveItem() {
    console.log("scroll");
  }

  _tryHref(href) {
    let sectionTry = document.getElementById(href.slice(1));
    if (sectionTry) {
      return "internal";
    } else if (href.startsWith("http") || href.startsWith("www")) {
      return "external";
    }
    return undefined;
  }

  init() {
    this._getSectionYs();

    window.addEventListener("resize", _getSectionYs);
    window.addEventListener("scroll", _toggleAtiveItem);
  }

  _getSectionYs() {
    console.log("scroll");

    this.sectionYs = [];
    for (let i of this.items) {
      if (i.type == "internal") {
        let section = document.getElementById(i.href);
        this.sectionYs.push({ id: i.id, y: section.offsetTop });
      }
    }
  }
}
