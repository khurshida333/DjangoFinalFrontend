
const loadCourses = (search) => {
    console.log("Search term:", search); // Log the search term
    document.getElementById("courses").innerHTML = ""
    console.log(search)
    fetch(`http://127.0.0.1:8000/teacher/course_list/?search=${search ? search : ""}`)   //search thakle search nathakle kisuna   //search thakle search nathakle kisuna
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
                displayCourses(data);
        });
};
const displayCourses = (courses) => {
    console.log(courses)
    courses?.forEach((course) => {    // checks if the left-hand side of the (?) operator is not null or undefined
        console.log(course);
        const parent = document.getElementById("courses");
        const div = document.createElement("div");
        div.classList.add("course-card");   //doc-card is a class that div tag which we created above
        div.innerHTML = `
            <img class="course-img" src="./images/download.jpg" alt="course Image" />
            <h4>Title : ${course?.title}</h4>
            <h5>Format : ${course?.format}</h5>
            <h6>Duration : ${course?.duration}</h6>
            <p>Dept : 
                ${course?.department?.map((item) => {
            return `<button class="btn dept-btn">${item}</button>`;
        })}
            </p>
            <button class="btn detail-btn"><a target="_blank" href="courseDetails.html?courseId=${course.id}" style="color: white; text-decoration: none;">Details</a> </button>
        `;
        parent.appendChild(div);
    });
};

const loadDepartment = () => {
    fetch("http://127.0.0.1:8000/teacher/department_list/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("drop-dept")
                const li = document.createElement("li");
                li.classList.add("dropdown-item")
                li.innerText = item?.name;
                li.onclick = () => loadCourses(item?.name); // Set onclick handler
                parent.appendChild(li);
            })
        });
};


document.addEventListener("DOMContentLoaded", function() {
    loadDepartment();
    loadCourses();  
});

