document.getElementById('language-dropdown').addEventListener('change', function () {
    const language = this.value;

    const translations = {
        en: {
            clothing:'clothing',
            heading: 'Unleash Your Style',
            paragraph: 'Explore the latest trends and timeless classics. Discover what suits you best.',
            BannerTitle: 'Unleash Your Style',
            products: [
                "pain coffee", "black coffee", "3KG of black coffee", "2KG of black coffee",
                "matte coffee", "matte coffee", "2KG of coffee king", "muir wood 0.5KG",
            ]

        },
        es: {
            clothing:'ropa',
            heading: 'Da rienda suelta a tu estilo',
            paragraph: 'Explora las últimas tendencias y los clásicos atemporales. Descubre lo que mejor se adapta a ti.',
            products: [
                "café de dolor", "café negro", "3KG de café negro", "2KG de café negro",
                "café mate", "café mate", "2KG de café rey", "madera de muir 0.5KG",
                "3KG de café senior", "madera de muir 0.5KG", "3KG de café senior", "etiqueta de café",
                "café oscuro", "café masa", "café Dunkin", "dolor y café oscuro"
            ]
        },
        fr: {
            clothing:'vêtements',
            heading: 'Libérez votre style',
            paragraph: 'Explorez les dernières tendances et les classiques intemporels. Découvrez ce qui vous convient le mieux.',
            products: [
                "café de la douleur", "café noir", "3KG de café noir", "2KG de café noir",
                "café mat", "café mat", "2KG de roi café", "bois de muir 0.5KG",
                "3KG de café senior", "bois de muir 0.5KG", "3KG de café senior", "étiquette de café",
                "café noir", "café masa", "café Dunkin", "douleur et café noir"
            ]
        },
        de: {
            clothing:'Kleidung',
            heading: 'Entfesseln Sie Ihren Stil',
            paragraph: 'Entdecken Sie die neuesten Trends und zeitlosen Klassiker. Finden Sie heraus, was am besten zu Ihnen passt.',
            products: [
                "Schmerzkafé", "Schwarzer Kaffee", "3KG schwarzer Kaffee", "2KG schwarzer Kaffee",
                "Matte Kaffee", "Matte Kaffee", "2KG Kaffeekönig", "Muir Holz 0.5KG",
                "3KG Seniorenkaffee", "Muir Holz 0.5KG", "3KG Seniorenkaffee", "Kaffeekarte",
                "Dunkler Kaffee", "Masa Kaffee", "Dunkin Kaffee", "Schmerz und dunkler Kaffee"
            ]
        },
        ar: {
            clothing:'ملابس',
            heading: 'أطلق العنان لأسلوبك',
            paragraph: 'استكشف أحدث الصيحات والقطع الكلاسيكية الخالدة. واكتشف ما يناسبك بشكل أفضل.',
            products: [
                "قهوة الألم", "قهوة سوداء", "3 كيلو قهوة سوداء", "2 كيلو قهوة سوداء",
                "قهوة ماتيه", "قهوة ماتيه", "2 كيلو ملك القهوة", "خشب موير 0.5 كجم",
                "3 كيلو قهوة كبار", "خشب موير 0.5 كجم", "3 كيلو قهوة كبار", "بطاقة قهوة",
                "قهوة داكنة", "قهوة مسا", "قهوة دانكن", "ألم وقهوة داكنة"
            ]
        }
    };

    // Update heading and paragraph
    document.getElementById('heading').textContent = translations[language].heading;
    document.getElementById('paragraph').textContent = translations[language].paragraph;

    // Update product names
    const productItems = document.querySelectorAll('.listProduct .item');
    translations[language].products.forEach((productName, index) => {
        if (productItems[index]) {
            productItems[index].querySelector('h2').textContent = productName;
        }
    });
});

let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{ product_id: product_id, quantity: 1 }];
    } else if (positionThisProductInCart < 0) {
        cart.push({ product_id: product_id, quantity: 1 });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            newItem.innerHTML = `
                <div class="image"><img src="${info.image}"></div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>`;
            listCartHTML.appendChild(newItem);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        if (type === 'plus') {
            info.quantity += 1;
        } else {
            let newQuantity = info.quantity - 1;
            if (newQuantity > 0) {
                info.quantity = newQuantity;
            } else {
                cart.splice(positionItemInCart, 1);
            }
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};
initApp();
