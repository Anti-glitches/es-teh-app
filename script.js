const items = [
    {
        sys: { id: 1 },
        fields: {
            flavour: "original",
            background:
                "background: rgb(235,127,3); background: radial-gradient(circle, rgba(235,127,3,1) 0%, rgba(161,86,0,1) 100%);     ",
        },
    },
    {
        sys: { id: 2 },
        fields: {
            flavour: "jambu",
            background:
                "background: rgb(247,202,202); background: radial-gradient(circle, rgba(247,202,202,1) 0%, rgba(255,100,100,1) 0%, rgba(0,175,5,1) 100%);",
        },
    },
    {
        sys: { id: 3 },
        fields: {
            flavour: "mangga",
            background:
                "background: rgb(255,209,40); background: radial-gradient(circle, rgba(255,209,40,1) 0%, rgba(255,42,42,1) 100%);",
        },
    },
    {
        sys: { id: 4 },
        fields: {
            flavour: "leci",
            background:
                "background: rgb(255,252,239);background: radial-gradient(circle, rgba(255,252,239,1) 0%, rgba(255,95,95,1) 70%);",
        },
    },
    {
        sys: { id: 5 },
        fields: {
            flavour: "jeruk",
            background:
                "background: rgb(250,251,63); background: radial-gradient(circle, rgba(250,251,63,1) 0%, rgba(252,152,70,1) 100%);",
        },
    },
    {
        sys: { id: 6 },
        fields: {
            flavour: "sirsak",
            background:
                "background: rgb(170,255,173); background: radial-gradient(circle, rgba(170,255,173,1) 0%, rgba(0,175,5,1) 100%);",
        },
    },
    {
        sys: { id: 7 },
        fields: {
            flavour: "melon",
            background:
                "background: rgb(255,209,23); background: radial-gradient(circle, rgba(255,209,23,1) 24%, rgba(112,240,68,1) 100%);",
        },
    },
    ,
    {
        sys: { id: 8 },
        fields: {
            flavour: "stroberi",
            background:
                "background: rgb(255,144,144); background: radial-gradient(circle, rgba(255,144,144,1) 0%, rgba(255,0,0,1) 100%);",
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
        <div class="item" data-id="${item.sys.id}" style="${item.fields.background}">
            <h2 class="item_title">${item.fields.flavour}</h2>
                <div class="item_dateTime">
                    <span class="logo" ></span>
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

            const table = document.querySelector(".table");
            const tableItem = document.createElement("div");
            tableItem.classList.add("table_item");
            tableItem.setAttribute("data-id", id);

            tableItem.innerHTML = `
                <p class="table_item_qty">${amount}</p>
                <p class="table_item_name">${name}</p>
                <p class="table_item_time">${new Date().toLocaleTimeString()}</p>
                <button class="table_item_delete" data-id="${id}">x</button>
            `;

            table.appendChild(tableItem);

            // reset properties
            addButton.previousElementSibling.firstElementChild.nextElementSibling.innerHTML = 1;
            addButton.disabled = true;
            addButton.style.cursor = "not-allowed";
            addButton.innerHTML = "added";
            addButton.style.background = "#FFDEDE";

            deleteItem();
        });
    });
}

addToTotal();

function deleteItem() {
    const deleteButtons = [...document.querySelectorAll(".table_item_delete")];
    const addButtons = [...document.querySelectorAll(".item_button")];
    const reset = document.querySelector(".button_reset");

    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
            deleteButton.parentElement.remove();
            addButtons.forEach((addButton) => {
                if (addButton.dataset.id === deleteButton.dataset.id) {
                    addButton.previousElementSibling.firstElementChild.nextElementSibling.innerHTML = 1;
                    addButton.disabled = false;
                    addButton.style.cursor = "pointer";
                    addButton.innerHTML = "add";
                    addButton.style.background = "#c2ffbc";
                }
            });
        });
    });

    reset.addEventListener("click", () => {
        deleteButtons.forEach((deleteButton) => {
            deleteButton.parentElement.remove();
            addButtons.forEach((addButton) => {
                addButton.previousElementSibling.firstElementChild.nextElementSibling.innerHTML = 1;
                addButton.disabled = false;
                addButton.style.cursor = "pointer";
                addButton.innerHTML = "add";
                addButton.style.background = "#c2ffbc";
            });
        });
    });
}

function confirmItems() {
    const table = document.querySelector(".table");
    const confirmButton = document.querySelector(".button_confirm");

    confirmButton.addEventListener("click", () => {
        if (table.childElementCount > 1) {
            let result = confirm("Do you want to confirm?");

            if (result === true) {
                let table_items = [...document.querySelectorAll(".table_item")];
                let data = [];

                table_items.forEach((table_item) => {
                    console.log(table_item);
                    data.push({
                        sys: { id: table_item.dataset.id },
                        fields: {
                            flavour:
                                table_item.firstElementChild.nextElementSibling
                                    .innerHTML,
                            quantity: table_item.firstElementChild.innerHTML,
                            time: table_item.lastElementChild
                                .previousElementSibling.innerHTML,
                        },
                    });
                });
                console.log(data);
            }
        } else {
            alert("Your total is empty");
        }
    });
}
confirmItems();
