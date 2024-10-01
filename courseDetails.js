const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("courseId");
    fetch(`http://127.0.0.1:8000/teacher/course_detail/${param}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        displayDetails(data)
        });
  };
  

const displayDetails = (course) => {
    const parent = document.getElementById("course-details-card")
    parent.innerHTML = '';

    const div = document.createElement("div");
    div.classList.add("coures-details-body");
  div.innerHTML = `
        <h5 class="card-title">Title : ${course.title}</h5>
        <h5 class="card-title">Duration : ${course.duration}</h5>
        <h5 class="card-title">Format : ${course.format}</h5>
        <h5 class="card-title">Department : ${course.department}</h5>
        <h5 class="card-title">Teacher : ${course.teachers} </h5>
        <p class="card-text">Description : ${course.description}</p>
        <p class="card-title">Key Features : ${course.key_features}</p>
    `;
  parent.appendChild(div);
};

getparams()

