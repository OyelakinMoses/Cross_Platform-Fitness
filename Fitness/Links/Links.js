document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Button click animation
            button.classList.add('clicked');

            // Simulate a delay for demonstration (replace with actual functionality)
            setTimeout(() => {
                alert(`You clicked: ${button.textContent}`); // Show which button was clicked
                button.classList.remove('clicked'); // Remove the class after the animation
            }, 300); // Adjust duration to match CSS transition
        });
    });
});