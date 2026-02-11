$(document).ready(function () {
  const form = document.getElementById("register");
  const pristine = new Pristine(form);
  const DIRECTUS_URL = "https://tech-week.hackum.com";
  const paidRadios = document.querySelectorAll('input[name="paid_or_not"]');
  const taxGroup = document.getElementById("tax-group");
  const taxInput = taxGroup.querySelector('input[name="paid_amount"]');
  let uploadedFileId = null;
  paidRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "yes" && radio.checked) {
        taxGroup.style.display = "block";
        taxInput.setAttribute("required", "true");
        taxInput.setAttribute(
          "data-pristine-required-message",
          "Такс дүн оруулна уу"
        );
      } else if (radio.value === "no" && radio.checked) {
        taxGroup.style.display = "none";
        taxInput.removeAttribute("required");
        taxInput.removeAttribute("data-pristine-required-message");
        pristine.reset();
      }
    });
  });

  const fileInput = document.querySelector("#eventImg");
  const previewImg = document.getElementById("preview");
  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) {
      previewImg.style.display = "none";
      previewImg.src = "";
      return;
    }

    try {
      const fd = new FormData();
      fd.append("file", file);

      const uploadRes = await fetch(`${DIRECTUS_URL}/files`, {
        method: "POST",
        body: fd,
      });
      if (!uploadRes.ok) throw new Error("Зураг upload амжилтгүй!");
      const uploadResult = await uploadRes.json();

      uploadedFileId = uploadResult.data.id;

      previewImg.src = `${DIRECTUS_URL}/assets/${uploadResult.data.id}`;
      previewImg.style.display = "block";
    } catch (err) {
      showToast("Алдаа гарлаа!", "error");
    }
  });

  const input = document.getElementById("paidAmount");

  input.addEventListener("input", (e) => {
    // Тоог дунд нь таслалаар форматлах
    let value = e.target.value.replace(/\D/g, "");
    if (value) {
      value = parseInt(value, 10).toLocaleString("en-US"); // 100000 → 100,000
    }
    e.target.value = value;
  });

  const submitBtn = document.getElementById("submitBtn");
  const spinner = submitBtn.querySelector(".button-spinner");
  const buttonText = submitBtn.querySelector("span:nth-child(2)");

  $(form).on("submit", async function (e) {
    e.preventDefault();

    if (pristine.validate()) {
      submitBtn.disabled = true;
      spinner.style.display = "inline-block";
      buttonText.textContent = "Бүртгэж байна...";
      const formArray = $(this).serializeArray();
      const data = Object.fromEntries(formArray.map((f) => [f.name, f.value]));
      const payload = {
        ...data,
        time:
          data.time && data.time.length === 5 ? data.time + ":00" : data.time,
        poster: uploadedFileId || null,
      };
      try {
        const res = await fetch(`${DIRECTUS_URL}/items/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Алдаа гарлаа!");

        const result = await res.json();
        showToast("Амжилттай илгээгдлээ!", "success");

        e.target.reset();
        form.reset();
      } catch {
        showToast("Алдаа гарлаа!", "error");
      } finally {
        submitBtn.disabled = false;
        spinner.style.display = "none";
        buttonText.textContent = "Бүртгүүлэх";
      }
    }
  });

  const eventModal = new bootstrap.Modal(document.getElementById("eventModal"));
  document.getElementById("close").onclick = () => {
    eventModal.hide();
  };
  window.showPrivacy = function () {
    eventModal.show();
  };
});
