const toastEl = document.getElementById("liveToast");
const toast = new bootstrap.Toast(toastEl, { delay: 30000 });

function showToast(message, type = "success") {
  container = document.createElement("div");
  container.id = "container";
  container.className = "position-fixed top-0 end-0 p-3";
  container.style.zIndex = "1080";
  document.body.appendChild(container);

  // 2️⃣ Toast элементийг үүсгэх
  const toastEl = document.createElement("div");
  toastEl.className = "toast align-items-center text-white border-0";
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");

  // Өнгө тохируулах
  if (type === "success") toastEl.classList.add("bg-success");
  else if (type === "error") toastEl.classList.add("bg-danger");
  else if (type === "warning") toastEl.classList.add("bg-warning");

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  container.appendChild(toastEl);

  // 3️⃣ Bootstrap Toast дуудах
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();

  // 4️⃣ Toast дуусахад устгах
  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
}
