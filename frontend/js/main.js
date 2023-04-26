


let cart = [];

function logout() {
    fetch('http://localhost:3000/Users/logout', {
        method: 'POST',
        body: JSON.stringify({
            username: sessionStorage.getItem('username')
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    }).then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('products').innerHTML = data.error;
            } else {
                //document.getElementById('products').innerHTML = JSON.stringify(data);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('username');
                window.location.href = "../index.html";
            }
        });
}

function addToCart(id, title, description, price) {
    if (cart.findIndex(i => i.productId == id) == -1) {
        let product = {
            productId: id,
            title: title,
            description: description,
            price: price,
            quantity: 1
        };
        cart.push(product);
    }
    else {
        let index = cart.findIndex(i => i.productId == id);
        cart[index].quantity++;
    }
    renderCart();
}


async function submitOrder() {
    let setting = {
        method: 'POST',
        body: JSON.stringify(cart),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    };
    const response = await fetch("http://localhost:3000/products/makeOrder", setting);
    const jsonData = await response.json();
    alert('order placed successfully.');
    location.reload();
    //await getProducts();
}

function renderCart() {
    let index = 0;
    const tbodyCartList = document.getElementById('tbodyCartList');
    while (tbodyCartList.firstChild) {
        tbodyCartList.removeChild(tbodyCartList.lastChild);
    }
    for (item of cart) {
        const row = document.createElement('tr');

        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(item.title));
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(item.description));
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(item.price));
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.innerHTML = `<input class="form-control" type="number" value="${item.quantity}" onchange="updateQuantity(${index},this)">`;
        row.appendChild(cell);

        cell = document.createElement('td');
        cell.innerHTML = `<button class="btn btn-danger" type="button" onclick="removeFromCart('${item.productId}')">remove item</button>`;
        row.appendChild(cell);

        tbodyCartList.appendChild(row);
        index++;
    }

}

function removeFromCart(pId) {
    let index = cart.findIndex(i => i.productId == pId);
    cart.splice(index, 1);
    renderCart();
}

function updateQuantity(i, input) {
    if (input.value < 0) {
        alert('please select a positive number');
        input.value = 0;
    } else {
        cart[i].quantity = input.value;
    }
    console.log({ cart });
}

async function getProducts() {
    let setting = {
        headers: { 'Authorization': sessionStorage.getItem('token') }
    };
    const response = await fetch("http://localhost:3000/products", setting);
    const jsonData = await response.json();
    console.log({ jsonData });
    const tbodyProductList = document.getElementById('tbodyProductList');
    while (tbodyProductList.firstChild) {
        tbodyProductList.removeChild(tbodyProductList.lastChild);
    }
    for (let e of jsonData) {
        addNewProductRowToTable(e);
    }

}



function addNewProductRowToTable(product) {
    //id, title, description, price
    const row = document.createElement('tr');
    /*
    let idCell = document.createElement('td');
    idCell.appendChild(document.createTextNode(product.id));
    idCell.style.display = "none";
    row.appendChild(cell);
    */
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(product.title));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(product.description));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(product.price));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(product.quantity));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = `<button class="btn btn-secondary" onclick="addToCart('${product.id}', '${product.title}', '${product.description}', ${product.price})">add to cart</button>`;
    row.appendChild(cell);

    document.getElementById('tbodyProductList').appendChild(row);

}


async function postProduct(title, description, price, quantity) {
    let b = { "title": title, "description": description, "price": price , "quantity": quantity}
    let setting = {
        method: 'POST',
        body: JSON.stringify(b),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    };
    const response = await fetch("http://localhost:3000/products", setting);
    const jsonData = await response.json();
    alert('Product added successfully.');
    document.getElementById('btnReset').click();
    //return jsonData;
}


document.getElementById('btnRegister').addEventListener('click', (event) => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    data = postProduct(title, description, price, quantity);

    document.getElementById('title').innerHTML = data;
    document.getElementById('myform').reset();


});