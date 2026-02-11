$(function () {
  const DIRECTUS_URL = "https://tech-week.hackum.com";
  const isEn = window.location.pathname === "/event-paid-en.html";
  const eventModal = new bootstrap.Modal(document.getElementById("eventModal"));

  const form = document.getElementById("register");

  const pristine = new Pristine(form);
  const submitBtn = document.getElementById("submitBtn");
  const spinner = submitBtn.querySelector(".button-spinner");
  const buttonText = submitBtn.querySelector("span:nth-child(2)");
  $(form).on("submit", async function (e) {
    e.preventDefault();

    if (pristine.validate()) {
      submitBtn.disabled = true;
      spinner.style.display = "inline-block";
      buttonText.textContent = isEn ? "Registering..." : "Бүртгэж байна...";
      const formArray = $(this).serializeArray();
      const data = Object.fromEntries(formArray.map((f) => [f.name, f.value]));
      const updatedData = {
        ...data,
        first_name: data.first_name.trim().replace(/\s*-\s*/g, "-"),
        last_name: data.last_name.trim().replace(/\s*-\s*/g, "-"),
        org_name: data.org_name.trim().replace(/\s+/g, " "),
        position: data.position.trim().replace(/\s+/g, " "),
        register_no: data.register_no.trim().replace(/\s+/g, " "),
        nationality: isEn
          ? data.nationality.trim().replace(/\s+/g, " ")
          : "Mongolia",
      };
      try {
        const res = await fetch(`${DIRECTUS_URL}/items/event_tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(JSON.stringify(data.errors));
        }
        showToast(
          isEn ? "Successfully created register" : "Бүртгэл амжилттай үүслээ",
          "success"
        );
        showEvenModal();

        e.target.reset();
        form.reset();
      } catch (e) {
        const errors = JSON.parse(e.message);
        if (errors[0].extensions.field === "register_no") {
          showToast(
            isEn
              ? "Your Passport No is already registered"
              : "Регистерийн дугаар бүртгэлтэй байна",
            "error"
          );
        } else {
          showToast(isEn ? "An error occurred" : "Алдаа гарлаа!", "error");
        }
      } finally {
        submitBtn.disabled = false;
        spinner.style.display = "none";
        buttonText.textContent = isEn ? "Register" : "Бүртгүүлэх";
      }
    }
  });

  function showEvenModal() {
    const modalTitle = document.getElementById("eventModalLabel");
    const modalDesc = document.getElementById("eventDesc");
    const modalOrgLink = document.getElementById("orgLink");

    modalTitle.textContent = isEn
      ? "Successfully registered"
      : "Амжилттай бүртгэгдлээ";
    modalDesc.textContent = isEn
      ? "Please check your email address. /If it does not arrive in your Inbox, please check your spam folder/"
      : "Цахим урилгыг таны шуудан руу илгээлээ, Та цахим шуудангаа шалгана уу. /Inbox хавтаст ирээгүй бол спам хавтсыг шалгана уу/";
    modalOrgLink.textContent = isEn ? "Ok" : "Ойлголоо";

    // Modal нээх
    eventModal.show();
  }
});
