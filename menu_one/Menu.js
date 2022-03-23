"use  strict";

class Menu {
  constructor({
    menuContainerId,
    items,
    activeMenuItemClassname = "menu-ative-item",
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
    this._styleMenu();

    if (!items) {
      console.error("no menu items specified");
      return;
    }

    this.activeMenuItemClassname = activeMenuItemClassname;
    this.menuItemClassname = menuItemClassname;
    this.items = this._initItems(items);

    this._appendItems();
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
      if (order == 0) {
        itemDOM.classList.add(this.activeMenuItemClassname);
      }
      this._styleMenuItem(itemDOM);

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

  _styleMenu() {
    this.menu.cssText = `
		display: flex;
		flex-direction: column;
		position: fixed;
		height: content-min;
		width: content-min;
		`;
  }

  _styleMenuItem(item) {
    item.cssText = `
		display: block;
		height: content-min;
		width: content-min;
		`;
  }

  _tryHref(href) {
    let sectionTry = document.getElementById(href.slice(1));
    if (sectionTry) {
      return "intern";
    } else if (href.startsWith("http") || href.startsWith("www")) {
      return "extern";
    }
    return undefined;
  }

  init() {}

  _getSectionY(href, id) {
    let section = document.getElementById(href);
    this.Ys.push({ id: id, y: section.offsetTop });
  }
}
