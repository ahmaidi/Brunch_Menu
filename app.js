import { menuCategories } from "./menu-data.js";

const ROOT = document.querySelector("#app");

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCWXrUf6DiZqTxDEeyzWeVAA_kkgrVs740oWcT36YxF_X_uJaOAYpuyJ-9jCwPfE1fYbwwaEshi4ifzvhmNfMUQkJM44jTQpD2GLuVQT6jlxsBfYIyrT9y52TlZmecGGOOUwBTIeUSmddYmbc0Ak0eyJ4beYSLIV3xBPkQ1J7uIdC8-0dNODqdpBmLdy-iEM8LuN0nz96TwClcQzpb9OdF6VA4IZBHpbB4FoaqJaa6PaXiWMAm53bsDkwrv9hnBSRFEiTb4vRiyiRk";
const BURGER_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYZymr3MS3FRGjpCaPwioxJshlv7lHplngRsutY_DCvuZgQUTQYc_bLCURZdHUsyhvO6P16FK3Wizyf88ImmwAtTkhbpxJx5kMgE65erBr4g-5A_PUbe6Xg7G_X15vc-Eo_OhacKSh0CyDOw8mkb_mFKmOXBpG30DifLVRaf8U_K3Auy_LSumBwPGKvZTlbzlCZSveaQall4KOZP-fY7aG39L3jXboXkpLSVXrP3sD9BpQGcQya_-zA9Rt8AJftgRf0Dvmr3rI0y8";
const PIZZA_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAtmwXBnesjxs84Xzv8Yv08pSl_14OJPEcCnGvh2xpjJqpoe_S0PLPMzXlHTTawh55A5bj7yR_wSaPd6261aD880zf7cC2EicFBE-8IJUseJfj33OcxoZ6yah-VDXC3bjTDLiCi5ulMum6fhYJlDiFqFbo7-RWWRdYVrswJmYh7wu7KNeigppa4DK1ES72k_4zSnU76I7j2xytMoPZuNp8uYpppUqfcwpO2B-ppeb0aF41vXtzYpiWWSsAobgFLkxmhMZNk8_fRz2o";

const categoryMeta = {
  burgers: { icon: "lunch_dining", image: BURGER_IMAGE, type: "hero" },
  pizza: { icon: "local_pizza", image: PIZZA_IMAGE, type: "featured" },
  pasta: { icon: "dinner_dining", image: "assets/pasta.png", type: "pasta" },
  fast: { icon: "skillet", image: "assets/fast.png", type: "list", supplements: true },
  trad: { icon: "soup_kitchen", image: "assets/trad.png", type: "list", supplements: true },
  pasticcio: { icon: "bakery_dining", image: "assets/pasticcio.png", type: "list" },
  tacos: { icon: "tapas", image: "assets/tacos.png", type: "sizes", badge: "Avec Frites" },
  shawarma: { icon: "kebab_dining", image: "assets/shawarma.png", type: "list" },
  chicken: { icon: "mode_fan", image: "assets/chicken.png", type: "list" },
  sandwich: { icon: "lunch_dining", image: "assets/sandwich.png", type: "list", badge: "Avec Frites" },
  panini: { icon: "ramen_dining", image: "assets/panini.png", type: "sizes", badge: "Avec Frites" },
  special: { icon: "restaurant_menu", image: null, type: "list" },
  salads: { icon: "eco", image: null, type: "list" },
  drinks: { icon: "local_bar", image: null, type: "drinks" },
  dessert: { icon: "cake", image: "assets/dessert.png", type: "dessert" },
};

const offer = {
  badge: "New Offer",
  title: "Fresh promo",
  body: "Try our beta menu with prices and categories ready for future editing.",
};

function price(value) {
  return `${Number(value).toFixed(Number.isInteger(value) ? 0 : 2)} DH`.replace(".00", "");
}

function iconForDrink(name) {
  const n = name.toLowerCase();
  if (n.includes("orange")) return "volunteer_activism";
  if (n.includes("mangue")) return "nutrition";
  if (n.includes("panache")) return "local_bar";
  if (n.includes("ananas")) return "eco";
  if (n.includes("avocat")) return "local_cafe";
  if (n.includes("pomme")) return "spa";
  if (n.includes("citron")) return "spa";
  if (n.includes("banane")) return "restaurant_menu";
  if (n.includes("soda")) return "sports_bar";
  if (n.includes("eau")) return "water_drop";
  return "local_drink";
}

function renderNav() {
  return menuCategories
    .map((category) => {
      const meta = categoryMeta[category.id] || {};
      return `
        <a class="menu-link shrink-0 whitespace-nowrap inline-flex items-center gap-1.5" href="#${category.id}">
          <span class="material-symbols-outlined nav-icon">${meta.icon || "restaurant"}</span>${category.title}
        </a>
      `;
    })
    .join("");
}

function renderSizeSection(category, meta) {
  const badges = meta.badge ? `<span class="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bg shadow-soft">${meta.badge}</span>` : "";
  return `
    <section id="${category.id}" class="reveal space-y-4">
      <h3 class="pb-2 font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${category.title}</h3>
      <div class="overflow-hidden rounded-[1.35rem] bg-panel shadow-soft">
        <div class="relative">
          <img class="h-[180px] w-full object-cover" src="${meta.image}" alt="${category.title}" />
          ${badges}
        </div>
      </div>
      <div class="rounded-[1.2rem] bg-panel p-4 shadow-soft" data-size-group="${category.id}">
        <div class="space-y-2">
          ${category.items
            .map(
              (item) => `
                <div class="menu-size-row flex items-center justify-between py-2 text-[12px]" data-sizes='${JSON.stringify({
                  normal: price(item.prices.normal),
                  double: price(item.prices.double),
                })}'>
                  <span>${item.name}</span><span class="menu-price text-accent">${price(item.prices.normal)}</span>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="mt-4 grid grid-cols-2 gap-2 text-center" data-size-controls>
          <button type="button" class="size-chip active rounded-xl bg-panel2 p-2"><p class="text-[10px] font-bold">Normal</p></button>
          <button type="button" class="size-chip rounded-xl bg-panel2 p-2"><p class="text-[10px] font-bold">Double</p></button>
        </div>
      </div>
    </section>
  `;
}

function renderListSection(category, meta) {
  const badges = meta.badge ? `<span class="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bg shadow-soft">Avec Frites</span>` : "";
  const supplementBlock = category.supplements
    ? `
      <div class="rounded-[1.2rem] bg-panel2 p-4 shadow-soft">
        <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Supplement</p>
        <div class="mt-3 grid grid-cols-3 gap-2 text-center">
          ${category.supplements
            .map(
              (supplement) => `
                <div class="rounded-xl bg-bg/40 p-2">
                  <p class="text-[11px]">${supplement.name}</p>
                  <p class="text-[11px] font-bold text-accent">${price(supplement.price)}</p>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  return `
    <section id="${category.id}" class="reveal space-y-4">
      <h3 class="pb-2 font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${category.title}</h3>
      ${meta.image ? `<div class="overflow-hidden rounded-[1.35rem] bg-panel shadow-soft"><div class="relative"><img class="h-[180px] w-full object-cover" src="${meta.image}" alt="${category.title}" />${badges}</div></div>` : ""}
      <div class="rounded-[1.2rem] bg-panel p-4 shadow-soft">
        <div class="space-y-2">
          ${category.items
            .map(
              (item) => `
                <div class="flex items-center justify-between py-2 text-[12px]">
                  <span>${item.name}</span><span class="text-accent">${price(item.price)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
      ${supplementBlock}
    </section>
  `;
}

function renderPizza(category, meta) {
  const list = category.items.slice(2);
  return `
    <section id="${category.id}" class="reveal space-y-4">
      <h3 class="pb-2 font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${category.title}</h3>
      <div class="rounded-[1.35rem] bg-panel p-4 shadow-soft">
        <img class="h-[170px] w-full rounded-[1.1rem] object-cover" src="${meta.image}" alt="${category.title}" />
        <div class="mt-4">
          <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Signature platter</p>
          <h4 class="mt-2 font-display text-[21px] font-extrabold leading-6">The Pizza Feast</h4>
          <p class="mt-2 text-[12px] leading-5 text-muted">A curated selection of our finest toppings, perfect for sharing. Hand-stretched dough, stone-baked to perfection.</p>
          <div class="mt-4 grid grid-cols-2 gap-2">
            ${category.items
              .slice(0, 2)
              .map(
                (item) => `
                  <div class="rounded-xl bg-panel2 p-3">
                    <p class="text-[12px] font-bold text-accent">${item.name}</p>
                    <p class="text-[11px] text-muted">${price(item.price)}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="space-y-1 rounded-[1.2rem] bg-panel p-4 shadow-soft">
        ${list
          .map(
            (item) => `
              <div class="flex items-center justify-between py-2 text-[12px]">
                <span>${item.name}</span><span class="text-accent">${price(item.price)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderPasta(category, meta) {
  return `
    <section id="${category.id}" class="reveal space-y-4">
      <h3 class="pb-2 font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${category.title}</h3>
      <div class="overflow-hidden rounded-[1.35rem] bg-panel shadow-soft">
        <img class="h-[180px] w-full object-cover" src="${meta.image}" alt="${category.title}" />
      </div>
      <div class="rounded-[1.2rem] bg-panel p-4 shadow-soft">
        <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Choose your base</p>
        <div class="mt-4 space-y-3">
          ${category.options
            .map(
              (option) => `
                <div class="flex items-center gap-3">
                  <div class="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent">${option.name[0]}</div>
                  <span class="text-[13px]">${option.name} ${option.extra ? `<span class="text-[10px] text-muted">+${option.extra.toString().padStart(2, "0")} DH</span>` : ""}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="rounded-[1.2rem] bg-panel p-4 shadow-soft">
        <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Sauce blanche ou tomate</p>
        <div class="mt-3 space-y-3">
          ${category.items
            .map(
              (item) => `
                <div class="flex items-center justify-between"><span class="text-[12px]">${item.name}</span><span class="text-[12px] text-accent">${price(item.price)}</span></div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderTacosOrPanini(category, meta) {
  const badge = meta.badge ? `<span class="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bg shadow-soft">${meta.badge}</span>` : "";
  return `
    <section id="${category.id}" class="reveal space-y-4">
      <h3 class="pb-2 font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${category.title}</h3>
      <div class="overflow-hidden rounded-[1.35rem] bg-panel shadow-soft">
        <div class="relative">
          <img class="h-[180px] w-full object-cover" src="${meta.image}" alt="${category.title}" />
          ${badge}
        </div>
      </div>
      <div class="rounded-[1.2rem] bg-panel p-4 shadow-soft" data-size-group="${category.id}">
        <div class="space-y-2">
          ${category.items
            .map(
              (item) => `
                <div class="menu-size-row flex items-center justify-between py-2 text-[12px]" data-sizes='${JSON.stringify({
                  normal: price(item.prices.normal),
                  double: price(item.prices.double),
                })}'>
                  <span>${item.name}</span><span class="menu-price text-accent">${price(item.prices.normal)}</span>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="mt-4 grid grid-cols-2 gap-2 text-center" data-size-controls>
          <button type="button" class="size-chip active rounded-xl bg-panel2 p-2"><p class="text-[10px] font-bold">Normal</p></button>
          <button type="button" class="size-chip rounded-xl bg-panel2 p-2"><p class="text-[10px] font-bold">Double</p></button>
        </div>
      </div>
    </section>
  `;
}

function renderDrinks(category) {
  const drinkCards = category.items
    .slice(0, 8)
    .map(
      (item) => `
        <div class="card-hover rounded-xl bg-panel2 p-3 text-center">
          <span class="material-symbols-outlined text-[16px] text-accent">${iconForDrink(item.name)}</span>
          <p class="mt-2 text-[10px] font-bold uppercase tracking-[0.16em]">${item.name}</p>
          <p class="mt-1 text-[11px] font-bold text-accent">${price(item.price)}</p>
        </div>
      `
    )
    .join("");

  const remaining = category.items.slice(8);

  return `
    <section id="${category.id}" class="reveal space-y-4">
      <h3 class="pb-2 font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${category.title}</h3>
      <div class="grid grid-cols-2 gap-2">${drinkCards}</div>
      ${remaining.length ? `<div class="card-hover flex items-center justify-between rounded-xl bg-panel2 px-3 py-4"><span class="text-[12px] font-bold uppercase tracking-[0.05em]">Soda / Eau Minerale</span><span class="text-[11px] font-bold text-accent">06 / 02 / 07 DH</span></div>` : ""}
    </section>
  `;
}

function renderDessert(category, meta) {
  return `
    <section id="${category.id}" class="reveal space-y-4 pb-2">
      <h3 class="text-center font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${category.title}</h3>
      <div class="overflow-hidden rounded-[1.35rem] bg-panel shadow-soft">
        <img class="h-[180px] w-full object-cover" src="${meta.image}" alt="${category.title}" />
      </div>
      <div class="grid grid-cols-3 gap-3 text-center">
        ${category.items
          .map(
            (item) => `
              <div>
                <p class="text-[13px] font-extrabold">${item.name}</p>
                <p class="mt-1 text-[11px] font-bold text-accent">${price(item.price)}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderCategory(category) {
  const meta = categoryMeta[category.id] || {};
  if (category.id === "pizza") return renderPizza(category, meta);
  if (category.id === "pasta") return renderPasta(category, meta);
  if (category.id === "tacos" || category.id === "panini") return renderTacosOrPanini(category, meta);
  if (category.id === "drinks") return renderDrinks(category);
  if (category.id === "dessert") return renderDessert(category, meta);
  return renderListSection(category, meta);
}

function renderApp() {
  const nav = renderNav();
  const categories = menuCategories.map(renderCategory).join("");

  ROOT.innerHTML = `
    <div id="top"></div>
    <div class="mx-auto min-h-screen max-w-[430px] bg-bg shadow-soft">
      <header class="sticky top-0 z-50 bg-bg/95 backdrop-blur-md">
        <div class="flex items-center gap-2 px-3 py-3">
          <img class="h-[18px] w-[18px] object-contain" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAA0CAYAAAAaNmH0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAQZSURBVGhD7ZhfaFtVHMe/90+X9salDWmzdtEtrFtDYbbOsX9KRBkMRMYQcSV1DAUVwXZQmAx82XwRxgr78+KqIuylhckEFdEHfWhj2tm1Y2MraVmkf1galjS6NDZt0yTXB3Oz3GPOvTdpwl3hfh5/53fD53vuOSeHy9hsNhEbFJYsbCQMeb0w5PXCkNcLQ14vDHm9MOT1QrO89ZlNZKlkWIZBi8OCNqcVLQ4LWIYhWzTBaLkSd7id+KzzBVz6wY+rP0+Rw5p5rt6Ms542HNmzFYKJz9UjsRWc7b+L67/PyPrV4ARBOEcW82my1uDKhwfgsAk46KrHcjKDsUCUbFPlzUPbcK3nZbzYbEMVL3/h5moer7U1Yv6vZUzMPZaNKaG6bI4d3IbtdjMAQDDx+PTt3fjodRfZpkiH24nLH+xDvaWaHMohmHi8f2QXajZx5BAVVfl2Zx049smalAKceHWHrI/G3p02nPO0y5YJDafdjF1bLWSZiqp8Q+3/Z0sw8fj85B5NAbrecBX8jXKgKh+JrZAlQGMAl8OC/S0NZJlKMiVidS1NlqmoygdCcYiU80gtwPNOK2qFKrJMZSoYw4P5OFmmoip/c2oBsUSSLOdQClBdxUHrEb66lsaN4TlkaDNVAFV5nz+MX8aD1NlHXoAOt1NWjy+vIaPwXD7D/ggGBqfJsiKq8gBw5tptjEyGybIMwcTj1NFW2PM25/Sjf7CYWJP1FWIsEEVX3x9FzTq0yi+tpODp9WLYTw8QCMXhuTCEcHaDNzduxlfdh7Cljn7SiCLw290Q3un14tHjwgeDEpquBxLmah4Dp914qdUuqwdCcRw/P4i5yBKQFe//xI3mxs0AgFQ6g0hsFQ21JvAci2QqjYm5GK786MdPt4JFz7hEUfIoEECLeP/gNE5/M16yJI2i5ZEXwF5XoygOAL/eCaGz11t2cZQqj+y1lucYJFMZgCKO7Mxf/N6P8zfuy+rlQPVWSUMEkM6eg6S4KAIiRDAMA5ZlcKClHhzLwqew4UtB02mjRCHx70Zm8e4lH6LxVQAAz7HoOdaKM2/tJp5eHyXPPBTEu/tGMflwEfdm/sbh9iYIJr4ib6BkeSVxaR/Mhpdwb7ZyAUqSLyT+rW8GH38xihRxH6hkgKLlaeJdV0epx2GlAhQlX4q4RCUCaJYnxTOiiOveGXT33VIVl5gNL2H8z2ju68F6A2iSp4mf+lK7uMTDhUTZAqjKl1NcolwBVP+kPK84sb3hv08f5RCXGJmM4L3LPiwsPvkjO7r/WTRZa8hWKqozPzQRBsey2Ntsw8DQNHq+Hlu3uIT0Bg63NyEYTaCz14tgNEG2UdF8MXM5LHgwHy+beD4Om4CVZDp3ndCKZvmnEdU1/zRjyOuFIa8XhrxebGj5fwEIOuHOgXsLywAAAABJRU5ErkJggg==" alt="Spoon and knife" />
          <h1 class="font-display text-[15px] font-extrabold uppercase tracking-[0.16em] text-accent">Brunch Food</h1>
        </div>
        <nav class="scroll-hide flex items-center gap-4 overflow-x-auto px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">${nav}</nav>
      </header>
      <main class="space-y-6 px-3 pb-10 pt-3">
        <section class="reveal rounded-[1.6rem] bg-panel p-2 shadow-soft">
          <h1 class="font-display text-[22px] font-extrabold uppercase tracking-[0.04em] text-accent">${offer.badge}</h1>
          <div class="overflow-hidden rounded-[1.35rem]">
            <div class="relative h-[230px] overflow-hidden rounded-[1.35rem] bg-[#221813]">
              <img class="h-full w-full object-cover" src="${HERO_IMAGE}" alt="Special offer" />
              <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"></div>
            </div>
          </div>
          <div class="space-y-2 px-4 pb-4 pt-3">
            <div class="rounded-2xl bg-panel2/90 p-3">
              <p class="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">${offer.title}</p>
              <p class="mt-1 text-[12px] font-semibold text-text">${offer.body}</p>
            </div>
            <h2 class="font-display text-[19px] font-extrabold uppercase leading-tight tracking-[0.05em]">Experience the ultimate brunch</h2>
            <p class="max-w-[28ch] text-[12px] leading-5 text-muted">Crafted with passion, served with style. Premium ingredients in every bite.</p>
          </div>
        </section>
        ${categories}
        <section class="reveal rounded-[1.4rem] bg-panel p-4 shadow-soft">
          <div class="space-y-2 text-center">
            <p class="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">Rue Mohammed Ben Abdallah</p>
            <p class="text-[11px] text-muted">A proximite du bureau des missions, Ghazala a Boujdour</p>
            <p class="text-[12px] font-bold">+212 706850226</p>
            <p class="text-[10px] uppercase tracking-[0.18em] text-accent">Brunch Food Fast & Tasty</p>
          </div>
        </section>
      </main>
    </div>
  `;

  installBehavior();
}

function installBehavior() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -12px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const navLinks = [...document.querySelectorAll(".menu-link")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", active);
      link.classList.toggle("text-text", active);
      link.classList.toggle("text-muted", !active);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(target.id);
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -45% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  document.querySelectorAll("[data-size-group]").forEach((group) => {
    const buttons = [...group.querySelectorAll("[data-size-controls] .size-chip")];
    const rows = [...group.querySelectorAll(".menu-size-row")];

    const applySize = (size) => {
      rows.forEach((row) => {
        const prices = JSON.parse(row.dataset.sizes || "{}");
        const priceEl = row.querySelector(".menu-price");
        const nextPrice = prices[size];
        if (priceEl && nextPrice) priceEl.textContent = nextPrice;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        const label = button.textContent.trim().toLowerCase();
        const size = label.includes("double") ? "double" : "normal";
        applySize(size);
      });
    });

    applySize("normal");
  });
}

renderApp();
