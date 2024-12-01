// index.js

// Callbacks
const handleClick = (ramen) => {
  // Display ramen details when clicked
  const ramenDetailDiv = document.getElementById('ramen-detail');
  ramenDetailDiv.innerHTML = `
    <h2>${ramen.name}</h2>
    <img src="${ramen.image_url}" alt="${ramen.name}" />
    <p>Restaurant: ${ramen.restaurant}</p>
    <p>Rating: ${ramen.rating}</p>
    <p>Comment: ${ramen.comment}</p>
  `;
};

const addSubmitListener = () => {
  // Attach a submit listener to the form
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get form values
    const name = form.querySelector('#new-name').value;
    const imageUrl = form.querySelector('#new-image').value;
    const restaurant = form.querySelector('#new-restaurant').value;
    
    // Create a new ramen object
    const newRamen = {
      name,
      image_url: imageUrl,
      restaurant,
      rating: 0,
      comment: 'No comment yet',
    };
    
    // Display the new ramen image
    displayRamen(newRamen);
    
    // Clear form inputs
    form.reset();
  });
};

const displayRamens = () => {
  // Fetch ramen data from the API
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      ramenMenuDiv.innerHTML = '';  // Clear the menu before adding new ramen

      // Display each ramen image
      ramens.forEach(ramen => {
        const ramenImage = document.createElement('img');
        ramenImage.src = ramen.image_url;
        ramenImage.alt = ramen.name;
        ramenImage.addEventListener('click', () => handleClick(ramen)); // Handle click on ramen image
        ramenMenuDiv.appendChild(ramenImage);
      });
    })
    .catch(err => console.log('Error fetching ramens:', err));
};

// Display a single ramen when added (without persisting)
const displayRamen = (ramen) => {
  const ramenMenuDiv = document.getElementById('ramen-menu');
  const ramenImage = document.createElement('img');
  ramenImage.src = ramen.image_url;
  ramenImage.alt = ramen.name;
  ramenImage.addEventListener('click', () => handleClick(ramen)); // Handle click on ramen image
  ramenMenuDiv.appendChild(ramenImage);
};

// Main function to initialize the app
const main = () => {
  // Display all ramen images on page load
  displayRamens();

  addSubmitListener();
};

// Wait for the DOM to load before calling main()
document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
