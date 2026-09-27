// ============================================================
// FILE: script.js (Cập nhật: Ảnh hình vuông & Đổi tên nút thành Liên hệ SĐT)
// ============================================================

// ============================================================
// KHU VỰC CẤU HÌNH CHUNG (BẠN CÓ THỂ TỰ SỬA LINK Ở ĐÂY)
// ============================================================
const CONFIG = {
    // 1. Ảnh đại diện mặc định và icon chung cho toàn bộ app
    commonIconLink: "https://cdn.upanhlaylink.com/i/7HNhETSV.jpeg",
    topImageLink: "https://cdn.upanhlaylink.com/i/oYF8RJhc.jpeg",

    // 2. CẤU HÌNH RIÊNG CHO MỤC THUÊ KEY (BẠN TỰ SỬA LINK ẢNH & KEY TẠI ĐÂY)
    rentKeyConfig: {
        title: "Hệ Thống Thuê Key",
        imageLink: "https://cdn.phototourl.com/member/2026-09-27-e0cdac09-7d37-48b1-94be-9ef9667506b6.jpg", // <--- SỬA LINK ẢNH Ở ĐÂY
        linkToRent: "https://zalo.me/0939251990",                  // <--- SỬA LINK LIÊN HỆ ZALO/SĐT Ở ĐÂY
        keyValue: "BCXVIP37X82"                                    // <--- SỬA MÃ KEY Ở ĐÂY
    },

    // 3. Thông tin Admin
    adminInfo: [
        { text: "TikTok Admin: rockbye_7", link: "https://www.tiktok.com/@rockbye_7" },
        { text: "Zalo Admin: 0939251990", link: "https://zalo.me/0939251990" },
        { text: "Box Thông Báo Zalo", link: "https://zalo.me/g/wchjglkuyq0rxa0ijmgg" }
    ],

    // 4. Danh sách các menu hack
    menuGroups: [
        {
            title: "IPA FREE FIRE IOS",
            items: [
                { text: "Dòng 1", link: "https://appinstall.cloud/install/vjgqyr522222" },
                { text: "Migul Pro Cần Mẹo", link: "https://appinstall.cloud/install/qla9qe188888" },
                { text: "Migul Pro Real", link: "#" },
                { text: "Migul Pro No Mẹo", link: "https://appinstall.cloud/install/qla9qe188888" },
                { text: "Free Fire IOS", link: "https://appinstall.cloud/install-pro/3uuwqy7lnc5555" },
                { text: "Migul", link: "https://appinstall.cloud/install-pro/m5aulpme7777" },
                { text: "Proxy XuMod", link: "https://appinstall.cloud/install-pro/psxj0gu00000" },
                { text: "Zoro FF IOS", link: "https://appinstall.cloud/install-pro/yr8z7v666666" },
                { text: "ZORO DS", link: "https://appinstall.cloud/install-pro/yr8z7v666666?zarsrc=30&utm_source=zalo&utm_medium=zalo&utm_campaign=zalo" }
            ]
        },
        {
            title: "TIPA FREE FIRE IOS",
            items: [
                { text: "TIPA SUDO FF", link: "https://appinstall.cloud/install-pro/rh0rdkjp8888" },
                { text: "TIPA FFTH", link: "https://appinstall.cloud/install-pro/8y7rbsl55555" },
                { text: "TIPA FFM", link: "https://appinstall.cloud/install-pro/ưlltmktt2222" }
            ]
        },
        {
            title: "8 Ball Pool",
            items: [
                { text: "8Ball Pool IOS", link: "https://appinstall.cloud/install-pro/uhgnoj111111" },
                { text: "8BALL POOL ZORO", link: "https://appinstall.cloud/install-pro/zrbx8ryj5555" }
            ]
        },
        {
            title: "IPA LIÊN QUÂN",
            items: [
                { text: "MENU ZORO V1", link: "https://appinstall.cloud/install-pro/03vr6eix4444" },
                { text: "MENU IOS LQ", link: "https://appinstall.cloud/install-pro/wkvjkhna8888" },
                { text: "MENU ZORO VIP", link: "https://appinstall.cloud/install-pro/buddv1iv4444" }
            ]
        }
    ],

    submenu: {
        exitButton: { text: "Thoát App" },
        rentKeyButton: { text: "Thuê key" }
    }
};

// ============================================================
// HỆ THỐNG XỬ LÝ GIAO DIỆN (KHÔNG CẦN SỬA PHẦN DƯỚI NÀY)
// ============================================================

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    html, body {
        margin: 0; padding: 0; width: 100%; min-height: 100vh;
        background-color: #050000; font-family: 'Arial', sans-serif;
        overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch;
    }
    body {
        display: flex; justify-content: center; align-items: center;
        position: relative; padding: 40px 0; box-sizing: border-box;
    }
    #particles-js {
        position: fixed; width: 100vw; height: 100vh; top: 0; left: 0;
        z-index: -1; background: #050000; pointer-events: none;
    }
    #app-container {
        width: 300px; position: relative; z-index: 1; max-width: 90%; 
        perspective: 1000px; margin: auto;
    }
    .menu-card {
        background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
        padding: 20px; border-radius: 12px; box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
        width: 100%; box-sizing: border-box; overflow: hidden;
        transition: all 0.5s ease-in-out; position: relative; margin: 0 auto;
        border: 1px solid rgba(255, 0, 0, 0.3);
    }
    .menu-card:hover {
        box-shadow: 0px 0px 30px rgba(255, 0, 0, 0.9); border: 2px solid red;
    }
    .menu-card.hidden { display: none !important; visibility: hidden; }

    .moving-out-left { transform: translateX(-50px) rotateY(10deg); opacity: 0; }
    .moving-out-right { transform: translateX(50px) rotateY(-10deg); opacity: 0; }
    .moving-in-right { animation: slideInFromRight 0.5s forwards; }
    .moving-in-left { animation: slideInFromLeft 0.5s forwards; }

    @keyframes slideInFromRight {
        0% { transform: translateX(50px) rotateY(-10deg); opacity: 0; }
        100% { transform: translateX(0) rotateY(0); opacity: 1; }
    }
    @keyframes slideInFromLeft {
        0% { transform: translateX(-50px) rotateY(10deg); opacity: 0; }
        100% { transform: translateX(0) rotateY(0); opacity: 1; }
    }

    .menu-header-section { text-align: center; margin-bottom: 8px; }
    
    /* Đổi thành hình vuông (bỏ border-radius 50%, chỉnh lại kích thước vuông) */
    .top-image-container {
        width: 75px; height: 75px; border-radius: 10px; overflow: hidden;
        margin: 0 auto; border: 2px solid #3498db; box-shadow: 0 0 10px rgba(52, 152, 219, 0.4);
    }
    .topLogo { width: 100%; height: 100%; object-fit: cover; }
    .brand-title { font-size: 15px; font-weight: bold; color: #000; margin-top: 10px; margin-bottom: 5px; }
    .status { display: flex; align-items: center; margin-bottom: 8px; justify-content: center; }
    .status .indicator { width: 10px; height: 10px; background-color: #2ecc71; border-radius: 50%; margin-right: 10px; box-shadow: 0 0 8px #2ecc71; }
    .status span { font-size: 13px; font-weight: bold; color: #333; }
    .time { font-weight: bold; margin-bottom: 10px; font-size: 13px; color: #444; text-align: center; }

    .key-content-box {
        background: #f8f9fa; border: 1.5px solid #cbd5e0; border-radius: 8px;
        padding: 12px; margin-bottom: 12px; text-align: center; box-sizing: border-box;
    }
    .key-label { font-size: 11px; font-weight: 700; color: #e74c3c; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 0.5px; }
    .key-value {
        font-family: 'Courier New', monospace; font-size: 15px; font-weight: bold;
        color: #2d3748; background: #edf2f7; padding: 6px; border-radius: 6px; border: 1px dashed #a0aec0; word-break: break-all;
    }

    .section-subtitle {
        font-size: 11px; font-weight: 600; color: #e74c3c; text-transform: uppercase;
        margin-bottom: 6px; margin-top: 12px; letter-spacing: 0.5px; text-align: center;
    }
    .coder { margin-top: 15px; font-style: italic; font-size: 13px; text-align: right; color: #666; }

    .menu-list { display: flex; flex-direction: column; gap: 8px; margin-top: 5px; }
    .menu-item {
        display: flex; align-items: center; background: #fff; border: 1.5px solid #e2e8f0;
        border-radius: 8px; padding: 6px 10px; text-decoration: none; transition: all 0.2s ease; cursor: pointer;
    }
    .menu-item:hover { border-color: #e74c3c; background-color: #fff5f5; transform: translateY(-1px); }
    .item-icon { width: 30px; height: 30px; border-radius: 6px; overflow: hidden; margin-right: 10px; flex-shrink: 0; background: #eee; }
    .item-icon img { width: 100%; height: 100%; object-fit: cover; }
    .item-text { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 13px; color: #333; word-break: break-word; }

    .submenu-content { display: flex; flex-direction: column; gap: 10px; padding: 5px 0; }
    .submenu-btn {
        width: 100%; height: 45px; border: 0; border-radius: 12px; font-size: 14px;
        font-weight: 900; cursor: pointer; letter-spacing: 0.5px; transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2); display: grid; place-items: center; text-decoration: none; box-sizing: border-box; font-family: 'Poppins', sans-serif;
        text-align: center; padding: 0 8px;
    }

    #btn-exit {
        background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; margin-bottom: 2px; border: 2px solid #fff; box-shadow: 0 0 10px rgba(231, 76, 60, 0.5);
    }
    #btn-exit:hover { background: linear-gradient(135deg, #c0392b, #a93226); transform: translateY(-2px) scale(1.02); }

    .btn-action-primary { background: linear-gradient(135deg, #3498db, #2980b9); color: white; }
    .btn-action-primary:hover { background: linear-gradient(135deg, #2980b9, #2475a8); transform: translateY(-2px) scale(1.02); }

    .btn-action-warning { background: linear-gradient(135deg, #f39c12, #e67e22); color: white; }
    .btn-action-warning:hover { background: linear-gradient(135deg, #e67e22, #d35400); transform: translateY(-2px) scale(1.02); }

    .btn-back { background: #e2e8f0; color: #4a5568; margin-top: 2px; font-size: 14px; letter-spacing: 0.5px; }
    .btn-back:hover { background: #cbd5e0; transform: translateY(-2px) scale(1.02); }
`;
document.head.appendChild(styleSheet);

document.addEventListener("DOMContentLoaded", function() {
    const appContainer = document.createElement("div");
    appContainer.id = "app-container";
    
    const bgCanvas = document.createElement("canvas");
    bgCanvas.id = "particles-js";
    document.body.appendChild(bgCanvas);

    const footerText = 'By Hoàng Đức An';
    let htmlFooter = `<div class="coder">${footerText}</div>`;

    // 1. MENU CHÍNH
    const mainCard = document.createElement("div");
    mainCard.id = "main-menu-card";
    mainCard.className = "menu-card";

    let htmlMainHeader = `
        <div class="menu-header-section">
            <div class="top-image-container">
                <img class="topLogo" src="${CONFIG.topImageLink}" alt="Top Logo">
            </div>
            <div class="brand-title">Xu Share Hack</div>
        </div>
    `;

    let htmlStatus = `
        <div class="status">
            <div class="indicator"></div>
            <span>Trạng thái: Hoạt động</span>
        </div>
        <div class="time" id="currentTime">Thời gian: --:--:--</div>
    `;

    let htmlAdmin = `<div class="section-subtitle">Thông Tin Admin</div><div class="menu-list">`;
    CONFIG.adminInfo.forEach(admin => {
        htmlAdmin += `
            <a href="${admin.link}" class="menu-item" target="_blank">
                <div class="item-icon"><img src="${CONFIG.commonIconLink}" alt="Icon"></div>
                <div class="item-text">${admin.text}</div>
            </a>
        `;
    });
    htmlAdmin += `</div>`;

    let htmlList = htmlAdmin;
    CONFIG.menuGroups.forEach((group) => {
        htmlList += `<div class="section-subtitle">${group.title}</div>`;
        htmlList += '<div class="menu-list">';
        group.items.forEach((item) => {
            htmlList += `
                <a href="javascript:void(0);" class="menu-item submenu-trigger" data-link="${item.link}" data-text="${item.text}">
                    <div class="item-icon"><img src="${CONFIG.commonIconLink}" alt="Icon"></div>
                    <div class="item-text">${item.text}</div>
                </a>
            `;
        });
        htmlList += '</div>';
    });

    mainCard.innerHTML = htmlMainHeader + htmlStatus + htmlList + htmlFooter;
    appContainer.appendChild(mainCard);

    // 2. MENU PHỤ (Nằm bên trong tất cả mục khi bấm vào)
    const subCard = document.createElement("div");
    subCard.id = "submenu-card";
    subCard.className = "menu-card hidden";

    let htmlSubHeader = `
        <div class="menu-header-section">
            <div class="top-image-container">
                <img class="topLogo" src="${CONFIG.topImageLink}" alt="Top Logo">
            </div>
            <div class="brand-title" id="subBrandTitle">Tên Mục</div>
        </div>
    `;

    let htmlSubContent = `
        <div class="submenu-content">
            <button id="btn-exit" class="submenu-btn">${CONFIG.submenu.exitButton.text}</button>
            <a href="#" id="btn-install-ios" class="submenu-btn btn-action-primary" target="_blank">Cài trực tiếp ios</a>
            <button id="btn-open-rent-key" class="submenu-btn btn-action-warning">${CONFIG.submenu.rentKeyButton.text}</button>
            <button id="btn-back-main" class="submenu-btn btn-back">Quay lại</button>
        </div>
    `;

    subCard.innerHTML = htmlSubHeader + htmlSubContent + htmlFooter;
    appContainer.appendChild(subCard);

    // 3. TRANG THUÊ KEY RIÊNG BIỆT (Đã đổi tên nút thành Liên hệ số điện thoại hỗ trợ)
    const rentKeyCard = document.createElement("div");
    rentKeyCard.id = "rentkey-card";
    rentKeyCard.className = "menu-card hidden";

    let htmlRentHeader = `
        <div class="menu-header-section">
            <div class="top-image-container">
                <img class="topLogo" src="${CONFIG.rentKeyConfig.imageLink}" alt="Rent Key Logo">
            </div>
            <div class="brand-title">${CONFIG.rentKeyConfig.title}</div>
        </div>
    `;

    let htmlRentBody = `
        <div class="submenu-content">
            <div class="key-content-box">
                <div class="key-label">NỘI DUNG NHẬP KEY:</div>
                <div class="key-value">${CONFIG.rentKeyConfig.keyValue}</div>
            </div>
            <a href="${CONFIG.rentKeyConfig.linkToRent}" id="btn-go-rent" class="submenu-btn btn-action-warning" target="_blank">Liên hệ số điện thoại hỗ trợ</a>
            <button id="btn-back-from-rent" class="submenu-btn btn-back">Quay lại</button>
        </div>
    `;

    rentKeyCard.innerHTML = htmlRentHeader + htmlRentBody + htmlFooter;
    appContainer.appendChild(rentKeyCard);

    document.body.appendChild(appContainer);

    // Xử lý sự kiện chuyển đổi qua lại giữa các card
    const submenuTriggers = document.querySelectorAll('.submenu-trigger');
    const btnBackMain = document.getElementById('btn-back-main');
    const btnBackFromRent = document.getElementById('btn-back-from-rent');
    const btnOpenRentKey = document.getElementById('btn-open-rent-key');
    const btnExit = document.getElementById('btn-exit');
    const subBrandTitle = document.getElementById('subBrandTitle');
    const btnInstallIos = document.getElementById('btn-install-ios');

    submenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const itemText = this.getAttribute('data-text');
            const itemLink = this.getAttribute('data-link');

            if (subBrandTitle) subBrandTitle.innerText = itemText;
            if (btnInstallIos) btnInstallIos.setAttribute('href', itemLink);

            switchCard(mainCard, subCard, 'right');
        });
    });

    if (btnOpenRentKey) {
        btnOpenRentKey.addEventListener('click', function() {
            switchCard(subCard, rentKeyCard, 'right');
        });
    }

    if (btnBackMain) {
        btnBackMain.addEventListener('click', function() {
            switchCard(subCard, mainCard, 'left');
        });
    }

    if (btnBackFromRent) {
        btnBackFromRent.addEventListener('click', function() {
            switchCard(rentKeyCard, subCard, 'left');
        });
    }

    if (btnExit) {
        btnExit.addEventListener('click', function() {
            window.close();
            setTimeout(() => {
                alert("Cảm ơn bạn đã sử dụng! Bạn có thể đóng tab này.");
            }, 500);
        });
    }

    function switchCard(fromCard, toCard, direction) {
        const outClass = direction === 'right' ? 'moving-out-left' : 'moving-out-right';
        const inClass = direction === 'right' ? 'moving-in-right' : 'moving-in-left';

        fromCard.classList.add(outClass);
        setTimeout(() => {
            fromCard.classList.add('hidden');
            fromCard.classList.remove(outClass);
            
            toCard.classList.remove('hidden');
            toCard.classList.add(inClass);
            setTimeout(() => { toCard.classList.remove(inClass); }, 500);
        }, 500);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateTime() {
        const timeElement = document.getElementById("currentTime");
        if (timeElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.innerText = `Thời gian: ${hours}:${minutes}:${seconds}`;
        }
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Hiệu ứng nền 3D canvas
    const canvas = document.getElementById('particles-js');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let angle = 0;
    const rings = [];
    for (let i = 0; i < 5; i++) {
        rings.push({
            radiusX: 120 + i * 45,
            radiusY: 60 + i * 25,
            rotSpeed: (i % 2 === 0 ? 1 : -1) * (0.01 + i * 0.003),
            tilt: (i * Math.PI) / 4
        });
    }

    function drawBackground3D() {
        ctx.fillStyle = "rgba(5, 0, 0, 0.25)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.font = "900 140px 'Arial Black', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(231, 76, 60, 0.06)";
        ctx.shadowColor = "rgba(255, 0, 0, 0.4)";
        ctx.shadowBlur = 30;
        ctx.fillText("001", centerX, centerY);
        ctx.restore();

        ctx.save();
        ctx.translate(centerX, centerY);

        rings.forEach((ring, index) => {
            ctx.beginPath();
            ctx.strokeStyle = index % 2 === 0 ? "rgba(231, 76, 60, 0.45)" : "rgba(255, 69, 58, 0.35)";
            ctx.lineWidth = 1.8;

            const currentAngle = angle * ring.rotSpeed;
            ctx.rotate(ring.tilt + currentAngle * 0.2);

            ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, currentAngle, 0, Math.PI * 2);
            ctx.stroke();

            const particleX = Math.cos(currentAngle * 2) * ring.radiusX;
            const particleY = Math.sin(currentAngle * 2) * ring.radiusY;
            ctx.fillStyle = "#ff3333";
            ctx.shadowColor = "#ff0000";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
        angle += 0.02;
        requestAnimationFrame(drawBackground3D);
    }

    drawBackground3D();
});