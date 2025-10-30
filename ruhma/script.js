let search = document.getElementById('search');
let students = document.querySelectorAll('.student');

search.oninput = function() {
    let text = search.value.toLowerCase();

    students.forEach(student => {
        let name = student.textContent.toLowerCase();
        student.style.display = name.includes(text) ? 'block' : 'none';
    });
};

students.forEach(student => {
    student.onclick = function() {
        let link = student.getAttribute('data-link');
        window.open(link, '_blank');
    };
});