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
    if (!menu) {
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
    this.items = items;
    this.activeMenuItemClassname = activeMenuItemClassname;
    this.menuItemClassname = menuItemClassname;

    this._appendItems();
  }
  _appendItems() {
    this.items.forEach((it, order) => {
      if (!it.href || !it.caption) {
        console.warn(`necessary info missing for menu item #${order}`);
        continue;
      }
      let item = document.createElement("a");
      item.classList.push(menuItemClassname);
      if (order == 0) {
        item.classList.push(activeMenuItemClassname);
      }

      item.href = i.href;
      item.innerText = i.caption;

      menu.appendChild(item);
    });
  }

  _styleMenu() {
    this.menu.cssText = `
		display: flex;
		flex-direction: column;
		position: fixed;
		`;
  }

  _sectionYs() {
    let sections = Array.prototype.slice.call(
      document.getElementsByTagName("section")
    );
    sections.forEach((x) => {
      sectionY.push(x.offsetTop);
    });
  }
}
