
const url="https://dummyjson.com/products";



async function fetchNews(){
    try {
        const res = await fetch(url);
        const data = await res.json();
        bindData(data.products);
    } catch(e) {
        console.error("Error=", e);
    }
}

function bindData(products){
    const cardsContainer = document.querySelector(".cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";

    products.forEach((product) => {
        if (!product.images) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, product);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, product){
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = product.images;
    newsTitle.innerHTML = product.title;
    newsDesc.innerHTML = product.description;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(product.url,"_blank");
    })
}

window.addEventListener('DOMContentLoaded', fetchNews);


let curSelectedNav=null;
function onNavItemClicked(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-button');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    else
    console.log(query);
    fetchNews();

});