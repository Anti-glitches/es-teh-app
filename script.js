console.log(new Date().toLocaleTimeString());
console.log(new Date().toLocaleString());

function decrement() {
	const number = document.querySelector(".number");

	if (parseInt(number.innerHTML) > 1) {
		number.innerHTML = parseInt(number.innerHTML) - 1;
	}
}

function increment() {
	const number = document.querySelector(".number");

	number.innerHTML = parseInt(number.innerHTML) + 1;
}

const menuItems = document.querySelector('.menu_items');

function createItem(){
    const item = document.createElement("div");
	item.classList.add("item");

    const time = new Date().toLocaleTimeString()
    const date = new Date().toLocaleDateString()

    item.innerHTML = `
        <h2 class="item_title">es teh - sirsak</h2>
               <div class="item_dateTime">
                    <h5 class="item_date">${date}</h5>
                    <h3 class="item_time">${time}</h3>
                </div>
        <div class="item_amount">
            <button class="left" onclick="decrement()">-</button>
            <span class="number">1</span>
            <button class="right" onclick="increment()">+</button>
        </div>
        <button class="item_button">add</button>
    `

    menuItems.appendChild(item)
}

createItem()


function updateTime(){
    const itemTime = document.querySelector('.item_time');
    const itemDate = document.querySelector('.item_date')
    const time = new Date().toLocaleTimeString()
    const date = new Date().toLocaleDateString()

    itemTime.textContent = time
    itemDate.textContent = date
    console.log(time, date)
}

setInterval(updateTime, 1000)