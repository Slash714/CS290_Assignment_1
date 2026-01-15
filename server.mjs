const PORT = 3000;

import express, { urlencoded } from "express";
const app = express();

app.use(express.static('public'));

app.use(urlencoded({
    extended: true
}));

// Route handler for A. GET request --------------------------
app.get("/get-request", (req, res) => {
    const { name, whereA } = req.query;
    res.json({
        message: `Welcome to class, <strong>${name}!</strong>`,
        choices: `This data displays in the <strong>${whereA}</strong> areas.`,
    });
});


// Route handler for B. POST request -------------------------
app.post("/post-request", (req, res) => {
    const {email, whereB} = req.body;
    res.json({
        message: `Your email is <strong>${email}</strong>.`,
        choices: `This data displays in the <strong>${whereB}</strong>.`,
    });
});


// Route handler for C. Console -------------------------------
app.post("/console", (req, res) => {
  const { whereC} = req.body;

  res.json({
    message: `Console Observations:`,
    choices: `I found these errors: <strong>${whereC}</strong>.`,
  });
});


// Route handler for D. Status codes using POST ----------------
app.post("/codes", (req, res) => {
    const { index, modal, css, favicon, unsureD} = req.body;
    res.json({
      message: "Status codes for these pages:",
      choices: {
        index,
        modal,
        css,
        favicon,
        unsureD
      }
    });
  });
  
// Route handler for E. Style ----------------------------
app.post("/styles", (req, res) => {
    const { bodyFont, bodyMargin, unsureE} = req.body;
    res.json({
      message: `Elements and styles:`,
      choices: {
        bodyFont,
        bodyMargin,
        unsureE
      }
    });
  });



// Listen for the local server on port specified above.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});