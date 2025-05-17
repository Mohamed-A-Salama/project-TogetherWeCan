const cardContainer = document.querySelector(".all_pages__cards__container");
const paginationContainer = document.querySelector(
    ".pagination__container__js"
);
const nextBtn = document.querySelector(".next__btn__pagination");
const prevBtn = document.querySelector(".previous__btn__pagination");

const cardsPerPage = 12;
let currentPage = 1;
let campaigns = [];

function viewCards(campaignsData) {
    cardContainer.innerHTML = "";
    // data will be collected from json server //
    // let userAvatar = campaignsData[i].userAvatar;
    // let userName = campaignsData[i].userName;
    // let cardTitle = campaignsData[i].cardTitle;
    // let cardText = campaignsData[i].cardText;
    // let progressBar = campaignsData[i].progressBar;
    // let collectedMoney = campaignsData[i].collectedMoney;
    // let progressCount = campaignsData[i].progressCount;

    for (let i = 0; i < campaignsData.length; i++) {
        let card = `                <div class="card__temp">
                    <div class="card">
                        <div class="top-right-icons">
                            <i class="fa-regular fa-heart"></i>
                            <i class="fa-solid fa-share-nodes"></i>
                        </div>
                        <!-- /top-right-icons -->
                        <img
                            src="assets/images/pexels-rdne-6647119.jpg"
                            class="card-img-top"
                            alt="img1"
                        />
                        <div class="card__body">
                            <img
                                src="${userAvatar}"
                                alt="logo"
                                class="rounded-circle imgAvatar"
                            />
                            <span class="card__body__name">${userName}</span>
                            <h5 class="card--title">
                                ${cardTitle}
                            </h5>
                            <p class="card--text">
                                ${cardText}
                            </p>
                            <div
                                class="progress"
                                role="progressbar"
                                aria-label="Success example"
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                <div
                                    class="progress-bar"
                                    style="width: ${progressBar}%;" 
                                ></div>
                            </div>
                            <!-- /progress -->
                            <div
                                class="d-flex justify-content-between small mb-1"
                            >
                                <span class="card__bottom__text"
                                    ><i class="fa-solid fa-gift pe-2"></i
                                    >$${collectedMoney}</span
                                >
                                <span class="card__bottom__text">${progressCount}%</span>
                            </div>
                            <!-- /mony -->
                        </div>
                        <!-- /card--body -->
                    </div>
                    <!-- /card -->
            </div>`;
        cardContainer.innerHTML += card;
    }
}
//====================== render cards in page function =====================
function renderData(currentPage, campaigns) {
    let start = (currentPage - 1) * 12; // عشان منساش  بس 12 دي عدد الكروت ف الصفحة عشان نبدأ عد بعد اللي فاتو
    let end = start + 12;
    let campaignsData = campaigns.slice(start, end);
    viewCards(campaignsData);
    // rowsOfTable.innerHTML = `<p>Showing ${start + 1} to ${Math.min(end, filteredData.length)} of ${filteredData.length} entries</p>`;
}
//====================== pagination function ==================

function pagination(campaigns, cardsPerPage, currentPage) {
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(campaigns.length / cardsPerPage); // we put this here cuz if we used search or smthng like that it will reset the total number of pages

    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            renderData(currentPage, campaigns);
            pagination(campaigns, cardsPerPage, currentPage);
        }
    });

    for (let i = 1; i <= totalPages; i++) {
        let pageBtn = document.createElement("li");
        pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageBtn.classList.add("page-item");
        if (i === currentPage) {
            pageBtn.classList.add("active");
        }
        pageBtn.addEventListener("click", function () {
            currentPage = i;
            renderData(currentPage, campaigns);
            pagination(campaigns, cardsPerPage, currentPage);
        });
        paginationContainer.appendChild(pageBtn);
    }

    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            renderData(currentPage, campaigns);
            pagination(campaigns, cardsPerPage, currentPage);
        }
    });
}

// fetch("http://localhost:3000/campaigns")
//     .then(res => res.json())
//     .then(data => {
//         campaigns = data;
//         renderData(currentPage, campaigns);
//         pagination(campaigns, cardsPerPage, currentPage);
//     });

renderData(currentPage, campaigns);
pagination(campaigns, cardsPerPage, currentPage);
