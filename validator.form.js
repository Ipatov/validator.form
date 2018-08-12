$(function(){
	
	ValidateForm.init($(".validate"));
	
	$(".validate").submit(function(){
		ValidateForm.setParams({
			"errorClass": "my_error_class"
		}); 
		return ValidateForm.validate();
	})
})

var ValidateForm = {
	$params: {
		errorClass: "error",		
	},
    $form: null,
	$noErrors: true,

    init: function(form){
		$form = form;
        console.log("init");			
    },
	
	setParams: function(params){
		$.each(params, function(key, val){
			ValidateForm.$params[key] = val;
		})
	},
	
    validate: function(){		
		$noErrors = true;		
		$form.find("[data-validate]").each(function(){
			let error = false;
			switch($(this).data("validate")){
				case "empty":
					error = ValidateForm.validateEmpty($(this).val());
					break;
				case "email":
					error = ValidateForm.validateEmail($(this).val());
					break;
				case "checked":
					error = ValidateForm.validateChecked($(this));
					break;
			}
			if(!error) {
				$(this).addClass(ValidateForm.$params.errorClass);
				$noErrors = false;
			}else{
				$(this).removeClass(ValidateForm.$params.errorClass);
			}
		});
		return $noErrors;
    },
	
	// проверка на пустоту
	validateEmpty: function(value){
		if($.trim(value) == "") {
			return false;
		}else{
			return true;
		}
	},
	
	// проверка на валидность email
	validateEmail: function(email){
		var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return reg.test(String(email).toLowerCase());
	},
	
	// проверка выбранного чекбокса
	validateChecked: function($checkbox){
		return $checkbox.prop('checked');
	},	
	
};