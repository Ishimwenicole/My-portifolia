// js/script.js

// INTERACTIVE JAVASCRIPT - All DOM manipulation requirements ✓

// Smooth scroll for CTA button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Progress bars animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress-bar').forEach(bar => {
                bar.style.width = bar.style.width;
            });
        }
    });
});

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// GPA Calculator Logic
let courseCount = 2;

function addCourse() {
    if (courseCount > 8) return;
    const container = document.querySelector('#gpa-calc');
    const courseDiv = document.createElement('div');
    courseDiv.className = 'input-group';
    courseDiv.innerHTML = `
        <label>Course ${courseCount} Grade (%)</label>
        <input type="number" id="grade${courseCount}" min="0" max="100" placeholder="85">
        <label>Course ${courseCount} Credit Hours</label>
        <input type="number" id="credits${courseCount}" min="1" max="6" placeholder="3">
    `;
    container.insertBefore(courseDiv, document.querySelector('.calculate-btn'));
    courseCount++;
}

function calculateGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    for (let i = 1; i < courseCount; i++) {
        const grade = parseFloat(document.getElementById(`grade${i}`)?.value || 0);
        const credits = parseFloat(document.getElementById(`credits${i}`)?.value || 0);
        
        if (grade > 0 && credits > 0) {
            let gradePoint;
            if (grade >= 90) gradePoint = 4.0;
            else if (grade >= 80) gradePoint = 3.7;
            else if (grade >= 70) gradePoint = 3.3;
            else if (grade >= 60) gradePoint = 3.0;
            else if (grade >= 50) gradePoint = 2.7;
            else gradePoint = 0;
            
            totalGradePoints += gradePoint * credits;
            totalCredits += credits;
        }
    }
    
    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const classification = gpa >= 3.5 ? 'Excellent' : gpa >= 3.0 ? 'Very Good' : 'Good';
    
    document.getElementById('gpa-result').innerHTML = `
        <h3>Your GPA: <strong>${gpa}/4.0</strong></h3>
        <p>Classification: <strong>${classification}</strong></p>
    `;
}

// Form Validation + DOM Manipulation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const formGroups = this.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorMsg = group.querySelector('.error-msg');
        let error = '';
        
        if (!input.value.trim()) {
            error = 'This field is required';
            isValid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            error = 'Please enter a valid email';
            isValid = false;
        }
        
        group.classList.toggle('error', !input.value.trim());
        errorMsg.textContent = error;
    });
    
    if (isValid) {
        document.querySelector('.submit-btn').textContent = 'Sending...';
        setTimeout(() => {
            document.getElementById('successMsg').style.display = 'block';
            document.getElementById('contactForm').reset();
            document.querySelector('.submit-btn').textContent = 'Send Message';
        }, 1500);
    }
});


const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Change button text
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});