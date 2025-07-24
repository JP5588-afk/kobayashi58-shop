script.js
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");

  cartContainer.innerHTML = ""; // 清空再重新渲染
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = 
      <img src="https://via.placeholder.com/80" alt="商品圖示" class="cart-img">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>單價：NT$${item.price}</p>
        <label>數量：</label>
        <select data-index="${index}" class="qty">
          ${[...Array(10)].map((_, i) => 
            <option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>
          ).join('')}
        </select>
        <p>小計：NT$${subtotal}</p>
        <button class="remove-btn" data-index="${index}">🗑 刪除</button>
      </div>
    ;
    cartContainer.appendChild(div);
  });

  totalDisplay.textContent = 總金額：NT$${total};
}

function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.name === name);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(${name} 已加入購物車！);
}

// ✅ 初始化購物車畫面
document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();

  const cartContainer = document.getElementById("cart-items");

  cartContainer.addEventListener("change", function (e) {
    if (e.target.classList.contains("qty")) {
      const index = e.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart[index].quantity = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  });

  cartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  });
});
