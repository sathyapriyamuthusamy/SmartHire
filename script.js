// ==========================
// POPUPS
// ==========================

function showApplicantLogin() {
    document.getElementById("applicantLogin").style.display = "flex";
}

function showApplicantSignup() {
    document.getElementById("applicantSignup").style.display = "flex";
}

function showForgotPassword() {
    document.getElementById("forgotPasswordPopup").style.display = "flex";
}

function showRecruiterLogin() {
    let popup = document.getElementById("recruiterLogin");
    if (popup) popup.style.display = "flex";
}

function showRecruiterSignup() {
    let popup = document.getElementById("recruiterSignup");
    if (popup) popup.style.display = "flex";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

// ==========================
// APPLICANT REGISTER
// ==========================

function registerUser() {

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let confirm = document.getElementById("signupConfirm").value;

    if (!name || !email || !password || !confirm) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match");
        return;
    }

    let existingUser = localStorage.getItem(email);

    if (existingUser) {
        alert("User already exists");
        return;
    }

    let user = {
        name,
        email,
        password
    };

    localStorage.setItem(email, JSON.stringify(user));

    alert("Account Created Successfully 🎉");

    closePopup("applicantSignup");
}

// ==========================
// LOGIN
// ==========================

function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = localStorage.getItem(email);

    if (!user) {
        document.getElementById("loginMessage").innerHTML =
            "User not found ❌";
        return;
    }

    let userData = JSON.parse(user);

    if (userData.password === password) {

        localStorage.setItem("currentUser", email);

        document.getElementById("loginMessage").innerHTML =
            "Login Successful 🎉";

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("loginMessage").innerHTML =
            "Wrong Password ❌";
    }
}

// ==========================
// RESET PASSWORD
// ==========================

function resetPassword() {

    let email = document.getElementById("resetEmail").value;
    let newPassword = document.getElementById("newPassword").value;

    let user = localStorage.getItem(email);

    if (!user) {
        alert("User not found ❌");
        return;
    }

    let userData = JSON.parse(user);

    userData.password = newPassword;

    localStorage.setItem(email, JSON.stringify(userData));

    alert("Password Updated Successfully ✅");

    closePopup("forgotPasswordPopup");
}

// ==========================
// LOGOUT
// ==========================

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
}

// ==========================
// JOBS DATA
// ==========================

const jobsData = [

{
title:"Software Engineer",
company:"TCS",
location:"Chennai",
salary:"4.5 LPA"
},

{
title:"Frontend Developer",
company:"Infosys",
location:"Bangalore",
salary:"5 LPA"
},

{
title:"Data Analyst",
company:"Cognizant",
location:"Hyderabad",
salary:"6 LPA"
},

{
title:"Cloud Engineer",
company:"Accenture",
location:"Pune",
salary:"7 LPA"
},

{
title:"AI Engineer",
company:"Microsoft",
location:"Hyderabad",
salary:"12 LPA"
},

{
title:"Backend Developer",
company:"Amazon",
location:"Bangalore",
salary:"10 LPA"
},

{
title:"Java Developer",
company:"Wipro",
location:"Chennai",
salary:"5.5 LPA"
},

{
title:"Python Developer",
company:"Zoho",
location:"Chennai",
salary:"7 LPA"
},

{
title:"UI UX Designer",
company:"HCL",
location:"Noida",
salary:"5 LPA"
},

{
title:"Cyber Security Analyst",
company:"IBM",
location:"Pune",
salary:"8 LPA"
}

];

// ==========================
// LOAD JOBS
// ==========================

function loadJobs() {

    let container =
        document.getElementById("jobContainer");

    if (!container) return;

    container.innerHTML = "";

    jobsData.forEach(job => {

        container.innerHTML += `

        <div class="job-card">

            <h3>💼 ${job.title}</h3>

            <p>🏢 ${job.company}</p>

            <p>📍 ${job.location}</p>

            <p>💰 ${job.salary}</p>

            <button onclick="openApplyPopup('${job.title}')">
                Apply Now
            </button>

        </div>

        `;
    });
}

// ==========================
// SEARCH JOBS
// ==========================

function searchJobs() {

    let search =
        document.getElementById("searchJob").value.toLowerCase();

    let cards =
        document.querySelectorAll(".job-card");

    cards.forEach(card => {

        if (card.innerText.toLowerCase().includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}

// ==========================
// APPLY JOB
// ==========================

let selectedJob = "";

function openApplyPopup(jobTitle) {

    selectedJob = jobTitle;

    document.getElementById("applyRole").value = jobTitle;

    document.getElementById("applyPopup").style.display = "flex";
}

function closeApplyPopup() {

    document.getElementById("applyPopup").style.display = "none";
}

function submitApplication() {

    let name =
        document.getElementById("applyName").value;

    let email =
        document.getElementById("applyEmail").value;

    let phone =
        document.getElementById("applyPhone").value;

    let message =
        document.getElementById("applyMessage").value;

    let currentUser =
        localStorage.getItem("currentUser");

    let applications =
        JSON.parse(
            localStorage.getItem(
                currentUser + "_applications"
            )
        ) || [];

    applications.push({

        name,
        email,
        phone,
        message,
        job: selectedJob,
        date: new Date().toLocaleDateString()

    });
    localStorage.setItem(
currentUser + "_applications",
JSON.stringify(applications)
);

// save for recruiter also

let allApplications =
JSON.parse(
localStorage.getItem("applications")
) || [];

allApplications.push({

name,
email,
phone,
message,
job:selectedJob,
date:new Date().toLocaleDateString()

});

localStorage.setItem(
"applications",
JSON.stringify(allApplications)
);

    let notifications =
        JSON.parse(
            localStorage.getItem(
                currentUser + "_notifications"
            )
        ) || [];

    notifications.push({
        message:
            "Application submitted for " + selectedJob,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem(
        currentUser + "_notifications",
        JSON.stringify(notifications)
    );

    alert("Application Submitted Successfully 🎉");

    closeApplyPopup();
}

// ==========================
// VIEW APPLICATIONS
// ==========================

function viewApplications() {

    let currentUser =
        localStorage.getItem("currentUser");

    let applications =
        JSON.parse(
            localStorage.getItem(
                currentUser + "_applications"
            )
        ) || [];

    let container =
        document.getElementById("applicationList");

    if (!container) return;

    container.innerHTML = "";

    applications.forEach(app => {

        container.innerHTML += `

        <div class="job-card">

            <h3>${app.job}</h3>

            <p>👤 ${app.name}</p>

            <p>📧 ${app.email}</p>

            <p>📱 ${app.phone}</p>

            <p>📅 ${app.date}</p>

        </div>

        `;
    });
}

// ==========================
// DASHBOARD
// ==========================

function loadDashboard() {

    let currentUser =
        localStorage.getItem("currentUser");

    let user =
        JSON.parse(
            localStorage.getItem(currentUser)
        );

    if (!user) return;

    let welcome =
        document.getElementById("welcomeUser");

    if (welcome) {
        welcome.innerText =
            "Welcome, " + user.name + " 👋";
    }

    document.getElementById("jobCount").innerText =
        jobsData.length;

    let companies =
        [...new Set(jobsData.map(job => job.company))];

    document.getElementById("companyCount").innerText =
        companies.length;

    let applications =
        JSON.parse(
            localStorage.getItem(
                currentUser + "_applications"
            )
        ) || [];

    document.getElementById("applicationCount").innerText =
        applications.length;

    let companyGrid =
        document.getElementById("companyGrid");

    if (companyGrid) {

        companyGrid.innerHTML = "";

        companies.forEach(company => {

            companyGrid.innerHTML += `

            <div class="company-card">
                ${company}
            </div>

            `;
        });
    }

    let featured =
        document.getElementById("featuredJobs");

    if (featured) {

        featured.innerHTML = "";

        jobsData.slice(0, 4).forEach(job => {

            featured.innerHTML += `

            <div class="job-card">

                <h3>${job.title}</h3>

                <p>${job.company}</p>

                <p>${job.location}</p>

                <button onclick="openApplyPopup('${job.title}')">
                    Apply Now
                </button>

            </div>

            `;
        });
    }
}

// ==========================
// DARK MODE
// ==========================

function toggleTheme() {

    document.body.classList.toggle(
        "dark-theme"
    );

    localStorage.setItem(
        "theme",
        document.body.classList.contains(
            "dark-theme"
        )
    );
}

window.onload = function () {

    if (
        localStorage.getItem("theme")
        === "true"
    ) {

        document.body.classList.add(
            "dark-theme"
        );
    }
};

// ======================
// RESUME BUILDER
// ======================

function saveResume(){

let currentUser =
localStorage.getItem("currentUser");

let resumeData = {

name:
document.getElementById("resumeName").value,

email:
document.getElementById("resumeEmail").value,

phone:
document.getElementById("resumePhone").value,

skills:
document.getElementById("resumeSkills").value,

education:
document.getElementById("resumeEducation").value,

experience:
document.getElementById("resumeExperience").value

};

localStorage.setItem(
currentUser + "_resume",
JSON.stringify(resumeData)
);

showResumePreview();

alert("Resume Saved Successfully 🎉");
}

function loadResume(){

let currentUser =
localStorage.getItem("currentUser");

let resume =
JSON.parse(
localStorage.getItem(
currentUser + "_resume"
)
);

if(!resume) return;

document.getElementById("resumeName").value =
resume.name || "";

document.getElementById("resumeEmail").value =
resume.email || "";

document.getElementById("resumePhone").value =
resume.phone || "";

document.getElementById("resumeSkills").value =
resume.skills || "";

document.getElementById("resumeEducation").value =
resume.education || "";

document.getElementById("resumeExperience").value =
resume.experience || "";

showResumePreview();
}

function showResumePreview(){

let currentUser =
localStorage.getItem("currentUser");

let resume =
JSON.parse(
localStorage.getItem(
currentUser + "_resume"
)
);

if(!resume) return;

let preview =
document.getElementById(
"resumePreview"
);

if(!preview) return;

preview.innerHTML = `

<h2>${resume.name}</h2>

<p>📧 ${resume.email}</p>

<p>📱 ${resume.phone}</p>

<hr>

<h3>Skills</h3>
<p>${resume.skills}</p>

<h3>Education</h3>
<p>${resume.education}</p>

<h3>Experience</h3>
<p>${resume.experience}</p>

`;
}

function downloadResume(){

let currentUser =
localStorage.getItem("currentUser");

let resume =
JSON.parse(
localStorage.getItem(
currentUser + "_resume"
)
);

if(!resume){
alert("Please save resume first");
return;
}

let content = `

SMART HIRE RESUME

Name: ${resume.name}

Email: ${resume.email}

Phone: ${resume.phone}

Skills:
${resume.skills}

Education:
${resume.education}

Experience:
${resume.experience}

`;

let blob =
new Blob(
[content],
{
type:"text/plain"
}
);

let a =
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"Resume.txt";

a.click();
}

// =========================
// NOTIFICATIONS
// =========================

function loadNotifications(){

let currentUser =
localStorage.getItem("currentUser");

let notifications =
JSON.parse(
localStorage.getItem(
currentUser + "_notifications"
)
) || [];

let container =
document.getElementById(
"notificationList"
);

if(!container) return;

container.innerHTML = "";

if(notifications.length === 0){

container.innerHTML = `
<div class="job-card">
No Notifications Yet 🔕
</div>
`;

return;
}

notifications.forEach(note => {

container.innerHTML += `

<div class="job-card">

<h3>🔔 Notification</h3>

<p>${note.message}</p>

<p>📅 ${note.date}</p>

</div>

`;

});
}

// =========================
// RECRUITER APPLICATIONS
// =========================

function viewRecruiterApplications(){

let applications =
JSON.parse(
localStorage.getItem("applications")
) || [];

let container =
document.getElementById(
"applicationList"
);

if(!container) return;

container.innerHTML = "";

if(applications.length === 0){

container.innerHTML = `
<div class="job-card">
No Applications Yet
</div>
`;

return;
}

applications.forEach(app => {

container.innerHTML += `

<div class="job-card">

<h3>${app.job}</h3>

<p>👤 ${app.name}</p>

<p>📧 ${app.email}</p>

<p>📱 ${app.phone}</p>

<p>📝 ${app.message}</p>

<p>📅 ${app.date}</p>

</div>

`;

});
}