let googleUser;
let label = "General";

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  // 2. Format the data and write it to our database
  firebase.database().ref(`/users/${googleUser.uid}/`).push({
    title: noteTitle.value,
    text: noteText.value,
    label: label
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
        document.querySelector("#noteTitle").value = "";
        document.querySelector("#noteText").value = "";
    })
    .catch(error => {
        console.log("error writing new note: ", error);
    });
}

const labelSelect = document.querySelector("#select");
labelSelect.addEventListener("change", () => {
    let labelIndex = labelSelect.selectedIndex;
    label = labelSelect.options[labelIndex].value;
})