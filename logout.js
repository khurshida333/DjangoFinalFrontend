const handle_student_logOut = () => {
    const student_token = localStorage.getItem("student_token");
  
    fetch("http://127.0.0.1:8000/student/logout/", {
      method: "GET",
      headers: {
        Authorization: `student_token ${student_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("student_token");
        localStorage.removeItem("student_id");
        window.location.href = "index.html";
      });
  };
const handle_teacher_logOut = () => {
    const teacher_token = localStorage.getItem("teacher_token");
  
    fetch("http://127.0.0.1:8000/teacher/logout/", {
      method: "GET",
      headers: {
        Authorization: `teacher_token ${teacher_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("teacher_token");
        localStorage.removeItem("teacher_id");
        window.location.href = "index.html"; 
      });
  };