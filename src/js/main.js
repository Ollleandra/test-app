$(document).ready(function() {

    // Test Answers

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
    // Themes
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

    // Form Validation

    $('.sendForm').each(function(){
        // Declare variables (form and button)
        let form = $(this),
            btn = form.find('.form-button');

        // Add each checked field, an indication that the field is empty
        form.find('.form-control').addClass('empty_field');
        form.find('input[type=\'radio\']').addClass('error');
        form.find('input[type=\'email\']').addClass('not-valid');

        // Form text Field Validation Function
        function checkInput(){
            form.find('.form-control').each(function(){
                if($(this).val()){
                    $(this).removeClass('empty_field');
                } else {
                    $(this).addClass('empty_field');
                }
            });
        }

        // Function of illumination of empty fields
        function lightEmpty(){
            form.find('.error+label, .empty_field, .not-valid').css({'border-color':'#ff0000'});
            setTimeout(function(){
                form.find('.error+label, .empty_field, .not-valid').removeAttr('style');
            },1000);
        }

        // Real-Time Scan
        setInterval(function(){
            checkInput();
            checkInputRadio();
            isEmail($("#formInputEmail"));
            checkInputCheckbox();
            // Count the number of empty fields
            let sizeEmpty = form.find('.empty_field').size();
            let sizeError = form.find('.error').size();
            let sizeEmail = form.find('.not-valid').size();
            let sizeCheckbox = form.find('.not-checked').size();
            // set the trigger condition on the submit form button
            if ((sizeEmpty > 0) || (sizeError>0) || (sizeEmail>0) || (sizeCheckbox>0)){
                if(btn.hasClass('disabled')){
                    return false
                } else {
                    btn.addClass('disabled')
                }
            } else {
                btn.removeClass('disabled')
            }
        },3000);

        function checkInputRadio(){

            form.find('input[type=\'radio\']').each(function() {
                let radioName= $(this).attr('name');
                let isChecked =$("input[name='"+radioName+"']:checked").val();

                if( $(this).val() && isChecked){
                    $(this).removeClass('error');
                }
                else {
                    $(this).addClass('error');
                }
            });
        }

        function checkInputCheckbox(){

            form.find('input[type=\'checkbox\']').each(function() {
                let checkboxName= $(this);
                let isChecked = checkboxName.prop("checked");

                if (isChecked){
                    $(this).removeClass('not-checked');
                }
                else {
                    $(this).addClass('not-checked');
                }
            });
        }

        function isEmail(email) {
            let filter =  /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(email.val())) {
                email.removeClass('not-valid');
            }
            else {
                email.addClass('not-valid');
            }
        }
        // Click event submit button
        btn.click(function(){
            if($(this).hasClass('disabled')){
                // highlight the Empty or error fields and the form does not send, if there are error fields
                lightEmpty();
                $(this).parents(".sendForm").addClass("error-form");
                return false
            } else {
                // if is well, everything is filled, we send the form
                form.submit();
            }
        });
    });

});