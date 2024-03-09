const ul = document.getElementById('items');
const btn = document.getElementById('button');

btn.addEventListener('click', postData);
function postData() {
    console.log("Test");
    const data = {
        name: 'Todo',
        status: 'unchecked'
    };

    fetch('http://localhost:6969/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = data.name;
            ul.appendChild(li);
        })
        .catch(err => console.log("JSON FAILED PARSING!!!!!!!!", err));
}
