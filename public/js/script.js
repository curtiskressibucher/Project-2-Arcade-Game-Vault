document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        dropdownMenu.classList.toggle('active');
    });
});

//Event Delegate so which is used to manage all the events of for a particular set of elements.
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation
document.addEventListener('submit', function (event) {
    const form = event.target;
    // Checking the form class.
    if (form.classList.contains('delete-form-review')) {
        event.preventDefault();
        confirmDelete(form);
    }
});

function confirmDelete(form) {
    //Creating the classes for styling. Pop up components
    const overlay = document.createElement('div');
    overlay.className = 'confirmation-overlay';

    const box = document.createElement('div');
    box.className = 'confirmation-box';

    const confirmationText = document.createElement('p');
    confirmationText.className = 'confirmation-text';
    confirmationText.innerHTML = 'Are you sure you want to delete this item?';

    // Creating the buttons classes for styling
    const buttons = document.createElement('div');
    buttons.className = 'confirmation-buttons';

    const yesButton = document.createElement('button');
    yesButton.className = 'confirm-yes';
    yesButton.innerHTML = 'Yes';

    //Event listner for yes click
    yesButton.addEventListener('click', function () {
        form.submit(); //Submit the form. Had to deligate an event listener to look out for submit as it was not without one.
    });

    const noButton = document.createElement('button');
    noButton.className = 'confirm-no';
    noButton.innerHTML = 'No';

    //Evenet for no button click
    noButton.onclick = function () {
        document.body.removeChild(overlay);
    };

    // Assemble it all
    box.appendChild(confirmationText);
    buttons.appendChild(yesButton);
    buttons.appendChild(noButton);
    box.appendChild(buttons);

    overlay.appendChild(box);

    document.body.appendChild(overlay);

    overlay.style.display = 'flex'; //Desplay the overlay

    return false;
}
