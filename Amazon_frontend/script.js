// Animate numbers on home page
function animateCount(id, target) {
  const el = document.getElementById(id);
  let count = 0;
  const step = target / 100;
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(count);
  }, 20);
}

window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("activeDonors")) {
    animateCount("activeDonors", 44);
    animateCount("cities", 8);
    animateCount("centers", 8);
  }
});

// Form submission
document.getElementById("donorForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const bloodGroup = document.getElementById("bloodGroup").value;
  const city = document.getElementById("city").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, bloodGroup, city })
  });

  if (res.ok) {
    alert("Registration Successful!");
    e.target.reset();
  } else {
    alert("Error in registration.");
  }
});