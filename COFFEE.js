let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-list");
    let totalPrice = document.getElementById("total-price");

    cartList.innerHTML = "";
    cart.forEach((cartItem, index) => {
        let li = document.createElement("li");
        li.textContent = `${cartItem.item} - ₹${cartItem.price}`;
        
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeFromCart(index);
        };

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    totalPrice.textContent = `Total: ₹${total}`;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}
