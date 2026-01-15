document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

    let res;

    if (form.method.toUpperCase() === "GET") {
      const queryString = params.toString();
      history.pushState(null, "", `${form.action}?${queryString}`);
      res = await fetch(`${form.action}?${queryString}`);
    } else {
      res = await fetch(form.action, {
        method: form.method,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
      });
    }

    const data = await res.json();

    // Find the modal in the same section as this form.
    const modal = form.closest("section").querySelector(".modal");

    // Input data placeholder.
    let choicesContent = "";

    // D. Status Codes input.
    if (form.id === "codes") {
      choicesContent = `
        <ul>
          <li>index.html: <strong>${data.choices.index || "n/a"}</strong></li>
          <li>modal.js: <strong>${data.choices.modal || "n/a"}</strong></li>
          <li>global.css: <strong>${data.choices.css || "n/a"}</strong></li>
          <li>favicon/image: <strong>${data.choices.favicon || "n/a"}</strong></li>
          ${data.choices.unsureD ? `<li>Unsure: <strong>${data.choices.unsureD}</li></strong>` : ""}
        </ul>
      `;

      // E. Styles input
    } else if (form.id === "styles") {
      choicesContent = `
        <p><strong>${data.choices.bodyFont || "n/a"}</strong> font
           and <strong>${data.choices.bodyMargin || "n/a"}</strong> margin.
        </p>
        ${data.choices.unsureE ? `<p>Unsure: <strong>${data.choices.unsureE}</strong></p>` : ""}
      `;

      // A, B, and D checkboxes
    } else if (data.choices) {
      choicesContent = `<p>${data.choices}</p>`;
    }

    modal.innerHTML = `
      <p class="method">${form.method}</p>
      <p>${data.message}</p>
      ${choicesContent}
      ${data.ok ? `<p>${data.ok}</p>` : ""}
      <p class="continue"><button class="closeModal">Close</button> or scroll down to continue.</p>
    `;

    modal.style.display = "block";
    modal.querySelector(".closeModal").onclick = () => {
      modal.style.display = "none";
    };
  });
 

});

// Harmless error to view in the console.
nonExistentDebugFunction("This is a test error!");