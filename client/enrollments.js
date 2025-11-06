const API_BASE = "http://localhost:5000/api";

// Load courses in dropdown
async function loadCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  const data = await res.json();
  const select = document.getElementById("courseSelect");
  select.innerHTML = "";

  data.data.forEach(course => {
    const option = document.createElement("option");
    option.value = course._id;
    option.textContent = `${course.title} (${Array.isArray(course.instructor) ? course.instructor.join(", ") : course.instructor})`;
    select.appendChild(option);
  });
}

// Add enrollment
document.getElementById("enrollBtn").addEventListener("click", async () => {
  const course = document.getElementById("courseSelect").value;
  const studentName = document.getElementById("studentName").value.trim();
  const studentEmail = document.getElementById("studentEmail").value.trim();

  if (!course || !studentName || !studentEmail) return alert("Fill all fields!");

  await fetch(`${API_BASE}/enrollments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course, studentName, studentEmail }),
  });

  alert("Enrolled successfully!");
  loadEnrollments();
});

// Load enrollments
async function loadEnrollments() {
  const res = await fetch(`${API_BASE}/enrollments`);
  const data = await res.json();
  const list = document.getElementById("enrollmentList");
  list.innerHTML = "";

  data.data.forEach(enroll => {
    const li = document.createElement("li");
    const instructors = Array.isArray(enroll.course.instructor)
      ? enroll.course.instructor.join(", ")
      : enroll.course.instructor;
    li.innerHTML = `<strong>${enroll.studentName}</strong> enrolled in <b>${enroll.course.title}</b> <br>
                    <small>Instructors: ${instructors}</small>`;
    list.appendChild(li);
  });
}

loadCourses();
loadEnrollments();
