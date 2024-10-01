function handle_Student_Registration(event) {
  event.preventDefault();

  // Get form and form data
  const form = document.getElementById('studentRegistrationForm');
  const formData = new FormData(form);

  // Retrieve all form fields
  const username = form.querySelector('#username').value;
  const first_name = form.querySelector('#first_name').value;
  const last_name = form.querySelector('#last_name').value;
  const email = form.querySelector('#email').value;
  const mobile_no = form.querySelector('#mobile_no').value;
  const password = form.querySelector('#password').value;
  const confirmPassword = form.querySelector('#confirm_password').value;
  const image = form.querySelector('#image').files[0];

  // Validation for passwords
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
  if (password !== confirmPassword) {
      displayError("Passwords do not match.");
      alert("Passwords do not match.");
      return;
  }

  if (!passwordRegex.test(password)) {
      displayError("Password must contain at least eight characters, one letter, one number, and one special character.");
      return;
  }

  // Add all fields to FormData (if not added by default)
  formData.append('username', username);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('profile.image', image);
  formData.append('mobile_no', mobile_no);
  formData.append('password', password);  // Password will be sent via FormData

  // Image is automatically added with FormData, if it has a name attribute

  // Send the FormData via fetch
  fetch("http://127.0.0.1:8000/student/register/", {
      method: "POST",
      body: formData,
  })
  .then((res) => {
      if (!res.ok) {
          return res.json().then(err => { throw err; });
      }
      return res.json();
  })
  .then((data) => {
      if (data.message) {
          alert(data.message);
          window.location.href = 'student_login.html'; 
      } else if (data.errors) {
          displayError(Object.values(data.errors).flat().join(' '));
      }
  })
  .catch((error) => {
      console.error("Error:", error);
      handleFormErrors(error);
  });
}
function loadDepartments() {
  const departmentSelect = document.querySelector('#department');
  fetch("http://127.0.0.1:8000/teacher/department_list/")
  .then(response => response.json())
  .then(data => {
      data.departments.forEach(department => {
          const option = document.createElement('option');
          option.value = department.id;  
          option.text = department.name;  
          departmentSelect.appendChild(option);
      });
  })
  .catch(error => console.error('Error fetching departments:', error));
}

// Call loadDepartments on page load
document.addEventListener('DOMContentLoaded', loadDepartments);

function handle_Teacher_Registration(event) {
  event.preventDefault(); //stops the form from submitting the traditional way, allowing JavaScript to handle it.

  const form = document.getElementById('teacherRegistrationForm'); //Retrieves the form
  const formData = new FormData(form);

  // Retrieve all form fields
  const username = form.querySelector('#username').value;
  const first_name = form.querySelector('#first_name').value;
  const last_name = form.querySelector('#last_name').value;
  const email = form.querySelector('#email').value;
  const bio = form.querySelector('#bio').value;
  const department = form.querySelector('#department').value;
  const password = form.querySelector('#password').value;
  const confirmPassword = form.querySelector('#confirm_password').value;
  const image = form.querySelector('#image').files[0];

  // Validation for passwords
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
  if (password !== confirmPassword) {
      displayError("Passwords do not match.");
      alert("Passwords do not match.");
      return;
  }

  if (!passwordRegex.test(password)) {
      displayError("Password must contain at least eight characters, one letter, one number, and one special character.");
      return;
  }

  // Add all fields to FormData (if not added by default)
  formData.append('username', username);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('email', email);
  formData.append('profile.image', image);
  formData.append('bio', bio);
  formData.append('department', department);
  formData.append('password', password); 


  fetch("http://127.0.0.1:8000/teacher/register/", {
      method: "POST",
      body: formData,
  })
  .then((res) => {
      if (!res.ok) {
          return res.json().then(err => { throw err; });
      }
      return res.json();
  })
  .then((data) => {
      if (data.message) {
          alert(data.message);
          window.location.href = 'student_login.html'; 
      } else if (data.errors) {
          displayError(Object.values(data.errors).flat().join(' '));
      }
  })
  .catch((error) => {
      console.error("Error:", error);
      handleFormErrors(error);
  });
}

function handleFormErrors(error) {
  if (error.image) {
      displayError(`Image Error: ${error.image.join(', ')}`);
  } else if (error.mobile_no) {
      displayError(`Mobile Number Error: ${error.mobile_no.join(', ')}`);
  } else if (error.password) {
      displayError(`Password Error: ${error.password.join(', ')}`);
  } else {
      displayError("Registration failed. Please try again.");
  }
}

function displayError(message) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}


const getValue = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    console.error(`Element with ID "${id}" not found.`);
    return null;
  }
  return element.value;
};


const handle_Student_Login = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  console.log(username, password);
  if ((username, password)) {
    fetch("http://127.0.0.1:8000/student/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.student_token && data.student_id) {
          localStorage.setItem("student_token", data.student_token);
          localStorage.setItem("student_id", data.student_id);
          window.location.href = "student_dash.html";
        }
      });
  }
};
const handle_Teacher_Login = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");
  console.log(username, password);
  if ((username, password)) {
    fetch("http://127.0.0.1:8000/teacher/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.teacher_token && data.teacher_id) {
          localStorage.setItem("teacher_token", data.teacher_token);
          localStorage.setItem("teacher_id", data.teacher_id);
          window.location.href = "teacher_dash.html";
        }
      });
  }
};
