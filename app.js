'use strict'

// API Key and API Endpoint
// const apiKey = 'a2610ca4d9e6bc59e69d4f3fb879909b';
const apiKey = 'f0e79516a7031030448c2c01dd68c95c';
const searchURL = 'https://www.food2fork.com/api/search';
const recipeURL ='https://www.food2fork.com/api/get';

// Page and User Query Defaults
let page = 1;
let queryString = '';

// Initial Page Display data
const data = {
   "count": 10,
   "recipes": [
       {
           "publisher": "Closet Cooking",
           "f2f_url": "http://food2fork.com/view/35120",
           "title": "Bacon Wrapped Jalapeno Popper Stuffed Chicken", "source_url":
"http://www.closetcooking.com/2012/11/bacon-wrapped-jalapeno-popper-stuffed.html",
           "recipe_id": "35120",
           "image_url": "http://static.food2fork.com/Bacon2BWrapped2BJalapeno2BPopper2BStuffed2BChicken2B5002B5909939b0e65.jpg",
           "social_rank": 100.0,
           "publisher_url": "http://closetcooking.com"
       },
       {
           "publisher": "Closet Cooking",
           "f2f_url": "http://food2fork.com/view/35169",
           "title": "Buffalo Chicken Chowder",
           "source_url": "http://www.closetcooking.com/2011/11/buffalo-chicken-chowder.html",
           "recipe_id": "35169",
           "image_url": "http://static.food2fork.com/Buffalo2BChicken2BChowder2B5002B0075c131caa8.jpg",
           "social_rank": 100.0,
           "publisher_url": "http://closetcooking.com"
       },
       {
           "publisher": "All Recipes",
           "f2f_url": "http://food2fork.com/view/34889",
           "title": "Zesty Slow Cooker Chicken Barbeque", "source_url":
"http://allrecipes.com/Recipe/Zesty-Slow-Cooker-Chicken-Barbecue/Detail.aspx",
           "recipe_id": "34889",
           "image_url": "http://static.food2fork.com/4515542dbb.jpg",
           "social_rank": 100.0,
           "publisher_url": "http://allrecipes.com"
       },
       {
           "publisher": "The Pioneer Woman",
           "f2f_url": "http://food2fork.com/view/46906",
           "title": "Roast Chicken",
           "source_url": "http://thepioneerwoman.com/cooking/2012/08/roast-chicken/",
           "recipe_id": "46906",
           "image_url": "http://static.food2fork.com/roastchicken2feab.jpg",
           "social_rank": 100.0,
           "publisher_url": "http://thepioneerwoman.com"
       },
       {
           "publisher": "The Pioneer Woman",
           "f2f_url": "http://food2fork.com/view/46996",
           "title": "Cajun Chicken Pasta",
           "source_url": "http://thepioneerwoman.com/cooking/2011/09/cajun-chicken-pasta/",
           "recipe_id": "46996",
           "image_url": "http://static.food2fork.com/cajun0676.jpg",
           "social_rank": 100.0,
           "publisher_url": "http://thepioneerwoman.com"
       },
       {
           "publisher": "The Pioneer Woman",
           "f2f_url": "http://food2fork.com/view/47194",
           "title": "Chicken Parmigiana",
           "source_url": "http://thepioneerwoman.com/cooking/2009/10/chicken-parmigiana/",
           "recipe_id": "47194",
           "image_url": "http://static.food2fork.com/4024225151_5f477f16caabf9.jpg",
           "social_rank": 100.0,
           "publisher_url": "http://thepioneerwoman.com"
       },
       {
           "publisher": "Healthy Delicious",
           "f2f_url": "http://food2fork.com/view/0c2e90",
           "title": "Baked Chicken and Spinach Flautas",
           "source_url": "http://www.healthy-delicious.com/2012/03/baked-chicken-and-spinach-flautas/",
           "recipe_id": "0c2e90",
           "image_url": "http://static.food2fork.com/205xNxchickenandspinachflautas2296f.jpg.pagespeed.ic.RNEW9wsRU.jpg",
           "social_rank": 100.0,
           "publisher_url": "http://www.healthy-delicious.com"
       },
       {
           "publisher": "The Pioneer Woman",
           "f2f_url": "http://food2fork.com/view/47064",
           "title": "Chicken Tortilla Soup",
           "source_url": "http://thepioneerwoman.com/cooking/2011/01/chicken-tortilla-soup/",
           "recipe_id": "47064",
           "image_url": "http://static.food2fork.com/5337400468_d5892f3a03_od5cd.jpg",
           "social_rank": 99.99999999999994,
           "publisher_url": "http://thepioneerwoman.com"
       },
       {
           "publisher": "Cookin Canuck",
           "f2f_url": "http://food2fork.com/view/ed141a",
           "title": "Home",
           "source_url": "http://www.cookincanuck.com/2011/11/hearty-chicken-stew-with-butternut-squash-quinoa-recipe/",
           "recipe_id": "ed141a",
           "image_url": "http://static.food2fork.com/ButternutQuinoaStewSquareSmallbe3b.jpg",
           "social_rank": 99.99999999999201,
           "publisher_url": "http://www.cookincanuck.com"
       },
       {
           "publisher": "All Recipes",
           "f2f_url": "http://food2fork.com/view/26851",
           "title": "Roast Sticky Chicken Rotisserie Style",
           "source_url": "http://allrecipes.com/Recipe/Roast-Sticky-Chicken-Rotisserie-Style/Detail.aspx",
           "recipe_id": "26851",
           "image_url": "http://static.food2fork.com/464580296.jpg",
           "social_rank": 99.99999999899647,
           "publisher_url": "http://allrecipes.com"
       }       
   ]
}


// Next page event listener
function updateNextPageOnClick(){
   $('.js__nextBtn').on('click', e => {
      e.preventDefault();
      page += 1;
      if(page > 1) {
         $('.js__previousBtn').removeClass('hidden');
      }
      callSearchAPI();
   });
}

// Previous page event listener
function updatePreviousPageOnClick(){
   $('.js__previousBtn').on('click', e => {
      e.preventDefault();
      page -= 1;
      if(page <= 1) {
         page = 1;
         $('.js__previousBtn').addClass('hidden');
      }
      callSearchAPI();                                              
   }); 
}

// Display results to the page
function displayRecipes(data){
   let recipes = data.recipes;
   // Remove previous items from screen
    $('.container__top').empty();

    // Iterate through recipe array data
    recipes.forEach(cur => {
        let title = cur.title;
        if(title.length > 28){
            title = `${title.substring(0, 28)}...`;
        }
        $('.container__top').append(
            `<article class="recipes zoom">
                <img src="${cur.image_url}" alt="${title}" class="img">
                <div class="container__details">
                    <h2 class="recipe__title"><b>${title}</b></h2> 
                    <p>Publisher: ${cur.publisher}</p> 
                </div>
                <div class="recipe__button">
                    <a href="${cur.source_url}" target="_blank" class="js__view__btn">View Recipe</a>
                </div>    
            </article>`)
    });
    $('.container__top').removeClass('hidden');
}

// Fetch data from API endpoint using updated URL
function callSearchAPI(url){
   url = `${searchURL}?key=${apiKey}&count=10&${queryString}&page=${page}`;
   fetch(url)
   .then(res => {
      if(res.ok){
         return res.json();
      }
      throw new Error(res.statusText);
   })
   .then(recipe => displayRecipes(recipe))
   .catch(err => {
      $('.js_error_message').text(`Something went wrong: ${err}`);
   });
}

function formatQueryParams(params){
   const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
   return queryItems.join('&');
}


function getSearchValue(){
   // Present local data on page load
   displayRecipes(data);
   $('form').submit(e => {
      e.preventDefault();
      page = 1;
      // Remove any previous items displayed
      $('.container__top').empty();
      // Get users search input
      const userSearch = $('.search__recipes').val();
      // Pass user input into an object
      let query = { q: userSearch }
      // Format user input into HTML encoded component
      queryString = formatQueryParams(query);
      // Display next button on search
      $('.js__nextBtn').removeClass('hidden');
      callSearchAPI();
      // Clear search field
      $('.search__recipes').val('');
   });
}

function enableTopPage(){
   $('.js__top').on('click', () => {
       $(window).scrollTop(0);
   });
}

function init(){
   getSearchValue();
   updateNextPageOnClick();
   updatePreviousPageOnClick();
   enableTopPage();
}

$(init);