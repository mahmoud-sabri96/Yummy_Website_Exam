// ================>>>>>> go To Home Feature <<<<===================
// $("img.logo").click(function () {
//     $("section").not("section.home").fadeOut(500, function () {
//         getData(all_Meals_Api);
//         $(".home-meals").fadeIn(800)
//         $(".single_meal").fadeOut(800)
//     })
// })

// ================>>>>>> toggle Side-Nav Feature <<<<===================

//@@ get width of nav_menu of nav
let navMenuWidth = $(".nav_menu").width();

//@@ create click event on toggle-icon
$(".toggle_icon").click(function () {

    //@@check if the nav-menu is opened or not
    if ($(".side_nav").offset().left == 0) {
        $(".side_nav").animate({ left: (-navMenuWidth) }, 500);
        $(".toggle_icon").html(`<i class="toggle fa-solid fa-bars fs-3"></i>`);
    } else {
        $(".side_nav").animate({ left: 0 }, 500);
        $(".toggle_icon").html(`<i class="fa-solid fa-xmark fs-2"></i>`);
    }
})


//======================>>>> Start Display Data in Home Page Feature <<<<====================

const all_Meals_Api = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const baseApi_meals_By_Name = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const baseAPI_meals_Firstletter = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;
const baseAPI_meals_ByID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
const meal_categeory_Api = `https://www.themealdb.com/api/json/v1/1/categories.php`;
const filter_BY_Category_API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`;
const all_Areas_API = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
const filter_By_Areas_API = `https://www.themealdb.com/api/json/v1/1/filter.php?a=`;
const all_Ingredients_API = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
const filter_By_Ingredient_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`


//@@ Iplementation of function which get All Meals
async function getData(api_URL) {
    let response = await fetch(api_URL)
    let results = await response.json();
    // console.log(results);
    let meals = results.meals
    console.log(meals);
    $(document).ready(function () {
        displayHomeData(meals)
    })
}

//@@ calling function getData
getData(all_Meals_Api);

// Iplementation of function which display all Meals in home page
function displayHomeData(mealsData) {
    $(".loadingScreen").fadeOut(1000)
    let allMealsHolder = [];
    allMealsHolder += mealsData.map(meal => {
        return `
        <div class="col-lg-3 col-md-6 mb-4 ">
            <div  class="meal_box position-relative" onclick="fetchSingleMeal(${meal.idMeal})" >
                <img src="${meal.strMealThumb}" class="img-fluid rounded-2">
                <div class="meal_overlay p-3 position-absolute rounded-2 d-flex align-items-center justify-content-center">
                    <span class="meal_caption">${meal.strMeal}</span>
                </div>
            </div>
        </div>
            `
    }).join(""); //@@ join to hide column
    //@@ append data to our html code
    $(".home-meals").html(allMealsHolder)
};


//================>>>> Start Fetching & Display Single in Home Page Feature <<<<==============

//@@ Iplementation of function which get Single Meals
async function fetchSingleMeal(meal_id) {
    console.log(meal_id)
    let mealResponse = await fetch(`${baseAPI_meals_ByID}${meal_id}`)
    let mealOBJ = await mealResponse.json();
    // console.log(mealOBJ)
    let singleMeal = mealOBJ.meals[0];
    // console.log(singleMeal)
    // $(".loadingScreen").fadeIn(1000)
    // $(document).ready(function () {
    displaySingleMeal(singleMeal)
    // })
}


//@@ Iplementation of function which display Single Meal Details
function displaySingleMeal(singleMeal) {
    // console.log($(".single_meal"))
    $(".loadingScreen").fadeIn(1000)
    $(document).ready(function () {
        $(".home-meals").fadeOut(1000, function () {
            $(".loadingScreen").fadeOut(1000)
            $("#home .single_meal").fadeIn(1000, function () {
                $(".img_detail").attr("src", `${singleMeal.strMealThumb}`)
                $(".single_meal .meals_tilte").html(`${singleMeal.strMeal}`)
                $(".single_meal .meal_instructions").html(`${singleMeal.strInstructions}`)
                $(".single_meal .meal_area").html(`${singleMeal.strArea}`)
                $(".single_meal .meal_cate").html(`${singleMeal.strCategory}`)
                $(".single_meal .source").attr("href", `${singleMeal.strSource}`)
                $(".single_meal .youtube").attr("href", `${singleMeal.strYoutube}`)

                if (singleMeal.strTags !== null) {
                    let mealTags = singleMeal.strTags;
                    let mealTagsArr = mealTags.split(",").filter((e) => e !== '');
                    console.log(mealTagsArr)
                    let tagsDom = '';
                    for (let i = 0; i < mealTagsArr.length; i++) {
                        tagsDom += `<span class="alert alert-danger d-inline-block px-2 py-1 me-2">${mealTagsArr[i]}</span>`
                    }
                    $(".single_meal .tags").html(tagsDom)
                }

                let AllingerdientsObj = Object.entries(singleMeal) // reurn array [[key,value],[key,value] ,[key,value]]
                let ingerdientsArr = (AllingerdientsObj.filter((e) => e[0].includes("strIngredient")).map((e) => e[1]).filter((e) => e !== ""))
                console.log(ingerdientsArr);

                // the next function return array of values of ingredients
                let AllrecipesObj = Object.entries(singleMeal) // reurn array [[key,value],[key,value] ,[key,value]]
                let AllrecipesArr = (AllrecipesObj.filter((e) => e[0].includes("strMeasure")).map((e) => {
                    if (e[1] != " " && e[1] != '' && e[1] != null) {
                        return e[1]
                    }
                }).filter(e => e !== undefined))
                console.log(AllrecipesArr);

                let recipesDom = '';
                for (let i = 0; i < AllrecipesArr.length; i++) {
                    recipesDom += `<span class="alert alert-success d-inline-block me-2 px-2 py-1">${AllrecipesArr[i]} ${ingerdientsArr[i]}</span>`
                }
                $(".single_meal .recipes").html(recipesDom);
            })
        })
    })


}

//================>>>> Start Routing Between links of Side-nav-Menu Feature <<<<=========================


//===================================>>>> Start Search Meals Feature <<<<============================
//@@ create Keyup event on SearchByNameInput 
$(".search #search_name").keyup(function () {
    $("#home .single_meal").fadeOut(1000)
    let enterd_Name_Value = $(".search #search_name").val()
    // console.log(searchValue)
    getMeals(baseApi_meals_By_Name, enterd_Name_Value ? enterd_Name_Value : "")
})

//@@ create Keyup event on SearchByCategoryInput 
$(".search #search_category").keyup(function () {
    $("#home .single_meal").fadeOut(1000)
    let entered_Cate_Value = $(".search #search_category").val()
    // console.log(search_Cate_Value)
    getMeals(baseAPI_meals_Firstletter, entered_Cate_Value ? entered_Cate_Value : 's')
})

//@@Iplementation of function which search Meals By name
async function getMeals(baseApi, mealName) {
    let meals = await fetch(`${baseApi}${mealName}`)
    let meals_OBJ = await meals.json();
    let meals_Array = meals_OBJ.meals
    // console.log(meals_Array)
    $(".loadingScreen").fadeIn(1000)
    $(document).ready(function () {
        $(".loadingScreen").fadeOut(1000)
        $(".home").fadeIn(500)
        $(".home-meals").fadeIn(500)
        displayHomeData(meals_Array)
    })
}

//===================================>>>> Start Category Meals Feature <<<<============================

//##### Start Routing Between links of Side-nav-Menu Feature <<<<
// @@ create click event on nav-menu link
$(".nav_menu ul li a").click(function () {
    let selectedSection = $(this).attr("data-sec");

    if ($(this).attr("data-sec") === "#search") {
        $("section").not(selectedSection).fadeOut(500)
        $(".loadingScreen").fadeIn(500, function () {
            $(selectedSection).fadeIn(500)
        })
        $(".loadingScreen").fadeOut(500)
    }

    if ($(this).attr("data-sec") === "#category") {
        $("section").not(selectedSection).fadeOut(1000)
        $(".loadingScreen").fadeIn(1000, function () {
            $(selectedSection).fadeIn(1000);
            fetchAllCategoryMeals()
        })
    }

    if ($(this).attr("data-sec") === "#area") {
        $("section").not(selectedSection).fadeOut(1000)
        $(".loadingScreen").fadeIn(1000, function () {
            $(selectedSection).fadeIn(1000);
            fetchAllAreasMeals()
        })

    }

    if ($(this).attr("data-sec") === "#ingredient") {
        $("section").not(selectedSection).fadeOut(1000)
        $(".loadingScreen").fadeIn(1000, function () {
            $(selectedSection).fadeIn(1000);
            fetchAllIngredientsMeals()
        })

    }

    if ($(this).attr("data-sec") === "#contact") {
        $(".loadingScreen").fadeIn(1000)
        $("section").not(selectedSection).fadeOut(1000)
        $(".loadingScreen").fadeOut(1000)
        $(selectedSection).fadeIn(1000);
    }



})


//@@ Iplementation of function which get AllCategory Meals
async function fetchAllCategoryMeals() {
    let mealCategories = await fetch(`${meal_categeory_Api}`)
    let mealsOBJ = await mealCategories.json();
    // console.log(mealsOBJ)
    let AllCategoriesArr = mealsOBJ.categories;
    // console.log(AllCategoriesArr)
    $(document).ready(function () {
        displayAllGategory(AllCategoriesArr)
    })
}


//@@ Iplementation of function which limit the length of string
function truncate(string, n) {
    return string?.length > n ? string.substr(0, n) + '...' : string
}

//@@ Iplementation of function which display all Category Meals
function displayAllGategory(AllCategoriesArr) {
    $(".loadingScreen").fadeOut(1000)
    let categoriesDom = [];
    for (let i = 0; i < AllCategoriesArr.length; i++) {
        categoriesDom += `
    <div class="col-lg-3 col-md-6 mb-4">
        <div class="meal_box position-relative" onclick="getMealsByCategory('${AllCategoriesArr[i].strCategory}')" >
            <img src="${AllCategoriesArr[i].strCategoryThumb}" class="img-fluid rounded-2 ">
            <div class="meal_overlay p-3  position-absolute rounded-2 d-flex flex-column align-items-center justify-content-center">
                <span class="meal_caption ">${AllCategoriesArr[i].strCategory}</span>
                <small>${truncate(AllCategoriesArr[i].strCategoryDescription, 35)}</small>
            </div>
        </div>
    </div>
        `
    }
    $(".all_categories .row").html(categoriesDom);
}

//@@ Iplementation of function which display Meals for Selected Category
async function getMealsByCategory(selectedCategory) {
    let MealsOfCate = await fetch(`${filter_BY_Category_API}${selectedCategory}`)
    let MealsOfCateObj = await MealsOfCate.json();
    let MealsOfCateArr = MealsOfCateObj.meals
    // console.log(MealsOfCateArr)
    $(".loadingScreen").fadeIn(1000)
    $(document).ready(function () {
        $(".category").fadeOut(1000, function () {
            $(".home").fadeIn(1000)
            $(".home-meals").fadeIn(1000)
            $(".single_meal").fadeOut(1000)
            displayHomeData(MealsOfCateArr)
        })
    })
}

//===================================>>>> Start Areas Meals Feature <<<<============================

//@@ Iplementation of function which get AllAreas Meals
async function fetchAllAreasMeals() {
    let AllAreasMeals = await fetch(`${all_Areas_API}`)
    let AllAreasMealsObj = await AllAreasMeals.json();
    let AllAreasMealsArr = AllAreasMealsObj.meals;
    // $(".loadingScreen").fadeIn(1000)
    $(document).ready(function () {
        displayAllAreas(AllAreasMealsArr);
    })
}

//@@ Iplementation of function which display all Areas Meals
function displayAllAreas(AllCategoriesArr) {
    $(".loadingScreen").fadeOut(1000)
    let AllAreasDom = [];
    for (let i = 0; i < AllCategoriesArr.length; i++) {
        AllAreasDom += `
        <div class="col-lg-3 col-md-6 mb-5">
        <div class="meal_box position-relative text-center border border-top-0 rounded-5 border-start-0" onclick="getMealsOfArea('${AllCategoriesArr[i].strArea}')">
            <div class="area_icon">
                <i class="fa-solid fa-city fa-3x text-danger mb-2"></i>
            </div>
            <h2 class="area_name fw-light">${AllCategoriesArr[i].strArea}</h2>
        </div>
    </div>
        `
    }
    $(".area .all_areas_meals").html(AllAreasDom);
}

//@@ Iplementation of function which display Meals for Selected Area
async function getMealsOfArea(selectedArea) {
    let MealsOfAreas = await fetch(`${filter_By_Areas_API}${selectedArea}`)
    let MealsOfAreasObj = await MealsOfAreas.json();
    let MealsOfAreasArr = MealsOfAreasObj.meals
    console.log(MealsOfAreasArr)
    // let MealsOfCateArr = MealsOfCateObj.meals
    $(".loadingScreen").fadeIn(1000)
    $(document).ready(function () {
        $(".area").fadeOut(1000, function () {
            $(".home").fadeIn(1000)
            $(".home-meals").fadeIn(1000)
            $(".single_meal").fadeOut(1000)
            displayHomeData(MealsOfAreasArr)
        })
    })

}


//===================================>>>> Start Ingredients Meals Feature <<<<============================

//@@ Iplementation of function which get AllIngredient Meals
async function fetchAllIngredientsMeals() {
    let AllIngredientsMeals = await fetch(`${all_Ingredients_API}`)
    let AllIngredientsMealsObj = await AllIngredientsMeals.json();
    let AllIngredientMealsArr = AllIngredientsMealsObj.meals;
    // console.log(AllIngredientMealsArr);
    // $(".home").fadeIn(500)
    // $(".loadingScreen").fadeIn(1000)
    $(document).ready(function () {
        displayAllIngredients(AllIngredientMealsArr)
    })
}

//@@ Iplementation of function which display all Ingredient Meals
function displayAllIngredients(AllIngredientMealsArr) {
    $(".loadingScreen").fadeOut(1000)
    let AllIngredientsDom = [];
    for (let i = 0; i < 20; i++) {
        AllIngredientsDom += `
        <div class="col-lg-3 col-md-6 mb-4">
        <div class="meal_box position-relative p-2 text-center border border-top-0 rounded-5 border-start-0" onclick="getMealsOfIngredient('${AllIngredientMealsArr[i].strIngredient}')">
            <div class="ingredient_icon">
                <i class="fa-solid fa-bowl-food fa-4x text-success mb-2"></i>
            </div>
        <h2 class="ingredient_name fw-light">${AllIngredientMealsArr[i].strIngredient}</h2>
        <p class="ingredient_description">
            ${truncate(AllIngredientMealsArr[i].strDescription, 150)}
        </p>
        </div>
    </div>
        `
    }
    $(".ingredient .all_ingredients_meals").html(AllIngredientsDom);
}


//@@ Iplementation of function which display Meals for Selected Ingredent
async function getMealsOfIngredient(selectedIngredient) {
    let MealsOfIngerdent = await fetch(`${filter_By_Ingredient_API}${selectedIngredient}`)
    let MealsOfIngerdentObj = await MealsOfIngerdent.json();
    let MealsOfIngerdentArr = MealsOfIngerdentObj.meals
    $(".loadingScreen").fadeIn(1000)
    $(document).ready(function () {
        $(".ingredient").fadeOut(1000, function () {
            $(".home").fadeIn(1000)
            $(".home-meals").fadeIn(1000)
            $(".single_meal").fadeOut(1000)
            displayHomeData(MealsOfIngerdentArr)
        })
    })
}



let nameRegex = /^[a-zA-Z]/; // spicial char not allow
let emailRegex = /^[a-zA-Z]+\d?@[a-zA-Z]{2,}\.com$/;
let phoneRegex = /^\d{11}$/;
let ageRegex = /^\d{2}/;
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

let nameIsValid;
let phoneIsValid;
let passwordIsValid;
let repasswordIsValid;
let emailIsValid;
let ageIsValid;


$("input").keyup(function () {

    if ($(this).attr("id") === "user_name") {
        nameIsValid = checkInputValidation($(this), nameRegex)
        if (nameIsValid === false) {
            $(this).next().fadeIn(500)
        } else {
            $(this).next().fadeOut(500)
        }
    }


    if ($(this).attr("id") === "user_phone") {
        phoneIsValid = checkInputValidation($(this), phoneRegex)
        if (phoneIsValid === false) {
            $(this).next().fadeIn(500)
        } else {
            $(this).next().fadeOut(500)
        }
    }


    if ($(this).attr("id") === "user_password") {
        passwordIsValid = checkInputValidation($(this), passwordRegex)
        if (passwordIsValid === false) {
            $(this).next().fadeIn(500)
        } else {
            $(this).next().fadeOut(500)
        }
    }


    if ($(this).attr("id") === "user_rePassword") {
        let id_Attr = ($(this).attr("name"))  // return user_password
        let passwordInput = $(`#${id_Attr}`)
        repasswordIsValid = checkRepasswordValue($(this), passwordInput)
        console.log(repasswordIsValid)
        if (repasswordIsValid === false) {
            $(this).next().fadeIn(500)
        } else if (repasswordIsValid === true) {
            $(this).next().removeClass("alert-danger").addClass("alert-success").fadeIn(500).text("password is matched").fadeOut(1500)
        }
    }

    if ($(this).attr("id") === "user_email") {
        emailIsValid = checkInputValidation($(this), emailRegex)
        console.log(emailIsValid)
        if (emailIsValid === false) {
            $(this).next().fadeIn(500)
        } else {
            $(this).next().fadeOut(500)
        }

    }
    if ($(this).attr("id") === "user_age") {
        ageIsValid = checkInputValidation($(this), ageRegex)
        console.log(ageIsValid)
        if (ageIsValid === false) {
            $(this).next().fadeIn(500)
        } else {
            $(this).next().fadeOut(500)
        }
    }

    formValidation(nameIsValid, phoneIsValid, passwordIsValid, emailIsValid, ageIsValid, repasswordIsValid)

})



//@@ the implementaion of the Function which checkValidition of individual input
function checkInputValidation(input, regex) {
    let inputValue = $(input).val();
    if (!regex.test(inputValue) || inputValue === "") {
        // $(input).next().fadeIn(500)
        return false;
    } else {
        // $(input).next().fadeOut(500)
        return true;
    }
}

//@@ the implementaion of the Function which check the equality of password & repassword
function checkRepasswordValue(repassInput, passInput) {
    let repassValue = $(repassInput).val()
    let passValue = $(passInput).val()
    if (passValue !== repassValue) {
        return false;
    } if (passValue === repassValue && repassValue !== "") {
        return true;
    }
}

//@@ the implementaion of the Function which Check The Form Validation
function formValidation(nameIsValid, phoneIsValid, passwordIsValid, emailIsValid, ageIsValid, repasswordIsValid) {
    if (nameIsValid && phoneIsValid && passwordIsValid && emailIsValid && ageIsValid && repasswordIsValid) {
        console.log("E4taa")
        $('#submit').removeClass("disabled");
    } else {
        console.log("offff")
    }
}


























//@@Iplementation of function which search Meals By Category
// async function getMealByCategory(mealCate) {
//     let mealsCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealCate ? mealCate : ''}`)
//     let mealsCategoryOBJ = await mealsCategory.json();
//     let mealsCategoryArray = mealsCategoryOBJ.meals
//     console.log(mealsCategoryArray)
//     $(".home").fadeIn(500)
//     $(".home .home-meals").fadeIn(500)
//     displayHomeData(mealsCategoryArray)
// }


