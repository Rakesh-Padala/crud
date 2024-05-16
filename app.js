

function addData(){
    const roll_no = document.getElementById("roll_no").value
const sname = document.getElementById("name").value
const age = document.getElementById("age").value
const course = document.getElementById("course").value
    axios.post("http://localhost:3000/student",{roll_no,sname,age,course})
    .then(response => {
        console.log(response.data)
    })
    .catch(err => console.log(err))
}
// addData()
async function fetchData(){
    const response = await axios.get("http://localhost:3000/student")
    const studentList = document.getElementById("data1")

    studentList.innerHTML = ``
    studentList.forEach(student => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${student.roll_no}</td>
            <td>${student.sname}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>

            <button>Edit</button>
            <button>Delete>/button>
        `;
        document.appendChild(row);
    });
}