let label = "All"

window.onload = (event) => {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            console.log("signed in as " + user.displayName);
            const googleUID = user.uid;
            getNotes(googleUID);
        } else {
            window.location = "index.html";
        }
    });
}

const labelSelect = document.querySelector("#select");
labelSelect.addEventListener("change", () => {
    let labelIndex = labelSelect.selectedIndex;
    label = labelSelect.options[labelIndex].value;
})

const getNotes = (userID) => {
    const notesRef = firebase.database().ref(`/users/${userID}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        renderDataAsHTML(data);
    }); 
}

const renderDataAsHTML = (data) => {
    let cards = ``;

    for(const noteItem in data) {
        const note = data[noteItem];
        if(label === "All" || label === note.label) { 
            cards += createCard(note);
        }
    }
    document.querySelector("#app").innerHTML = cards;
}

const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div class="card"> 
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
                <div class="card-content">
                    <div>${note.label}</div>
                </div>
            </div>
        </div>
    `;
}