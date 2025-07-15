
document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form'); // corrected ID
    const workoutTypeInput = document.getElementById('workout-type');
    const workoutDurationInput = document.getElementById('workout-duration');
    const workoutList = document.getElementById('workout-list'); // corrected ID
    const filterButtons = document.querySelectorAll('.filter-btn');

    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    let currentFilter = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.filter;
            setActiveFilterButton();
            renderWorkouts();
        });
    });

    workoutForm.addEventListener('submit', event => {
        event.preventDefault();
        addWorkout();
    });

    function addWorkout () {
        const workoutType = workoutTypeInput.value.trim().toLowerCase();
        const workoutDuration = workoutDurationInput.value.trim();

        if (workoutType === '' || workoutDuration ==='') return;

        const newWorkout = {
            id: Date.now(),
            type: workoutType,
            duration: workoutDuration
        };

        workouts.push(newWorkout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        workoutTypeInput.value = '';
        workoutDurationInput.value = '';
        renderWorkouts();
    }

    function renderWorkouts() {
        workoutList.innerHTML = '';
        const filteredWorkouts = getFilteredWorkouts();
        filteredWorkouts.forEach(workout => {
            const li = document.createElement('li');
            li.textContent = `${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}: ${workout.duration} minutes`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteWorkout(workout.id));

            li.appendChild(deleteButton);
            workoutList.appendChild(li);
        });
    }

    function getFilteredWorkouts(){
        if (currentFilter === 'all') return workouts;
        return workouts.filter(workout => workout.type === currentFilter);
    }

    function deleteWorkout(id){
        workouts = workouts.filter(workout => workout.id !== id);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        renderWorkouts();
    }

    function setActiveFilterButton() {
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.filter === currentFilter){
                button.classList.add('active');
            }
        });
    }

    //Initialize the app
    setActiveFilterButton();
    renderWorkouts();
});