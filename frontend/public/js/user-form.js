$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);

  const event_id = params.get("event_id");
  if (!event_id) {
    // Хэрэглэгч өмнөх хуудсанд буцах
    if (document.referrer) {
      window.history.back();
    } else {
      // Хэрэв өмнөх хуудас байхгүй бол үндсэн хуудас руу явуулах
      window.location.href = "index.html";
    }
  }
  const form = document.getElementById("register");
  const pristine = new Pristine(form);
  const DIRECTUS_URL = "https://tech-week.hackum.com";

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
      try {
        const res = await fetch(`${DIRECTUS_URL}/items/user_form`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            event_id,
            is_paid_payment: data?.is_paid_payment === "on",
          }),
        });
        if (!res.ok) throw new Error("Алдаа гарлаа!");
        showToast("Амжилттай илгээгдлээ!", "success");

        e.target.reset();
        form.reset();
      } catch {
        showToast("Алдаа гарлаа!!!", "error");
      } finally {
        submitBtn.disabled = false;
        spinner.style.display = "none";
        buttonText.textContent = "Бүртгүүлэх";
      }
    }
  });
});
