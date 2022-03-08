const items = [
    {
        sys: { id: 1 },
        fields: {
            flavour: "sirsak",
        },
    },
    {
        sys: { id: 2 },
        fields: {
            flavour: "jeruk",
        },
    },
    {
        sys: { id: 3 },
        fields: {
            flavour: "mangga",
        },
    },
    {
        sys: { id: 4 },
        fields: {
            flavour: "jambu",
        },
    },
    {
        sys: { id: 5 },
        fields: {
            flavour: "leci",
        },
    },
    {
        sys: { id: 6 },
        fields: {
            flavour: "stroberi",
        },
    },
    {
        sys: { id: 7 },
        fields: {
            flavour: "original",
        },
    },
];

function createItem() {
    const menuItems = document.querySelector(".menu_items");

    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    let result = "";

    items.forEach((item) => {
        result += `
         <div class="item" data-id="${item.sys.id}">
            <h2 class="item_title">${item.fields.flavour}</h2>
                <div class="item_dateTime">
                    <h5 class="item_date">${date}</h5>
                    <h3 class="item_time">${time}</h3>
                </div>
            <div class="item_amount">
                <button class="left">-</button>
                <span class="number" data-id="${item.sys.id}">1</span>
                <button class="right">+</button>
            </div>
            <button class="item_button" data-id="${item.sys.id}">add</button>
        </div>
        `;
    });

    menuItems.innerHTML = result;
}

createItem();

function updateDateTime() {
    const itemTimeAll = [...document.querySelectorAll(".item_time")];
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();

    // update time and date
    itemTimeAll.forEach((itemTime) => {
        itemTime.textContent = time;
        itemTime.previousElementSibling.textContent = date;
    });
}

setInterval(updateDateTime, 1000);

function updateAmount() {
    const leftButtons = [...document.querySelectorAll(".left")];
    const rightButtons = [...document.querySelectorAll(".right")];

    // decrement amount
    leftButtons.forEach((leftButton) => {
        leftButton.addEventListener("click", () => {
            const number = leftButton.nextElementSibling;

            if (parseInt(number.innerHTML) > 1) {
                number.innerHTML = parseInt(number.innerHTML) - 1;
            }
        });
    });

    // incriment amount
    rightButtons.forEach((rightButton) => {
        rightButton.addEventListener("click", () => {
            const number = rightButton.previousElementSibling;

            number.innerHTML = parseInt(number.innerHTML) + 1;
        });
    });
}

updateAmount();

function addToTotal() {
    const addButtons = [...document.querySelectorAll(".item_button")];

    addButtons.forEach((addButton) => {
        addButton.addEventListener("click", () => {
            let amount =
                addButton.previousElementSibling.firstElementChild
                    .nextElementSibling.innerHTML;
            let id = addButton.dataset.id;
            let name =
                addButton.previousElementSibling.previousElementSibling
                    .previousElementSibling.innerHTML;
            console.log(`id: ${id}, amount: ${amount}, name: ${name}`);
            // return { id: id, amount: amount, name: name };

            const table = document.querySelector(".table");
            const tableItem = document.createElement("div");
            tableItem.classList.add("table_item");

            tableItem.innerHTML = `
                <p class="table_item_qty">${amount}</p>
                <p class="table_item_name">${name}</p>
                <p class="table_item_time">${new Date().toLocaleTimeString()}</p>
                <button class="table_item_delete">x</button>
            `;

            table.appendChild(tableItem);
        });
    });
}

addToTotal();

// function createTableItem() {
//     const tableItem = document.createElement("div");
//     tableItem.classList.add("table_item");

//     tableItem.innerHTML = `
//         <p class="table_item_qty">${}</p>
//         <p class="table_item_name">sirsak</p>
//         <p class="table_item_time">17:00:34 PM</p>
//         <button class="table_item_delete">x</button>
//     `;
// }
