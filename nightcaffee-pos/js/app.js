/**
 * NightCaffee POS — Shared Interactions
 *
 * Features:
 *  1. Dark mode toggle (persisted in localStorage)
 *  2. Bottom navigation active state
 *  3. Cart quantity controls
 *  4. Payment keypad logic
 *  5. Category filter tabs
 *  6. Search filter (menu page)
 */

document.addEventListener("DOMContentLoaded", () => {
    /* ================================================
       1. DARK MODE TOGGLE
    ================================================ */
    const darkToggle = document.getElementById("dark-toggle");
    const html = document.documentElement;

    // Restore saved preference
    if (localStorage.getItem("nightcaffee-dark") === "true") {
        html.classList.add("dark");
    }

    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            html.classList.toggle("dark");
            localStorage.setItem(
                "nightcaffee-dark",
                html.classList.contains("dark")
            );
        });
    }

    /* ================================================
       2. BOTTOM NAV ACTIVE STATE
    ================================================ */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav-page]").forEach((link) => {
        if (link.dataset.navPage === currentPage) {
            link.classList.add("nav-active");
            link.classList.remove("text-slate-400");
            link.classList.add("text-[var(--primary)]");
        }
    });

    /* ================================================
       3. CART QUANTITY CONTROLS
    ================================================ */
    document.querySelectorAll("[data-qty-group]").forEach((group) => {
        const minusBtn = group.querySelector("[data-qty-minus]");
        const plusBtn = group.querySelector("[data-qty-plus]");
        const display = group.querySelector("[data-qty-value]");

        if (!minusBtn || !plusBtn || !display) return;

        minusBtn.addEventListener("click", () => {
            let val = parseInt(display.textContent, 10);
            if (val > 0) {
                display.textContent = val - 1;
                updateCartTotals();
            }
        });

        plusBtn.addEventListener("click", () => {
            let val = parseInt(display.textContent, 10);
            display.textContent = val + 1;
            updateCartTotals();
        });
    });

    function updateCartTotals() {
        let totalItems = 0;
        let totalPrice = 0;

        document.querySelectorAll("[data-qty-group]").forEach((group) => {
            const qty = parseInt(
                group.querySelector("[data-qty-value]")?.textContent || "0",
                10
            );
            const price = parseFloat(group.dataset.price || "0");
            totalItems += qty;
            totalPrice += qty * price;
        });

        const cartCount = document.getElementById("cart-count");
        const cartTotal = document.getElementById("cart-total");
        if (cartCount) cartCount.textContent = totalItems;
        if (cartTotal) cartTotal.textContent = formatCurrency(totalPrice);
    }

    /* ================================================
       4. PAYMENT KEYPAD
    ================================================ */
    const cashDisplay = document.getElementById("cash-display");
    const changeDisplay = document.getElementById("change-display");
    const totalAmount = parseFloat(
        document.getElementById("total-amount")?.dataset.amount || "0"
    );

    document.querySelectorAll("[data-key]").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!cashDisplay) return;
            const key = btn.dataset.key;

            if (key === "C") {
                cashDisplay.textContent = "$0.00";
            } else if (key === "backspace") {
                let raw = cashDisplay.textContent.replace(/[^0-9]/g, "");
                raw = raw.slice(0, -1) || "0";
                cashDisplay.textContent = formatCurrency(parseInt(raw, 10) / 100);
            } else {
                let raw = cashDisplay.textContent.replace(/[^0-9]/g, "");
                raw += key;
                cashDisplay.textContent = formatCurrency(parseInt(raw, 10) / 100);
            }

            // Update change
            const cash = parseCurrency(cashDisplay.textContent);
            if (changeDisplay) {
                const change = cash - totalAmount;
                changeDisplay.textContent = formatCurrency(Math.max(0, change));
            }
        });
    });

    // Quick amount buttons
    document.querySelectorAll("[data-quick-amount]").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!cashDisplay) return;
            const amt = btn.dataset.quickAmount;
            if (amt === "exact") {
                cashDisplay.textContent = formatCurrency(totalAmount);
            } else {
                cashDisplay.textContent = formatCurrency(parseFloat(amt));
            }
            const cash = parseCurrency(cashDisplay.textContent);
            if (changeDisplay) {
                changeDisplay.textContent = formatCurrency(
                    Math.max(0, cash - totalAmount)
                );
            }
        });
    });

    /* ================================================
       5. CATEGORY FILTER TABS
    ================================================ */
    document.querySelectorAll("[data-category-tab]").forEach((tab) => {
        tab.addEventListener("click", () => {
            // Reset all tabs
            document.querySelectorAll("[data-category-tab]").forEach((t) => {
                t.classList.remove(
                    "bg-primary",
                    "text-white",
                    "shadow-lg",
                    "shadow-primary/20"
                );
                t.classList.add(
                    "bg-white",
                    "dark:bg-slate-800",
                    "text-slate-600",
                    "dark:text-slate-300",
                    "border",
                    "border-slate-100",
                    "dark:border-slate-700"
                );
            });
            // Activate clicked tab
            tab.classList.add(
                "bg-primary",
                "text-white",
                "shadow-lg",
                "shadow-primary/20"
            );
            tab.classList.remove(
                "bg-white",
                "dark:bg-slate-800",
                "text-slate-600",
                "dark:text-slate-300",
                "border",
                "border-slate-100",
                "dark:border-slate-700"
            );

            // Filter items
            const category = tab.dataset.categoryTab;
            document.querySelectorAll("[data-item-category]").forEach((item) => {
                if (category === "all" || item.dataset.itemCategory === category) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    /* ================================================
       6. ORDER HISTORY FILTER TABS
    ================================================ */
    document.querySelectorAll("[data-status-tab]").forEach((tab) => {
        tab.addEventListener("click", () => {
            document.querySelectorAll("[data-status-tab]").forEach((t) => {
                t.classList.remove("bg-[var(--primary)]", "text-white");
                t.classList.add("bg-white", "text-[var(--ios-text-secondary)]");
            });
            tab.classList.add("bg-[var(--primary)]", "text-white");
            tab.classList.remove("bg-white", "text-[var(--ios-text-secondary)]");

            const status = tab.dataset.statusTab;
            document.querySelectorAll("[data-order-status]").forEach((card) => {
                if (status === "all" || card.dataset.orderStatus === status) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    /* ================================================
       HELPERS
    ================================================ */
    function formatCurrency(num) {
        return "$" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function parseCurrency(str) {
        return parseFloat(str.replace(/[^0-9.]/g, "")) || 0;
    }
});
