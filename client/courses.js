const API_BASE = "http://localhost:5000/api";

async function loadCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  const data = await res.json();
  const list = document.getElementById("courseList");
  list.innerHTML = "";

  data.data.forEach(course => {
    const li = document.createElement("li");
    const instructors = Array.isArray(course.instructor)
      ? course.instructor.join(", ")
      : course.instructor;
    li.innerHTML = `<strong>${course.title}</strong> — ${instructors}<br>
                    <em>${course.description}</em><br>
                    <a href="enrollments.html" class="enroll-btn">Enroll Now</a>`;
    list.appendChild(li);
  });
}

// Add a new course
document.getElementById("addCourseBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const instructorInput = document.getElementById("instructor").value.trim();

  if (!title || !instructorInput) return alert("Please fill all fields!");

  const instructors = instructorInput.split(",").map(i => i.trim());

  await fetch(`${API_BASE}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, instructor: instructors }),
  });

  alert("Course added!");
  loadCourses();
});

loadCourses();
