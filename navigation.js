//add a global event listener for key presses in case user is keyboard navigating
window.addEventListener('keyup', toggleMenuKey);
//grab the elements we need - the sidebar div, the button in the header, and the close button on the sidebar
const sidebar = document.querySelector('#sidebar');
const menuButton = document.querySelector('#menu_button');
const closeButton = document.querySelector('#close_sidebar');

//add event listeners to the buttons to toggle the menu on click
menuButton.addEventListener('click', toggleMenu);
closeButton.addEventListener('click', toggleMenu);

//if the user is keyboard navigating and hits 'escape' we shall toggle the menu
function toggleMenuKey(e) {
	if (e.key === 'Escape') {
		toggleMenu(e);
	}
}

//the main toggle menu function
function toggleMenu(e) {
//toggle the relevant classes on the sidebar div and the button
	menuButton.classList.toggle('selected');
	sidebar.classList.toggle('open');

//change the text content on the menu button to signal what will happen if clicked at that moment
	if (menuButton.classList.contains('selected')) {
		menuButton.textContent = 'Close';
	} else {
		menuButton.textContent = 'Menu';
	}

//scroll the sidebar smoothly into view if not currently visible
	sidebar.scrollIntoView({ behavior: 'smooth' });
}


































































