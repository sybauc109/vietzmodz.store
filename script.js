// =======================================================
// --- CẤU HÌNH LIÊN KẾT ẢNH & KEY ---
const CONFIG = {
    appHeaderImg: "https://cdn.upanhlaylink.com/i/YMyRdAMJ.jpeg",
    ffGlobalImg: "https://cdn.upanhlaylink.com/i/5YGIQGHx.jpeg",
    ffMaxImg: "https://cdn.upanhlaylink.com/i/YrKT9RCR.jpeg",
    validKey: "VIETZ-4408-9B04-DA63"
};

// =======================================================
// --- BIẾN TOÀN CỤC ---
let isLoggedIn = false;
let currentSelectedGame = null;

// =======================================================
// --- HÀM NHẬN DIỆN DÒNG MÁY IPHONE CHÍNH XÁC ---
function detectiPhoneModel() {
    const ua = navigator.userAgent;
    let model = "";
    if (ua.includes("iPhone")) {
        const w = window.screen.width;
        const h = window.screen.height;
        const scale = window.devicePixelRatio;
        if (ua.includes("iPhone17")) model = "iPhone 16 Pro Max / 16";
        else if (ua.includes("iPhone16")) model = "iPhone 15 Pro / 15";
        else if (ua.includes("iPhone15")) model = "iPhone 14 Pro / 14";
        else if (ua.includes("iPhone14")) {
            if (w === 430 || h === 932) model = "iPhone 14 Pro Max";
            else if (w === 390 || h === 844) model = "iPhone 14 / 13 Pro";
            else model = "iPhone 13 / 12";
        } else if (ua.includes("iPhone13")) model = "iPhone 13 / 12";
        else if (ua.includes("iPhone12")) model = "iPhone 11 / 11 Pro";
        else if (ua.includes("iPhone11")) model = "iPhone 11";
        else if (ua.includes("iPhone10,3") || ua.includes("iPhone10,6")) model = "iPhone X";
        else if (ua.includes("iPhone10,1") || ua.includes("iPhone10,4")) model = "iPhone 8";
        else if (ua.includes("iPhone9,1") || ua.includes("iPhone9,3")) model = "iPhone 7";
        else {
            if (w === 430) model = "iPhone 14/15/16 Pro Max";
            else if (w === 393) model = "iPhone 14/15/16 Pro";
            else if (w === 428) model = "iPhone 13/14 Plus";
            else if (w === 390) model = "iPhone 13 / 12 / 14";
            else if (w === 375 && scale === 3) model = "iPhone X / XS / 11 Pro";
            else if (w === 414 && scale === 3) model = "iPhone XS Max / 11 Pro Max";
            else if (w === 375 && scale === 2) model = "iPhone SE / 8 / 7";
            else model = "iPhone";
        }
    } else {
        model = "Không phải iPhone";
    }
    return model;
}

function checkSupportStatus(modelName) {
    const lowEndList = ["iPhone 7", "iPhone 8", "iPhone SE", "iPhone X"];
    let isSupported = true;
    for (let item of lowEndList) {
        if (modelName.includes(item) && !modelName.includes("XS")) {
            isSupported = false;
            break;
        }
    }
    if (!modelName.includes("iPhone")) isSupported = false;
    return isSupported;
}

// =======================================================
// --- THƯ VIỆN ICON SVG & HÌNH VẼ TỰ VẠCH (No Icon) ---
const ICONS = {
    settings: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    check: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    cross: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    arrowLeft: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    palette: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"></circle><circle cx="6.5" cy="13.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle><path d="M8.59 11.51l6.83 6.83M11.51 8.59l6.83 6.83"></path></svg>`
};

// Hàm tạo "ảnh" tự vẽ chuẩn theo yêu cầu giao diện cũ
const createDrawnImage = (type) => {
    let gradient = "";
    let content = "";

    if (type.includes('aim')) {
        gradient = "linear-gradient(135deg, #667eea 0%, #764ba2 40%, #ec008c 100%)";
        if (type === 'aimbot') content = "<div style='width:14px; height:14px; border:2px solid white; border-radius:50%; position:relative;'><div style='width:4px; height:4px; background:white; position:absolute; top:3px; left:3px; border-radius:50%;'></div></div>";
        else if (type === 'aimbody') content = "<div style='width:16px; height:20px; border:2px solid white; border-radius:3px;'></div>";
        else if (type === 'aimstomach') content = "<div style='width:14px; height:9px; border:2px solid white; border-radius:2px;'></div>";
        else if (type === 'aimhead') content = "<div style='width:11px; height:11px; border:2px solid white; border-radius:50%;'></div>";
    } 
    else if (type.includes('esp')) {
        gradient = "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)";
        if (type === 'espbox') content = "<div style='width:20px; height:20px; border:2px solid white; border-radius:2px;'></div>";
        else if (type === 'espskeleton') content = "<div style='width:12px; height:18px; border-left:2px dashed white; border-right:2px dashed white;'></div>";
        else if (type === 'esp7color') content = "<div style='width:8px; height:8px; background:white; border-radius:50%; box-shadow: 7px 0 0 #e74c3c, 14px 0 0 #f1c40f, -7px 0 0 #2ecc71, -14px 0 0 #3498db;'></div>";
    }
    else if (type.includes('skin')) {
        gradient = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
        if (type === 'skinamongus') content = "<div style='width:14px; height:18px; border:2px solid white; border-radius:6px 6px 3px 3px; background:rgba(255,255,255,0.2);'></div>";
        else if (type === 'skinpajamas') content = "<div style='font-size:11px; font-weight:bold; letter-spacing:-1px;'>Zz</div>";
        else if (type === 'skinlevinapco') content = "<div style='font-size:10px; font-weight:bold;'>LV</div>";
    }

    return `
        <div style="width: 36px; height: 36px; background: ${gradient}; 
                    border: 1px solid rgba(255,255,255,0.4); box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    display: flex; align-items: center; justify-content: center; 
                    color: white; border-radius: 4px;">
            ${content}
        </div>
    `;
};

// =======================================================
// --- CSS STYLE ---
const styleElement = document.createElement('style');
styleElement.innerHTML = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: monospace, sans-serif; outline: none; }
    html, body { height: 100%; background-color: #020202; color: #fff; overflow: hidden; user-select: none; }
    
    body { background: #020202; background-image: radial-gradient(circle at 50% 15%, rgba(40, 40, 40, 0.7) 0%, rgba(2, 2, 2, 0.98) 100%); }
    @keyframes sweep { 0% { transform: translate(-100%, -100%) rotate(45deg); opacity: 0; } 50% { opacity: 0.05; } 100% { transform: translate(100%, 100%) rotate(45deg); opacity: 0; } }
    .bg-animation { position: fixed; top: -100%; left: -100%; right: -100%; bottom: -100%; background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%); animation: sweep 4s infinite linear; pointer-events: none; z-index: 0; }

    .app-container { position: relative; display: flex; height: 100vh; flex-direction: column; align-items: center; justify-content: center; padding: 16px; z-index: 1; }
    
    .glass-card { background: linear-gradient(145deg, rgba(30, 30, 30, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 100%; max-width: 360px; display: flex; flex-direction: column; overflow: hidden; }

    .app-header { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; }
    .header-left { display: flex; align-items: center; gap: 10px; }
    .header-logo { width: 40px; height: 40px; object-fit: cover; border: 1px solid rgba(255,255,255,0.2); }
    .header-title { font-size: 14px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; }
    .header-subtitle { font-size: 9px; color: rgba(255,255,255,0.4); text-transform: uppercase; }

    .content-area { padding: 12px; overflow-y: auto; max-height: 400px; }
    .content-area::-webkit-scrollbar { width: 4px; }
    .content-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }

    .login-section { display: flex; flex-direction: column; gap: 10px; }
    .custom-input { width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 12px; text-align: center; letter-spacing: 0.05em; }
    .custom-input:focus { border-color: #3498db; }
    .custom-btn { width: 100%; padding: 10px; background-color: #3498db; color: white; border: none; font-size: 12px; font-weight: bold; cursor: pointer; text-transform: uppercase; letter-spacing: 0.05em; transition: background 0.2s; }
    .custom-btn:hover { background-color: #2980b9; }
    #loginMsg { font-size: 10px; text-align: center; min-height: 12px; margin-top: -5px; }

    .device-info { font-size: 10px; color: rgba(255,255,255,0.4); padding: 10px 0; text-align: center; }
    .supported { color: #2ecc71; }
    .unsupported { color: #e74c3c; }

    .menu-list { display: flex; flex-direction: column; gap: 8px; }
    .menu-item { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 8px; cursor: pointer; transition: all 0.2s; }
    .menu-item:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
    .item-left { display: flex; align-items: center; gap: 10px; }
    .item-icon { width: 36px; height: 36px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); }
    .item-title { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; }
    .item-desc { font-size: 9px; color: rgba(255,255,255,0.4); margin-top: 1px; }
    .action-label { font-size: 10px; color: #3498db; text-transform: uppercase; }

    .feature-page { display: none; flex-direction: column; gap: 16px; }
    .nav-bar { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .back-btn { background: none; border: none; color: #fff; cursor: pointer; padding: 4px; display: flex; align-items: center; }
    .page-title-header { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; }

    .tabs-row { display: flex; gap: 4px; background: rgba(0,0,0,0.3); padding: 2px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; }
    .tab-btn { flex: 1; padding: 6px; text-align: center; font-size: 10px; text-transform: uppercase; color: rgba(255,255,255,0.6); cursor: pointer; background: none; border: none; }
    .tab-btn.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: bold; }

    .loading-overlay { display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); flex-direction: column; align-items: center; justify-content: center; z-index: 20; }
    .spinner { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; }
    .loading-text { font-size: 11px; color: #3498db; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.1em; animation: pulse 1.5s infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

    .tab-pane { display: none; flex-direction: column; gap: 8px; animation: fadeIn 0.3s; }
    .tab-pane.active { display: flex; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    .feature-section-title { font-size: 10px; color: #3498db; text-transform: uppercase; letter-spacing: 0.1em; padding-top: 4px; }
    
    .feat-item { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.02); padding: 6px 10px; border: 1px solid rgba(255,255,255,0.05); }
    .feat-left { display: flex; align-items: center; gap: 10px; }
    .feat-label-group { display: flex; flex-direction: column; }
    .feat-title { font-size: 11px; font-weight: bold; }
    .feat-desc { font-size: 8px; color: rgba(255,255,255,0.4); margin-top: 1px; }

    .switch { position: relative; display: inline-block; width: 30px; height: 16px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.15); transition: .3s; }
    .slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 2px; bottom: 2px; background-color: white; transition: .3s; }
    input:checked + .slider { background-color: #3498db; }
    input:checked + .slider:before { transform: translateX(14px); }

    .color-picker-ui { display: none; padding: 6px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); margin-top: -5px; margin-bottom: 4px; }
    .color-picker-ui.active { display: block; }
    .color-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .color-row:last-child { margin-bottom: 0; }
    .color-label { font-size: 9px; width: 40px; color: rgba(255,255,255,0.7); }
    input[type=range] { flex: 1; height: 2px; background: rgba(255,255,255,0.2); accent-color: #3498db; cursor: pointer; }
`;
document.head.appendChild(styleElement);

// =======================================================
// --- XÂY DỰNG CẤU TRÚC HTML ---
const app = document.createElement('div');
app.className = "app-container";
app.innerHTML = `
    <div class="bg-animation"></div>

    <div class="glass-card" id="mainAppCard">
        <div class="app-header">
            <div class="header-left">
                <img src="${CONFIG.appHeaderImg}" alt="Logo" class="header-logo">
                <div>
                    <div class="header-title">VIETZMENU VUYP</div>
                    <div class="header-subtitle">secure ds panel</div>
                </div>
            </div>
            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
                ${ICONS.settings}
            </div>
        </div>

        <div class="content-area">
            <div id="loginSection" class="login-section">
                <input type="text" id="keyInput" class="custom-input" placeholder="NHẬP KEY VUYP..." autocomplete="off">
                <button class="custom-btn" id="loginBtn">Xác Thực Key</button>
                <p id="loginMsg"></p>
                <div class="device-info" id="deviceInfo"></div>
            </div>

            <div id="gameSelectList" class="menu-list" style="display: none;">
                <div class="menu-item" onclick="appManager.selectGame('ff')">
                    <div class="item-left">
                        <img src="${CONFIG.ffGlobalImg}" alt="FF" class="item-icon">
                        <div>
                            <div class="item-title">Free Fire</div>
                            <div class="item-desc">Global v1.104</div>
                        </div>
                    </div>
                    <span class="action-label">[ MỞ ]</span>
                </div>
                <div class="menu-item" onclick="appManager.selectGame('ffmax')">
                    <div class="item-left">
                        <img src="${CONFIG.ffMaxImg}" alt="FF MAX" class="item-icon">
                        <div>
                            <div class="item-title">Free Fire MAX</div>
                            <div class="item-desc">v2.104 (VN/Global)</div>
                        </div>
                    </div>
                    <span class="action-label">[ MỞ ]</span>
                </div>
            </div>
        </div>
    </div>

    <div class="glass-card feature-page" id="featurePage">
        <div class="app-header nav-bar">
            <div class="header-left">
                <button class="back-btn" onclick="appManager.goBack()">${ICONS.arrowLeft}</button>
                <div class="page-title-header" id="featurePageTitle">FREE FIRE</div>
            </div>
            <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
                ${ICONS.settings}
            </div>
        </div>

        <div class="loading-overlay" id="loadingOverlay">
            <div class="spinner"></div>
            <div class="loading-text">Đang tải dữ liệu...</div>
        </div>

        <div class="content-area">
            <div class="tabs-row">
                <button class="tab-btn active" onclick="ui.openTab(event, 'tabAimbot')">Aimbot</button>
                <button class="tab-btn" onclick="ui.openTab(event, 'tabEsp')">ESP</button>
                <button class="tab-btn" onclick="ui.openTab(event, 'tabModSkin')">Mod Skin</button>
            </div>

            <div id="tabAimbot" class="tab-pane active">
                <h4 class="feature-section-title">Cài đặt hỗ trợ bắn</h4>
                ${createFeatureItem('Aimbot', 'aimbot', true)}
                ${createFeatureItem('Aim Body', 'aimbody')}
                ${createFeatureItem('Aim Bụng', 'aimstomach')}
                ${createFeatureItem('Aim Head', 'aimhead')}
            </div>

            <div id="tabEsp" class="tab-pane">
                <h4 class="feature-section-title">Cài đặt nhìn xuyên thấu</h4>
                ${createFeatureItem('ESP Box', 'espbox', false, true)}
                ${createFeatureItem('ESP Skeleton', 'espskeleton', false, true)}
                ${createFeatureItem('Định vị 7 màu', 'esp7color')}
            </div>

            <div id="tabModSkin" class="tab-pane">
                <h4 class="feature-section-title">Cài đặt trang phục</h4>
                ${createFeatureItem('Mod Among Us', 'skinamongus', false, false, 'Nhân vật Alok thức tỉnh')}
                ${createFeatureItem('Mod Đồ ngủ hồng', 'skinpajamas', false, false, 'Nhân vật Alok thức tỉnh')}
                <div id="maxOnlySkin" style="display: none;">
                    ${createFeatureItem('Mod Áo Levi + Nạ Cỏ', 'skinlevinapco', false, false, 'Nhân vật Alok thức tỉnh')}
                </div>
            </div>
        </div>
    </div>
`;
document.body.appendChild(app);

// =======================================================
// --- HÀM HỖ TRỢ TẠO GIAO DIỆN TÍNH NĂNG ---
function createFeatureItem(title, idName, hasSwitch = true, hasColorPicker = false, subDesc = "") {
    const drawnImg = createDrawnImage(idName);
    const switchHtml = hasSwitch ? `<label class="switch"><input type="checkbox" id="sw_${idName}"><span class="slider"></span></label>` : '';
    const colorBtn = hasColorPicker ? `<button class="icon-btn" onclick="ui.toggleColorPicker('${idName}')" title="Chỉnh màu" style="padding: 4px; border-radius: 2px; background:none; border:none; cursor:pointer;">${ICONS.palette}</button>` : '';
    const subDescHtml = subDesc ? `<span class="feat-desc">${subDesc}</span>` : '';
    
    const colorPickerUi = hasColorPicker ? `
        <div class="color-picker-ui" id="cp_${idName}">
            <div class="color-row">
                <span class="color-label">Đỏ:</span>
                <input type="range" min="0" max="255" value="255" id="clr_${idName}_r">
            </div>
            <div class="color-row">
                <span class="color-label">Xanh lá:</span>
                <input type="range" min="0" max="255" value="0" id="clr_${idName}_g">
            </div>
            <div class="color-row">
                <span class="color-label">Xanh dương:</span>
                <input type="range" min="0" max="255" value="0" id="clr_${idName}_b">
            </div>
        </div>
    ` : '';

    return `
        <div style="display:flex; flex-direction:column;">
            <div class="feat-item">
                <div class="feat-left">
                    ${drawnImg}
                    <div class="feat-label-group">
                        <span class="feat-title">${title}</span>
                        ${subDescHtml}
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap: 6px;">
                    ${colorBtn}
                    ${switchHtml}
                </div>
            </div>
            ${colorPickerUi}
        </div>
    `;
}

// =======================================================
// --- LOGIC XỬ LÝ ỨNG DỤNG ---
const appManager = {
    init: function() {
        const model = detectiPhoneModel();
        const supported = checkSupportStatus(model);
        const infoBox = document.getElementById('deviceInfo');
        infoBox.innerHTML = `iPhone: ${model} | Hỗ trợ: ${supported ? '<span class="supported">Có</span>' : '<span class="unsupported">Không</span>'}`;
        
        document.getElementById('loginBtn').addEventListener('click', () => {
            const val = document.getElementById('keyInput').value.trim();
            const msg = document.getElementById('loginMsg');
            if (val === CONFIG.validKey) {
                msg.style.color = "#2ecc71";
                msg.innerText = "Xác thực thành công!";
                setTimeout(() => {
                    document.getElementById('loginSection').style.display = 'none';
                    document.getElementById('gameSelectList').style.display = 'flex';
                }, 600);
            } else {
                msg.style.color = "#e74c3c";
                msg.innerText = "Key không hợp lệ hoặc đã hết hạn!";
            }
        });
    },

    selectGame: function(type) {
        currentSelectedGame = type;
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.display = 'flex';

        setTimeout(() => {
            overlay.style.display = 'none';
            document.getElementById('mainAppCard').style.display = 'none';
            const featPage = document.getElementById('featurePage');
            featPage.style.display = 'flex';

            const titleHeader = document.getElementById('featurePageTitle');
            const maxSkinDiv = document.getElementById('maxOnlySkin');

            if (type === 'ff') {
                titleHeader.innerText = "FREE FIRE GLOBAL";
                maxSkinDiv.style.display = 'none';
            } else {
                titleHeader.innerText = "FREE FIRE MAX";
                maxSkinDiv.style.display = 'block';
            }
        }, 1000);
    },

    goBack: function() {
        document.getElementById('featurePage').style.display = 'none';
        document.getElementById('mainAppCard').style.display = 'flex';
    }
};

const ui = {
    openTab: function(evt, tabName) {
        const panes = document.getElementsByClassName('tab-pane');
        for (let p of panes) p.classList.remove('active');
        const buttons = document.getElementsByClassName('tab-btn');
        for (let b of buttons) b.classList.remove('active');

        document.getElementById(tabName).classList.add('active');
        evt.currentTarget.classList.add('active');
    },

    toggleColorPicker: function(idName) {
        const cp = document.getElementById(`cp_${idName}`);
        if (cp) cp.classList.toggle('active');
    }
};

window.onload = () => {
    appManager.init();
};
