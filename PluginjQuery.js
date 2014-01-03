/*
Plugin JQuery Enable() e Disable()
*/

(function ($) {

    $.fn.enable = function () {
        if (window.ElementoAceitaAtributoDisabled(this[0].tagName)) {
            window.Enable(this);
        }else if(window.ElementoTrTh(this[0].tagName)){
            window.EnableTrTh(this);
		}else {
            window.EnableElement(this);
        }
    };
})(jQuery);

(function ($) {

    $.fn.disable = function () {
        if(window.ElementoAceitaAtributoDisabled(this[0].tagName)){
            window.Disable(this);
        }else if(window.ElementoTrTh(this[0].tagName)){
            window.DisableTrTh(this);
		}else{
            window.DisableElement(this);
        }
    };

})(jQuery);

/*
Verificar se o elemento informado é uma TR ou um TH.
*/
function ElementoTrTh(tagName){
	return (tagName.toUpperCase() == 'TR' || tagName.toUpperCase() == 'TH');
}

/*
Bloquear células da tag TR ou TH informada
obj: tag TR ou TH
*/
function DisableTrTh(obj){

	obj.find('td').each(function(){
	    window.DisableElement($(this));
	});
}

/*
Desbloquear células da tag TR ou TH informada.
obj: tag TR ou TH.
*/
function EnableTrTh(obj){
	obj.find('td').each(function(){
	    window.EnableElement($(this));
	});
}

function Enable(obj) {
    obj.removeAttr('disabled');
}

function Disable(obj){
    obj.attr('disabled', 'disabled');
}

/*Verificar se o elemento atual aceita o atributo disabled.*/
function ElementoAceitaAtributoDisabled(tagName){
    tagName = tagName.toUpperCase();

    if(tagName == 'SELECT'   || 
       tagName == 'OPTION'   || 
       tagName == 'OPTGROUP' || 
       tagName == 'INPUT'    ||
       tagName == 'BUTTON'   ||
       tagName == 'KEYGEN'   ||
       tagName == 'TEXTAREA') return true;

       return false;
}

function DisableElement(obj){

    //Eliminar div de bloqueo duplicada
    obj.find('div[disabled]:first').remove();

    //Percorrer todo os elementos do objeto e desabilitar os elementos que aceitam
    //o atributo disabled
    obj.find('*').attr('disabled', true);

    obj.css({'position':'relative'});

    $('<div>').
    attr('disabled','disabled').
    css({'position':'absolute','top':'0','left':'0','width':'100%','height':'100%','background-color':'transparent'}).
    prependTo(obj);
}

function EnableElement(obj){

    //Eliminar div usada para bloquear elementos
    obj.find('div[disabled]:first').remove();

    //Percorrer todo os elementos do objeto e desabilitar os elementos que aceitam
    //o atributo disabled
    obj.find('*').removeAttr('disabled');

}

