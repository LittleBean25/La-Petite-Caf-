const menuData = {
    "Coffee": [
        { name: "Espresso", price: 150, img: "espresso.jpeg" },
        { name: "Latte", price: 180, img: "latte.jpeg" },
        { name: "Cappuccino", price: 200, img: "cup.jpeg" },
        { name: "Americano", price: 160, img: "ame.jpeg" },
        { name: "Mocha", price: 220, img: "mocha.jpeg" }
    ],
    "Tea": [
        { name: "Green Tea", price: 100, img: "GT.jpg" },
        { name: "Black Tea", price: 90, img: "BT.jpeg" },
        { name: "Herbal Tea", price: 90, img: "ht.jpg" },
        { name: "Chai", price: 90, img: "c.jpeg" },
        { name: "Matcha Latte", price: 90, img: "matachl.jpg" }
    ],
    "Pastries": [
        { name: "Croissant", price: 70, img: "cro.jpeg" },
        { name: "Chocolate Cake", price: 150, img: "ck.jpg" },
        { name: "Apple Pie", price: 130, img: "ap.jpg" },
        { name: "Cheese Danish", price: 90, img: "cd.jpg" },
        { name: "Brownie", price: 100, img: "brown.jpg" }
    ],
    "Sandwiches": [
                { name: "Club Sandwich", price: 250, img: "cs.jpg" },
                { name: "Veggie Sandwich", price: 180, img: "vs.jpg" },
                { name: "Grilled Cheese", price: 150, img: "gcs.jpg" },
                { name: "Chicken Sandwich", price: 220, img: "chick.jpg" },
                { name: "Tuna Sandwich", price: 200, img: "ts.jpg" }

            ],
    "Salads": [
                { name: "Caesar Salad", price: 180, img: "caesar.jpg" },
                { name: "Greek Salad", price: 200, img: "gs.jpg" },
                { name: "Garden Salad", price: 150, img: "garden.jpg" },
                { name: "Quinoa Salad", price: 220, img: "qs.jpg" },
                { name: "Fruit Salad", price: 160, img: "fs.jpg" }

            ],
    "Beverages": [
                { name: "Mango Juice", price: 90, img: "mango.jpg" },
                { name: "Apple Juice",price: 90, img:"apple.jpg"},
                { name: "Virgin Mojito", price: 100, img: "virginm.jpg" },
                { name: "Watermelon Mojito", price: 150, img: "waterm.jpg" },
                { name: "Soda", price: 60, img: "soda.jpg" },
                { name: "Mineral Water", price: 40, img: "water.jpg" },
                { name: "Iced Tea", price: 100, img: "iced.jpg" },
                { name: "Choclate Milkshake", price: 110, img: "choco.jpg" },
                { name: "Ice Cream Milkshake", price: 200, img: "ice.jpg" },
                { name: "Strawberry Milkshake", price: 130, img: "straw.jpg" },
            


            ]
};

const cart = [];

function renderMenu() {
    const menuContainer = document.getElementById("menu");
    menuContainer.innerHTML = "";
    Object.keys(menuData).forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `<h3>${category}</h3>`;
        menuData[category].forEach(item => {
            const menuItem = document.createElement("div");
            menuItem.classList.add("menu-item");
            menuItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="menu-details">
                    <h4>${item.name}</h4>
                    <p>Price: ₹${item.price}</p>
                </div>
                <div class="menu-controls">
                    <button onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="quantity" id="qty-${item.name}">0</span>
                    <button onclick="updateQuantity('${item.name}', 1)">+</button>
                    <button class="cart-btn" onclick="addToCart('${item.name}', ${item.price})">Add</button>
                </div>
            `;
            categoryDiv.appendChild(menuItem);
        });
        menuContainer.appendChild(categoryDiv);
    });
}

function updateQuantity(name, change) {
    const qtyElement = document.getElementById(`qty-${name}`);
    let currentQty = parseInt(qtyElement.innerText);
    currentQty = Math.max(0, currentQty + change);
    qtyElement.innerText = currentQty;
}

function addToCart(name, price) {
    const qtyElement = document.getElementById(`qty-${name}`);
    const quantity = parseInt(qtyElement.innerText);
    if (quantity === 0) {
        alert("Please select a quantity before adding to cart.");
        return;
    }
    let item = cart.find(i => i.name === name);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    qtyElement.innerText = 0;
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
            <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
        `;
        cartItemsContainer.appendChild(li);
    });
    cartTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart.length = 0;
    updateCart();
}

renderMenu();
