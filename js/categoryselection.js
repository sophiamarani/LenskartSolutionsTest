function start(){
    document.getElementById("start").style.display = "none";
    getallcategory();
    document.getElementById("category_outside").style.display = "block";
}

async function getallcategory() {
    
    var url = `http://127.0.0.1:5000/view/all`;
    
    var category = await fetch(url, {
        method: "GET"
    }).then(res => res.json());

    var category_array = category.data;
    //console.log(category_array);

    populateData(category_array);
}

function chooseproduct(category){

    document.getElementById("back_button").style.display = "block"; // make back button visible
    document.getElementById("category").style.display = "none"; // make categories invisible
    document.getElementById("category_outside").style.display = "none";

    get1category(category);

}

function back(){
    document.getElementById("category").style.display = "block";
    document.getElementById("category_outside").style.display = "block";
    document.getElementById("product").style.display = "none";
    
}

async function get1category(category){
    var all_items = []
    var url = `http://127.0.0.1:5000/view/` + category;

    var items = await fetch(url, {
        method: "GET"
    }).then(res => res.json());


    var items_array = items.data;
    //console.log(items_array);

    for (i=0; i < items_array.length; i++ ) {
        all_items.push(items_array[i]);
    }

    console.log("will start to populate items")
    populateItems(all_items);
    
    document.getElementById("product").style.display = "block"; // make visible

}

function populateItems(all_items){

    var items_html = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel"><!-- start of carousel -->
                        <div class="carousel-indicators">`;

    for (let i = 0; i < all_items.length; i++) {
        if (i==0){
            items_html += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
        } else {
            items_html += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`

        }
        
    }
    items_html += `</div>`;

    // html for carousel inner
    items_html += `<div class="carousel-inner"> <!-- start of carousel inner -->`
    for (let i = 0; i < all_items.length; i++) {

        let item = all_items[i];

        if (i == 0){
            items_html += `<div class="carousel-item active">
                            <div class="card">
                                <h3>${item.name}</h3>
                                <img src="${item.url}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-text">Price: $${item.price.toString()}</p>
                                    <p class="card-text">Category: ${item.category}</p>
                                </div>
                            </div>
                        </div>`;
        } else {
            items_html += `<div class="carousel-item">
                            <div class="card">
                                <h3>${item.name}</h3>
                                <img src="${item.url}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p class="card-text">Price: $${item.price.toString()}</p>
                                    <p class="card-text">Category: ${item.category}</p>
                                </div>
                            </div>
                        </div>`;
        }
    }
    items_html += `</div> <!-- end of carousel inner -->`;

    items_html += `
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>`;
    console.log(items_html);
    document.getElementById("product").innerHTML = items_html;
}

function populateData(category_array) {
    // This function populates the category cards

    var category_html = `<ul class="list-group list-group-flush">`;
    for (let i = 0; i < category_array.length; i++) {
        let category = category_array[i];
        //console.log(category);

        category_html += `<li class="list-group-item">${i+1} -
                            <button type="button" class="btn btn-link" onclick="chooseproduct('${category}')">${category}</button>
                        </li>`;

        if (i ==  category_array.length-2 ) {
            category_html += `</ul>`;
    
    }
    //console.log(category_html);
    document.getElementById("category").innerHTML = category_html;

    }
}
