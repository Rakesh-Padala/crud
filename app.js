async function addData(){
    const id = document.getElementById("rollno").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;
    const response=await fetch("http://localhost:3000/student",{
        method : "POST",
        body:JSON.stringify({
            "id" : id,
            "name" : name,
            "age" : age,
            "course" : course
        })
    })
    if(response.ok){
        fetchData()
    }
    else{
        alert("Failed to add student ")
    }

}
document.addEventListener("DOMContentLoaded",fetchData())
async function fetchData(){


    const response= await fetch("http://localhost:3000/student")
    if(response.ok){
        const students= await response.json()
        const studentList=document.getElementById("student_list")
        studentList.innerHTML="";
        students.forEach((student)=>{
            const data = document.createElement("tr");
            const rowId = `student_${student.id}`; 
            data.setAttribute("id", rowId);
            data.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>

                <td id="buttons">
                    <button onclick="updateData(${student.id})"><span class="material-symbols-outlined">
                    edit
                    </span></button>
                    <button onclick="deleteData(${student.id})"><span class="material-symbols-outlined">
                    delete
                    </span></button>
                </td>
            `
            studentList.appendChild(data);
        })
    }
    else{
        alert("Failed to load")

    }
}
async function deleteData(studentId) {
    try {
        const response = await fetch(`http://localhost:3000/student/${studentId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const deletedRow = document.getElementById(`student_${studentId}`);
            if (deletedRow) {
                deletedRow.remove();
            } else {
                console.error('Row not found:', studentId);
            }
        } else {
            throw new Error('Failed to delete student');
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
    }
}

async function updateData(studentId) {
    const newName = prompt("Enter new name:");
    const newAge = prompt("Enter new age:");
    const newCourse = prompt("Enter new course:");

    const response = await fetch(`http://localhost:3000/student/${studentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newName,
            age: newAge,
            course: newCourse
        })
    });
}
