const products = [
  {
    id: "fig-001",
    name: "Limited Hero Display Figure",
    category: "Figures",
    price: 79.99,
    stock: 4,
    tag: "Rare Find",
    visual: "figures",
    description: "A premium shelf-ready figure with a dynamic action pose and collector box."
  },
  {
    id: "fig-002",
    name: "Training Hall Mini Statue",
    category: "Figures",
    price: 34.99,
    stock: 10,
    tag: "Local Favorite",
    visual: "figures",
    description: "Compact display statue for desks, dorm rooms, and starter collections."
  },
  {
    id: "fig-003",
    name: "Crimson Captain Figure",
    category: "Figures",
    price: 22.99,
    stock: 8,
    tag: "Action Figure",
    visual: "figures",
    description: "A mid-size collector figure with display base and bright shelf presence."
  },
  {
    id: "fig-004",
    name: "Rival Swordsman Statue",
    category: "Figures",
    price: 15.29,
    stock: 5,
    tag: "Import",
    visual: "figures",
    description: "A compact swordsman display piece for collectors building a battle shelf."
  },
  {
    id: "man-001",
    name: "Shonen Starter Manga Set",
    category: "Manga",
    price: 42.5,
    stock: 16,
    tag: "Bundle",
    visual: "manga",
    description: "A curated first-volume set for readers exploring high-energy action series."
  },
  {
    id: "man-002",
    name: "Slice-of-Life Staff Picks",
    category: "Manga",
    price: 28.75,
    stock: 7,
    tag: "Staff Pick",
    visual: "manga",
    description: "Three cozy manga volumes selected by the Chico store team."
  },
  {
    id: "man-003",
    name: "Adventure Arc Volume Pack",
    category: "Manga",
    price: 36.99,
    stock: 9,
    tag: "Volume Pack",
    visual: "manga",
    description: "A multi-volume pack for readers starting a longer adventure storyline."
  },
  {
    id: "man-004",
    name: "Comedy Club Manga Bundle",
    category: "Manga",
    price: 31.25,
    stock: 6,
    tag: "Bundle",
    visual: "manga",
    description: "A lighthearted bundle chosen for quick reads and weekend recommendations."
  },
  {
    id: "com-001",
    name: "Vintage Import Comic Pack",
    category: "Comics",
    price: 59.99,
    stock: 2,
    tag: "Low Stock",
    visual: "comics",
    description: "Hard-to-find import comics sourced through specialty distributors."
  },
  {
    id: "com-002",
    name: "Convention Cover Comic Set",
    category: "Comics",
    price: 44.95,
    stock: 3,
    tag: "Limited Cover",
    visual: "comics",
    description: "A small run of alternate-cover comics for collectors who like display copies."
  },
  {
    id: "acc-001",
    name: "Collector Display Sleeves",
    category: "Accessories",
    price: 12.99,
    stock: 25,
    tag: "Accessory",
    visual: "sleeves",
    description: "Protective sleeves for manga, comics, trading cards, and small prints."
  },
  {
    id: "acc-002",
    name: "Village Symbol Headband",
    category: "Accessories",
    price: 10.99,
    stock: 18,
    tag: "Cosplay",
    visual: "sleeves",
    description: "A display-friendly cosplay accessory for costumes, photos, and shelf styling."
  },
  {
    id: "acc-003",
    name: "Blue Blade Display Prop",
    category: "Accessories",
    price: 69.55,
    stock: 2,
    tag: "Low Stock",
    visual: "sleeves",
    description: "A decorative prop sword for display, conventions, and themed collections."
  },
  {
    id: "new-001",
    name: "Weekend Drop Mystery Box",
    category: "New Arrivals",
    price: 49.99,
    stock: 6,
    tag: "New",
    visual: "mystery",
    description: "A rotating mix of figures, art cards, snacks, and surprise shelf finds."
  },
  {
    id: "new-002",
    name: "Collector Ship Model",
    category: "New Arrivals",
    price: 34.55,
    stock: 4,
    tag: "New",
    visual: "mystery",
    description: "A playful display model for fans who like ships, crews, and shelf scenes."
  },
  {
    id: "pre-001",
    name: "Special Order Deposit",
    category: "Special Orders",
    price: 20.0,
    stock: 99,
    tag: "Request",
    visual: "request",
    description: "A placeholder deposit for hard-to-find items requested by customers."
  }
];

const pages = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["catalog.html", "Catalog"],
  ["figures.html", "Figures"],
  ["manga.html", "Manga"],
  ["comics.html", "Comics"],
  ["new-arrivals.html", "New Arrivals"],
  ["special-orders.html", "Special Orders"],
  ["order.html", "Order"],
  ["locations.html", "Locations"],
  ["contact.html", "Contact"],
  ["resources.html", "Resources"]
];

function money(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function cart() {
  return JSON.parse(localStorage.getItem("ope-cart") || "[]");
}

function account() {
  return JSON.parse(localStorage.getItem("ope-account") || "null");
}

function saveAccount(profile) {
  localStorage.setItem("ope-account", JSON.stringify(profile));
  updateAccountNav();
}

function clearAccount() {
  localStorage.removeItem("ope-account");
  updateAccountNav();
}

function saveCart(items) {
  localStorage.setItem("ope-cart", JSON.stringify(items));
  updateCartCount();
}

function updateCartCount() {
  const count = cart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
  });
}

function updateAccountNav() {
  const profile = account();
  document.querySelectorAll("[data-account-link]").forEach((link) => {
    link.textContent = profile?.name ? profile.name.split(" ")[0] : "Account";
    link.setAttribute("aria-label", profile?.name ? `Account for ${profile.name}` : "Account");
  });
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const items = cart();
  const existing = items.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ id, qty: 1 });
  }
  saveCart(items);
}

function stockClass(stock) {
  if (stock <= 0) return "out";
  if (stock <= 4) return "low";
  return "";
}

function productVisual(type) {
  const visuals = {
    figures: "<span class=\"figure-box\"></span><span class=\"figure-box\"></span>",
    manga: "<span class=\"book\"></span><span class=\"book\"></span><span class=\"book\"></span><span class=\"book\"></span>",
    comics: "<span class=\"comic-panel\"></span><span class=\"comic-panel\"></span>",
    sleeves: "<span class=\"sleeve\"></span><span class=\"sleeve\"></span>",
    mystery: "<span class=\"mystery-box\"></span>",
    request: "<span class=\"request-card\"></span>"
  };
  return visuals[type] || visuals.figures;
}

function productCard(product) {
  const stockLabel = product.stock <= 0 ? "Out of stock" : `${product.stock} in stock`;
  return `
    <article class="product-card">
      <div class="product-art" aria-hidden="true"><div class="product-visual">${productVisual(product.visual)}</div></div>
      <div class="product-body">
        <span class="tag">${product.tag}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <span class="price">${money(product.price)}</span>
          <span class="stock ${stockClass(product.stock)}">${stockLabel}</span>
        </div>
        <button class="button add-cart" type="button" data-product-id="${product.id}">Add to Cart</button>
      </div>
    </article>
  `;
}

function renderProducts(list, target) {
  const node = document.querySelector(target);
  if (!node) return;
  node.innerHTML = list.map(productCard).join("");
  node.querySelectorAll("[data-product-id]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.productId);
      button.textContent = "Added";
      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 900);
    });
  });
}

function setupCatalog() {
  const grid = document.querySelector("[data-catalog]");
  if (!grid) return;

  const search = document.querySelector("[data-search]");
  const category = document.querySelector("[data-category]");
  const sort = document.querySelector("[data-sort]");
  const count = document.querySelector("[data-results-count]");

  function applyFilters() {
    const term = (search?.value || "").toLowerCase();
    const selected = category?.value || "All";
    const sorted = [...products].filter((item) => {
      const text = `${item.name} ${item.category} ${item.description} ${item.tag}`.toLowerCase();
      const matchTerm = !term || text.includes(term);
      const matchCategory = selected === "All" || item.category === selected;
      return matchTerm && matchCategory;
    });

    if (sort?.value === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort?.value === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort?.value === "stock") sorted.sort((a, b) => b.stock - a.stock);

    renderProducts(sorted, "[data-catalog]");
    if (count) count.textContent = `${sorted.length} result${sorted.length === 1 ? "" : "s"}`;
  }

  [search, category, sort].filter(Boolean).forEach((control) => {
    control.addEventListener("input", applyFilters);
  });

  applyFilters();
}

function setupCategoryPages() {
  document.querySelectorAll("[data-products-category]").forEach((node) => {
    const category = node.dataset.productsCategory;
    renderProducts(products.filter((item) => item.category === category), `[data-products-category="${category}"]`);
  });

  document.querySelectorAll("[data-featured]").forEach((node) => {
    const limit = Number(node.dataset.featured || "4");
    renderProducts(products.slice(0, limit), `[data-featured="${node.dataset.featured}"]`);
  });
}

function setupForms() {
  document.querySelectorAll("[data-confirm-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const notice = document.querySelector(form.dataset.confirmForm);
      if (notice) notice.classList.add("show");
      form.reset();
    });
  });
}

function showAccountNotice(message) {
  const notice = document.querySelector("[data-account-notice]");
  if (!notice) return;
  notice.textContent = message;
  notice.classList.add("show");
}

function renderAccountPage() {
  const root = document.querySelector("[data-account-page]");
  if (!root) return;

  const profile = account();
  const signedIn = Boolean(profile);
  const heading = root.querySelector("[data-account-heading]");
  const summary = root.querySelector("[data-account-summary]");
  const name = root.querySelector("[data-account-name]");
  const email = root.querySelector("[data-account-email]");
  const pickup = root.querySelector("[data-account-pickup]");
  const signOut = root.querySelector("[data-sign-out]");

  if (heading) heading.textContent = signedIn ? `Hi, ${profile.name.split(" ")[0]}.` : "Welcome back.";
  if (summary) summary.textContent = signedIn ? "Your profile is ready for pickup requests and special-order follow-up." : "Log in or create an account to personalize your storefront visit.";
  if (name) name.textContent = profile?.name || "Guest";
  if (email) email.textContent = profile?.email || "Not signed in";
  if (pickup) pickup.textContent = profile?.pickup || "Any location";
  if (signOut) signOut.disabled = !signedIn;
}

function setupAccountPage() {
  const root = document.querySelector("[data-account-page]");
  if (!root) return;

  const createForm = root.querySelector("[data-create-account]");
  const loginForm = root.querySelector("[data-login-account]");
  const signOut = root.querySelector("[data-sign-out]");

  createForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(createForm);
    saveAccount({
      name: String(data.get("name") || "Customer").trim(),
      email: String(data.get("email") || "").trim(),
      pickup: String(data.get("pickup") || "Any location"),
      createdAt: new Date().toISOString()
    });
    createForm.reset();
    renderAccountPage();
    showAccountNotice("Account created. Your profile is saved in this browser.");
  });

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const email = String(data.get("email") || "").trim();
    const existing = account();
    saveAccount({
      name: existing?.email === email ? existing.name : "Returning Fan",
      email,
      pickup: existing?.email === email ? existing.pickup : "Any location",
      createdAt: existing?.createdAt || new Date().toISOString()
    });
    loginForm.reset();
    renderAccountPage();
    showAccountNotice("Signed in. Your account status is active for this browser session.");
  });

  signOut?.addEventListener("click", () => {
    clearAccount();
    renderAccountPage();
    showAccountNotice("Signed out. You can log in again whenever you are ready.");
  });

  renderAccountPage();
}

function setupOrder() {
  const node = document.querySelector("[data-order-summary]");
  if (!node) return;

  const items = cart();
  if (!items.length) {
    node.innerHTML = `<p>Your cart is empty.</p><p><a class="button light" href="catalog.html">Browse Catalog</a></p>`;
    return;
  }

  const rows = items.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    return `
      <tr>
        <td>${product.name}</td>
        <td>${item.qty}</td>
        <td>${money(product.price)}</td>
        <td>${money(product.price * item.qty)}</td>
      </tr>
    `;
  }).join("");

  const total = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  node.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><th colspan="3">Estimated Total</th><th>${money(total)}</th></tr></tfoot>
      </table>
    </div>
    <p class="tiny">Final taxes, shipping, and local delivery fees are confirmed by store staff.</p>
    <button class="button coral" type="button" data-clear-cart>Clear Cart</button>
  `;

  const clear = node.querySelector("[data-clear-cart]");
  clear?.addEventListener("click", () => {
    saveCart([]);
    setupOrder();
  });
}

function setupNavigation() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const current = location.pathname.split("/").pop() || "index.html";
  const navActions = document.querySelector(".nav-actions");

  if (navActions && !navActions.querySelector("[data-account-link]")) {
    const accountLink = document.createElement("a");
    accountLink.className = "icon-button account-button";
    accountLink.href = "account.html";
    accountLink.dataset.accountLink = "";
    accountLink.textContent = "Account";
    navActions.prepend(accountLink);
  }

  const accountLink = document.querySelector("[data-account-link]");
  if (accountLink && current === "account.html") {
    accountLink.setAttribute("aria-current", "page");
  }

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  toggle?.addEventListener("click", () => {
    const open = menu?.classList.toggle("open");
    document.body.classList.toggle("menu-open", Boolean(open));
    toggle.setAttribute("aria-expanded", String(Boolean(open)));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateCartCount();
  setupCatalog();
  setupCategoryPages();
  setupForms();
  setupAccountPage();
  setupOrder();
  updateAccountNav();
});
