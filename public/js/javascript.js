$(document).ready(function(){

    /*****************************************************/
    /* SET ROUND SLIDERS STYLE   
    /*****************************************************/
    $("#slider-minutes").roundSlider({
        sliderType: "min-range",
        handleShape: "round",
        width: 22,
        radius: 100,
        value: 60,
        max: 120
    });

    let minutes = $("#slider-minutes").roundSlider('getValue');
    console.log(minutes);

    $("#slider-calories").roundSlider({
        sliderType: "min-range",
        radius: 130,
        showTooltip: true,
        width: 22,
        value: 75,
        max: 500,
        handleSize: 0,
        handleShape: "square",
        circleShape: "half-top"
    });

    let calories = $("#slider-calories").roundSlider('getValue');
    console.log(minutes);
    
    /*****************************************************/
    /* ADDING INGREDIENTES TO THE RECIPE FORM   
    /*****************************************************/
    $('#ingredient-plus-button').on("click", (e) => {
        e.preventDefault();
        let ingredientAmount = $('#ingredient-amount').val();
        console.log(`Amount of Ingredients => ${ingredientAmount}`);
        
        for (index = 0; index < ingredientAmount; index++) {
            let newIngredient =
            '<div class="row child-' + index + '">' +
                '<div id="ingredient-content">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                    '<div class="form-group">' +
                        '<input type="text" class="form-control ingredient-input" id="ingredient-recipe-input" name="ingredient" placeholder="Enter ingredient ..." >' +
                    '</div>' +
                '</div>' +
                '</div>' +
            '</div>';
            console.log(newIngredient);
            let parent = $('.ingredient-header');
            console.log(parent);
            $(newIngredient).insertAfter(parent);
        }                
    });

    /*****************************************************/ 
    /* ADDING INSTRUCTIONS TO THE RECIPE FORM   
    /*****************************************************/
    $('#instruction-plus-button').on("click", (e) => {
        e.preventDefault();
        let instructionAmount = $('#instruction-amount').val();
        console.log(`Amount of Instructions => ${instructionAmount}`);
                        
        for (index = 0; index < instructionAmount; index++) {
            let newInstruction =
            '<div class="row child-' + index + '">' +
                '<div id="instruction-content">' +
                
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                    '<div class="form-group">' +
                        '<input type="text" class="form-control instruction-input" id="instruction-recipe-input" name="instruction" placeholder="Enter instruction ..." >' +
                    '</div>' +
                '</div>' +
                
                '</div>' +
            '</div>';
            console.log(newInstruction);
            let parent = $('.instruction-header');
            console.log(parent);
            $(newInstruction).insertAfter(parent);            
        }  
    });   

});