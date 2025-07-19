
document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workout-form');
    const workoutTypeInput = document.getElementById('workout-type');
    const workoutDurationInput = document.getElementById('workout-duration');
    const workoutList = document.getElementById('workout-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let workouts = [];
    let currentFilter = 'all';
    let userId = null;
    let dbRef = null;

    // Wait for Firebase Auth to be ready
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userId = user.uid;
            dbRef = firebase.database().ref('workouts/' + userId);
            loadWorkouts();
        }
    });

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

    function addWorkout() {
        const workoutType = workoutTypeInput.value.trim().toLowerCase();
        const workoutDuration = workoutDurationInput.value.trim();

        if (workoutType === '' || workoutDuration === '') return;

        const newWorkout = {
            id: Date.now(),
            type: workoutType,
            duration: workoutDuration
        };

        // Push to Firebase
        dbRef.push(newWorkout, function (error) {
            if (!error) {
                workoutTypeInput.value = '';
                workoutDurationInput.value = '';
            }
        });
    }

    function loadWorkouts() {
        dbRef.on('value', function (snapshot) {
            const data = snapshot.val() || {};
            workouts = Object.keys(data).map(key => ({ ...data[key], _firebaseKey: key }));
            renderWorkouts();
        });
    }

    function renderWorkouts() {
        workoutList.innerHTML = '';
        const filteredWorkouts = getFilteredWorkouts();
        filteredWorkouts.forEach(workout => {
            const li = document.createElement('li');
            li.textContent = `${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}: ${workout.duration} minutes`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteWorkout(workout._firebaseKey));

            li.appendChild(deleteButton);
            workoutList.appendChild(li);
        });
    }

    function getFilteredWorkouts() {
        if (currentFilter === 'all') return workouts;
        return workouts.filter(workout => workout.type === currentFilter);
    }

    function deleteWorkout(firebaseKey) {
        dbRef.child(firebaseKey).remove();
    }

    function setActiveFilterButton() {
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.filter === currentFilter) {
                button.classList.add('active');
            }
        });
    }

    //Initialize the app
    setActiveFilterButton();
});