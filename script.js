// ------------------------------------------------------
// 1. Глобальная переменная с товарами (цены из твоего каталога)
// ------------------------------------------------------
const products = [
    {id: 1, name: 'Зал на Октябрьской', price: 3500},
    {id: 2, name: 'Зал на Ленинском проспекте', price: 3000},
    {id: 3, name: 'Зал в Митино', price: 2500}
];

// ------------------------------------------------------
// 2. Корзина (пока пустая)
// ------------------------------------------------------
let cart = [];

// ------------------------------------------------------
// 3. Функция подсчета суммы (СТРЕЛОЧНАЯ ФУНКЦИЯ - как просили)
// ------------------------------------------------------
const getTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }
    return total;
};

// ------------------------------------------------------
// 4. Функция показа корзины
// ------------------------------------------------------
function showCart() {
    let cartDiv = document.getElementById('cartItems');
    let totalP = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Корзина пуста</p>';
        totalP.innerHTML = 'Итого: 0 руб';
        return;
    }
    
    let text = '';
    for (let i = 0; i < cart.length; i++) {
        text = text + '<p>' + cart[i].name + ' - ' + cart[i].price + 'руб ';
        text = text + '<button onclick="removeFromCart(' + i + ')">Удалить</button></p>';
    }
    cartDiv.innerHTML = text;
    totalP.innerHTML = 'Итого: ' + getTotalPrice() + ' руб';
}

// ------------------------------------------------------
// 5. Функция добавления в корзину
// ------------------------------------------------------
function addToCart(productId, productName, productPrice) {
    cart.push({
        id: productId,
        name: productName,
        price: productPrice
    });
    showCart();
}

// ------------------------------------------------------
// 6. Функция удаления из корзины
// ------------------------------------------------------
function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
}

// ------------------------------------------------------
// 7. Функция очистки корзины
// ------------------------------------------------------
function clearCart() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
    } else {
        cart = [];
        showCart();
    }
}

// ------------------------------------------------------
// 8. Функция оплаты
// ------------------------------------------------------
function payForCart() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
    } else {
        alert('Покупка прошла успешно!');
        cart = [];
        showCart();
    }
}

// ------------------------------------------------------
// 9. Функция фильтра (поиска)
// ------------------------------------------------------
function filterProducts() {
    let input = document.getElementById('filterInput');
    let filterText = input.value.toLowerCase();
    let cards = document.querySelectorAll('.product-card');
    
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getAttribute('data-name').toLowerCase();
        if (name.indexOf(filterText) > -1) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

// ------------------------------------------------------
// 10. Ждем загрузки страницы и настраиваем кнопки
// ------------------------------------------------------
window.onload = function() {
    // Настраиваем кнопки "Добавить в корзину"
    let buttons = document.querySelectorAll('.add-to-cart');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(event) {
            let card = event.target.closest('.product-card');
            let id = card.getAttribute('data-id');
            let name = card.getAttribute('data-name');
            let price = card.getAttribute('data-price');
            
            addToCart(id, name, Number(price));
        };
    }
    
    // Настраиваем кнопку очистки
    document.getElementById('clearCartBtn').onclick = clearCart;
    
    // Настраиваем кнопку оплаты
    document.getElementById('payBtn').onclick = payForCart;
    
    // Настраиваем поиск (фильтр)
    document.getElementById('filterInput').onkeyup = filterProducts;
};