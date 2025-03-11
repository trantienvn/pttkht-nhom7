
// Dữ liệu giả lập
const scoreData = {
    "semester-scores": [
        { id: 1, code: "COMP101", name: "Lập trình cơ bản", credits: 3, diligence: 8.5, midterm: 7.5, final: 8.0, grade: "A" },
        { id: 2, code: "MATH202", name: "Toán rời rạc", credits: 3, diligence: 7.0, midterm: 8.0, final: 7.5, grade: "B+" },
        { id: 3, code: "ENG111", name: "Tiếng Anh chuyên ngành", credits: 2, diligence: 6.5, midterm: 7.0, final: 6.8, grade: "B" },
        { id: 4, code: "COMP225", name: "Cơ sở dữ liệu", credits: 4, diligence: 8.0, midterm: 8.5, final: 8.3, grade: "A" }
    ]
};

// Xác thực đăng nhập
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userType = document.querySelector('input[name="user-type"]:checked').value;

    // if (username === "admin" && password === "123456") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-app").style.display = "block";
        document.getElementById("user-name").textContent = userType === "student" ? "Sinh viên " + username : "Giảng viên " + username;
        
        document.getElementById("input-score-menu").style.display = userType === "teacher" ? "block" : "none";
        document.getElementById("export-score-menu").style.display = userType === "teacher" ? "block" : "none";
    // } else {
    //     alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    // }
}

function logout() {
    document.getElementById("main-app").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
}

function showDashboard() {
    document.getElementById("dashboard-view").style.display = "block";
    document.getElementById("student-view").style.display = "none";
    document.getElementById("input-score-view").style.display = "none";
    document.getElementById("export-score-view").style.display = "none";
}

function showStudentView() {
    document.getElementById("dashboard-view").style.display = "none";
    document.getElementById("student-view").style.display = "block";
    document.getElementById("input-score-view").style.display = "none";
    document.getElementById("export-score-view").style.display = "none";
    loadSemesterScores();
}

function showInputScoreView() {
    document.getElementById("dashboard-view").style.display = "none";
    document.getElementById("student-view").style.display = "none";
    document.getElementById("input-score-view").style.display = "block";
    document.getElementById("export-score-view").style.display = "none";
}

function showExportScoreView() {
    document.getElementById("dashboard-view").style.display = "none";
    document.getElementById("student-view").style.display = "none";
    document.getElementById("input-score-view").style.display = "none";
    document.getElementById("export-score-view").style.display = "block";
}

function filterScores() {
    alert("Lọc điểm theo học kỳ đã chọn.");
}

function exportScores() {
    alert("Xuất file điểm cho lớp và môn học đã chọn.");
}

function loadSemesterScores() {
    const tbody = document.querySelector("#semester-scores tbody");
    tbody.innerHTML = scoreData["semester-scores"].map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.code}</td>
            <td>${s.name}</td>
            <td>${s.credits}</td>
            <td>${s.diligence}</td>
            <td>${s.midterm}</td>
            <td>${s.final}</td>
            <td><span class="badge badge-success">${s.grade}</span></td>
        </tr>
    `).join("");
}

function searchScores() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const rows = document.querySelectorAll("#semester-scores tbody tr");
    rows.forEach(row => {
        const courseCode = row.cells[1].textContent.toLowerCase();
        const courseName = row.cells[2].textContent.toLowerCase();
        row.style.display = (courseCode.includes(searchTerm) || courseName.includes(searchTerm)) ? "" : "none";
    });
}

function calculateFinalScores() {
    const rows = document.querySelectorAll("#input-score-view tbody tr");
    rows.forEach(row => {
        const diligence = parseFloat(row.cells[3].querySelector("input").value) || 0;
        const midterm = parseFloat(row.cells[4].querySelector("input").value) || 0;
        const final = parseFloat(row.cells[5].querySelector("input").value) || 0;
        const totalScore = (diligence * 0.3 + midterm * 0.3 + final * 0.4).toFixed(1);
        row.cells[6].textContent = totalScore;
    });
    alert("Đã tính điểm tổng kết!");
}

function saveScores() {
    alert("Đã lưu điểm!");
}

function loadClassStudents() {
    alert("Đã tải danh sách sinh viên theo lớp và môn học đã chọn.");
}

function switchTab(tabId) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
    document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add("active");
    document.getElementById(tabId).classList.add("active");
}

// Hiển thị ngày hiện tại và thông báo động
document.getElementById("current-date").textContent = new Date().toLocaleDateString("vi-VN");
const today = new Date();
const notifications = [
    `Các môn học học kỳ 2 năm học 2024-2025 đã có điểm (Cập nhật: ${today.toLocaleDateString("vi-VN")}).`,
    "Sinh viên đăng ký môn học học kỳ 3 trước ngày 20/03/2025.",
    "Thông báo về lịch thi cuối kỳ học kỳ 2 năm học 2024-2025."
];
document.getElementById("notifications").innerHTML = notifications.map(n => `<li>${n}</li>`).join("");
