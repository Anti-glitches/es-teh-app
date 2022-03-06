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