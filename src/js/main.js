$(document).ready(function() {

    var testAnswers = {
        "screen-1": {
            0: ["20% ", "людей обращают внимание на А."],
            1: ["30% ", "людей обращают внимание на Б."],
            2: ["50% ", "людей обращают внимание на В."]
        },
        "screen-2": {
            0: ["52,4%", "пользователей — вариант А"],
            1: ["47,6%", "пользователей — вариант Б"],
        }
    };

    var
        theme = {
        "screen-1": "theme--orange",
        "screen-2": "theme--yellow",
        "screen-3": "theme--blue"
        },
        themeEl = $(".theme"),
        activeTheme,
        columnRight = $( ".column-right" ),

        testResultPercents = $("#resultPercents"),
        testResultPCaption = $("#resultCaption");

    // function Set Answer on Left Column
    function setAnswer(screen, id){
        let testAnswer = testAnswers[screen][id];
        testResultPercents.text(testAnswer[0]);
        testResultPCaption.text(testAnswer[1]);
    }

    // To set next screen active, theme value on button.continue click

    columnRight.on( "click", ".continue", function() {

        let activeScreen = $(this).parents("article");

        activeTheme = theme[activeScreen.attr("id")];

        let nextScreen =  $( this ).data("href") ;

        $(this).parents(".theme").removeClass(activeTheme).addClass(theme[nextScreen]);

        activeScreen.removeClass("active").addClass("d-none");
        $("#" + nextScreen).removeClass("d-none").addClass("active");

        activeTheme = theme[nextScreen];

        if (themeEl.hasClass("answer--true")) {
            themeEl.removeClass("answer--true").addClass("answer--false");
        }
    });

    // To set Answer on button.variant click

    themeEl.on("click", ".block-variants button", function () {

        $(this).parents(".block-variants").find("button").removeClass("active");

        $(this).addClass("active");
        let activeScreenId = $(this).parents("article").attr("id");
        let activeButtonId = $(this).data("id");

        setAnswer(activeScreenId, activeButtonId);

        if (themeEl.hasClass("answer--false")) {
            themeEl.removeClass("answer--false").addClass("answer--true");
            $(this).parents("article").find(".continue").prop("disabled", false);
        }
    });

    $(".form-block").on("click", ".form-check-input", function () {

        $(this).parents(".form-block").find(".form-check-input+label").removeClass("active");

        $(this).next("label").addClass("active");

    });


    // //regex to validate email
    // function validateEmail(email) {
    //     var regEx = /.+?\@.+/g;
    //     return regEx.test(email);
    // }

    function addError(inputEl){
        if (!inputEl.val()) {
            !inputEl.hasClass('error') ? inputEl.addClass('error') : '';
        }
        else {
            inputEl.hasClass('error') ? inputEl.removeClass('error') : '';
        }
    }

    // validation for email input using validateEmail Function
    function checkValidEmail(emailInput) {
        $(emailInput).blur(function () {
            let email = $(emailInput).val();

            if (!email
                && (email.match(/.+?\@.+/g) || []).length !== 1) {
                console.log('invalid');
            } else {
                console.log('valid');
            }

            // if (validateEmail(email)) {
            //     $(this).hasClass('error') ? $(this).removeClass('error') : '';
            // }
            // else {
            //     !$(this).hasClass('error') ? $(this).addClass('error') : '';
            // }
        });
    }

    function checkNameEmpty(inputID) {
        $(inputID).blur(function(){
            addError($(this));
        });
    }

    function checkPassword(inputID) {
        $(inputID).blur(function(){
            addError($(this));
        });
    }


    checkNameEmpty("#formInputName");
    checkValidEmail("#formInputEmail");
    checkPassword("#formInputPassword");

    // https://habr.com/post/175375/
    // https://www.quora.com/What-is-the-proper-email-validation-in-jQuery-or-JavaScript

    columnRight.on( "click", ".form-button", function() {

        //when click on submit
        // $("#submitForm").click(function(){
        //
        //
        //     if($("#name").val() == '')
        //     {
        //         $("#name").css('border','1px solid red');
        //         return false;
        //     }
        //
        //
        //     if($("#email").val() == '')
        //     {
        //         $("#email").css('border','1px solid red');
        //         return false;
        //     }
        //
        //     if($("#email").val() != '')
        //     {
        //         var email = $("#email").val();
        //         if (!validateEmail(email))
        //         {
        //             return false;
        //         }
        //     }
        //
        //
        //     if($("#phone").val() == '')
        //     {
        //         $("#phone").css('border','1px solid red');
        //         return false;
        //     }
        //
        //
        //     if($("#phone").val() != '')
        //     {
        //         var getPhone = validatePhone($("#phone").val());
        //         if(!getPhone)
        //         {
        //             return false;
        //         }
        //     }
        //
        //
        //     if($("#comment").val() == '')
        //     {
        //         $("#comment").css('border','1px solid red');
        //         return false;
        //     }
        //
        //
        // });

    });



});