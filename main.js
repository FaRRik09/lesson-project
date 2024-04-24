// ! Если не работает, то нужно запустить json server
// ! npx json-server -w bd.json -p 8000

const API = 'http://localhost:8000/products';

let productList = document.getElementById('products');
let image = document.getElementById('image');
let description = document.getElementById('description');
let firstPrice = document.getElementById('pirce-1');
let secondPrice = document.getElementById('pirce-2');

let openAddFormBtn = document.getElementById('open-add-form');
let closeAddForm = document.getElementById('close-add-modal');
let addModal = document.getElementById('add-modal');
let addModalInner = document.getElementById('add-modal-inner');

// ? Достает форму добавления

let inpImage = document.getElementById('add-img');
let inpDescription = document.getElementById('add-description');
let inpFirstPrice = document.getElementById('add-price-1');
let inpSecondPrice = document.getElementById('add-price-2');
let addProductBtn = document.getElementById('add-btn');

openAddFormBtn.addEventListener('click', () => {
    addModal.style.display = 'flex';
});

closeAddForm.addEventListener('click', () => {
    addModal.style.display = 'none';
});

addProductBtn.addEventListener('click', async () => {
    let product = {
        image: inpImage.value,
        description: inpDescription.value,
        first_price: inpFirstPrice.value,
        second_price: inpSecondPrice.value,
    };

    await fetch(API, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    });
    addModal.style.display = 'none';
});

async function showProducts() {
    let products = await fetch(API).then((res) => res.json());

    productList.innerHTML = "";

    products.forEach((product, id) => {
        let div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        <img  src="${product.image}"/>
        <p>${product.description}</p>
        <div class="card-price">
            <p>${product.first_price} сом</p>
            <p>${product.second_price} сом</p>
        </div>
        `;

        productList.append(div);
    });
}

showProducts();
