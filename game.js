// =========================
// Premium Sites - game.js
// Hissə 1/5
// =========================

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let isAdmin = localStorage.getItem("isAdmin") === "true";
let cards = JSON.parse(localStorage.getItem("cards")) || [];

// Elementlər
const loginScreen = document.getElementById("loginScreen");
const app = document.getElementById("app");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const continueBtn = document.getElementById("continueBtn");

const profile = document.getElementById("profile");
const profileName = document.getElementById("profileName");

// İstifadəçini göstər
function loadUser() {

    if (!currentUser) {

        loginScreen.style.display = "flex";
        app.style.display = "none";
        return;

    }

    loginScreen.style.display = "none";
    app.style.display = "block";

    profile.textContent =
        currentUser.firstName.charAt(0).toUpperCase() +
        currentUser.lastName.charAt(0).toUpperCase();

    profileName.textContent =
        currentUser.firstName + " " + currentUser.lastName;

}

// Davam et
continueBtn.onclick = function () {

    const ad = firstName.value.trim();
    const soyad = lastName.value.trim();

    if (ad === "" || soyad === "") {

        alert("Ad və soyad yazın.");
        return;

    }

    currentUser = {

        firstName: ad,
        lastName: soyad

    };

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    loadUser();

};

// İlk açılış
loadUser();// =========================
// Premium Sites - game.js
// Hissə 2/5
// =========================

// Elementlər
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

const adminLogin = document.getElementById("adminLogin");
const logout = document.getElementById("logout");

const addButton = document.getElementById("addButton");

// Menyu aç / bağla
menuButton.onclick = () => {

    menu.classList.toggle("active");

};

// Admin düyməsini yoxla
function updateAdminUI(){

    addButton.style.display =
        isAdmin ? "flex" : "none";

}

updateAdminUI();

// Admin girişi
adminLogin.onclick = () => {

    const code = prompt("Admin kodunu daxil edin");

    if(code === "14532013"){

        isAdmin = true;

        localStorage.setItem("isAdmin","true");

        updateAdminUI();

        alert("Admin rejimi aktiv oldu.");

    }else{

        alert("Kod yanlışdır!");

    }

};

// Hesabdan çıxış
logout.onclick = () => {

    if(!confirm("Hesabdan çıxılsın?")) return;

    localStorage.removeItem("currentUser");

    localStorage.removeItem("isAdmin");

    location.reload();

};

// Menyudan kənara basanda bağla
document.addEventListener("click",(e)=>{

    if(
        !menu.contains(e.target) &&
        !menuButton.contains(e.target)
    ){

        menu.classList.remove("active");

    }

});// =========================
// Premium Sites - game.js
// Hissə 3/5
// =========================

const addPanel = document.getElementById("addPanel");
const closePanel = document.getElementById("closePanel");
const saveCard = document.getElementById("saveCard");

const siteTitle = document.getElementById("siteTitle");
const siteImage = document.getElementById("siteImage");
const siteDescription = document.getElementById("siteDescription");
const siteHTML = document.getElementById("siteHTML");
const siteCSS = document.getElementById("siteCSS");
const siteJS = document.getElementById("siteJS");

let imageData = "";

// Paneli aç
addButton.onclick = function(){

    if(!isAdmin) return;

    addPanel.style.display = "flex";

};

// Paneli bağla
closePanel.onclick = function(){

    addPanel.style.display = "none";

};

// Şəkil seç
siteImage.onchange = function(){

    const file = this.files[0];

    if(!file){

        imageData = "";

        return;

    }

    const reader = new FileReader();

    reader.onload = function(){

        imageData = reader.result;

    };

    reader.readAsDataURL(file);

};

// Kartı yadda saxla
saveCard.onclick = function(){

    if(siteTitle.value.trim()===""){

        alert("Sayt adını yazın.");

        return;

    }

    cards.push({

        id: Date.now(),

        title: siteTitle.value.trim(),

        image: imageData,

        description: siteDescription.value.trim(),

        html: siteHTML.value,

        css: siteCSS.value,

        js: siteJS.value,

        likes: 0,

        views: 0

    });

    localStorage.setItem(
        "cards",
        JSON.stringify(cards)
    );

    addPanel.style.display = "none";

    siteTitle.value = "";
    siteImage.value = "";
    siteDescription.value = "";
    siteHTML.value = "";
    siteCSS.value = "";
    siteJS.value = "";

    imageData = "";

    renderCards();

};// =========================
// Premium Sites - game.js
// Hissə 4/5
// =========================

const cardsBox = document.getElementById("cards");
const search = document.getElementById("search");

function renderCards(list = cards){

    cardsBox.innerHTML = "";

    list.forEach(card=>{

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <img src="${card.image || 'https://placehold.co/600x350?text=Premium+Sites'}">

            <div class="cardContent">

                <h2>${card.title}</h2>

                <p>${card.description}</p>

                <div class="cardButtons">

                    <button class="openBtn">
                        ▶ Aç
                    </button>

                    <button class="likeBtn">
                        ❤️ ${card.likes}
                    </button>

                    <button disabled>
                        👁 ${card.views}
                    </button>

                    ${
                        isAdmin
                        ? `<button class="deleteBtn">🗑</button>`
                        : ""
                    }

                </div>

            </div>
        `;

        // Kartı aç
        div.querySelector(".openBtn").onclick = () => {

            openCard(card.id);

        };

        // Bəyən
        div.querySelector(".likeBtn").onclick = (e)=>{

            e.stopPropagation();

            card.likes++;

            localStorage.setItem(
                "cards",
                JSON.stringify(cards)
            );

            renderCards();

        };

        // Sil
        if(isAdmin){

            div.querySelector(".deleteBtn").onclick = (e)=>{

                e.stopPropagation();

                if(!confirm("Kart silinsin?")) return;

                cards = cards.filter(c=>c.id!==card.id);

                localStorage.setItem(
                    "cards",
                    JSON.stringify(cards)
                );

                renderCards();

            };

        }

        cardsBox.appendChild(div);

    });

}

// Axtarış
search.oninput = function(){

    const text = this.value.toLowerCase();

    const result = cards.filter(card=>

        card.title.toLowerCase().includes(text) ||

        card.description.toLowerCase().includes(text)

    );

    renderCards(result);

};

// İlk göstər
renderCards();// =========================
// Premium Sites - game.js
// Hissə 5/5
// =========================

const viewer = document.getElementById("viewer");
const siteFrame = document.getElementById("siteFrame");
const backButton = document.getElementById("backButton");

// Kartı aç
function openCard(id){

    const card = cards.find(c => c.id === id);

    if(!card) return;

    // Baxış sayı
    card.views++;

    localStorage.setItem(
        "cards",
        JSON.stringify(cards)
    );

    renderCards();

    // HTML səhifəsi
    const code = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>
${card.css}
</style>

</head>

<body>

${card.html}

<script>
${card.js}
<\/script>

</body>
</html>
`;

    viewer.style.display = "block";

    siteFrame.srcdoc = code;

}

// Geri
backButton.onclick = function(){

    viewer.style.display = "none";

    siteFrame.srcdoc = "";

};

// Paneldən kənara basanda bağla
viewer.onclick = function(e){

    if(e.target === viewer){

        viewer.style.display = "none";

        siteFrame.srcdoc = "";

    }

};

// Enter düyməsi ilə giriş
document.addEventListener("keydown",function(e){

    if(e.key === "Enter" && loginScreen.style.display !== "none"){

        continueBtn.click();

    }

});

// İlk yüklənmə
loadUser();

updateAdminUI();

renderCards();

console.log("Premium Sites hazırdır.");