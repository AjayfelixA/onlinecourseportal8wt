const API_BASE = "http://localhost:5000/api";

// Fetch and display courses
async function loadCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  const data = await res.json();
  const courseList = document.getElementById("courseList");
  const courseSelect = document.getElementById("courseSelect");
  courseList.innerHTML = "";
  courseSelect.innerHTML = "";

  data.data.forEach(course => {
    const li = document.createElement("li");
    li.textContent = `${course.title} — ${course.instructor}`;
    courseList.appendChild(li);

    const option = document.createElement("option");
    option.value = course._id;
    option.textContent = course.title;
    courseSelect.appendChild(option);
  });
}

// Add a new course
document.getElementById("addCourseBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const instructor = document.getElementById("instructor").value;
  const description = document.getElementById("description").value;

  if (!title || !instructor) return alert("Please fill all fields!");

  await fetch(`${API_BASE}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, instructor, description }),
  });

  alert("Course added!");
  loadCourses();
});

// Enroll in a course
document.getElementById("enrollBtn").addEventListener("click", async () => {
  const course = document.getElementById("courseSelect").value;
  const studentName = document.getElementById("studentName").value;
  const studentEmail = document.getElementById("studentEmail").value;

  if (!course || !studentName || !studentEmail) return alert("Please fill all fields!");

  await fetch(`${API_BASE}/enrollments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course, studentName, studentEmail }),
  });

  alert("Enrollment successful!");
  loadEnrollments();
});

// Fetch and display enrollments
async function loadEnrollments() {
  const res = await fetch(`${API_BASE}/enrollments`);
  const data = await res.json();
  const list = document.getElementById("enrollmentList");
  list.innerHTML = "";
  data.data.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.studentName} enrolled in ${e.course?.title || "a course"}`;
    list.appendChild(li);
  });
}

// Initial load
loadCourses();
loadEnrollments();
