function AjaxFormRequest(result_id,formMain,url) {
  jQuery.ajax({
    url:     url,
    type:     "POST",
    dataType: "html",
    data: jQuery("#"+formMain).serialize(), 
    success: function(response) {
      document.getElementById(result_id).innerHTML = response;
    },
    error: function(response) {
      document.getElementById(result_id).innerHTML = "<p>Возникла ошибка при отправке формы. Пожалуйста попробуйте еще раз</p>";
    }
  });

  $(':input','#formMain')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    //.removeAttr('checked')
    .removeAttr('selected');
}

function onCheckboxChanged(checked){
  if(checked){
    $("#visible").fadeIn();
    document.getElementById("shorturl").value = "";
  }
  else{
    $("#visible").fadeOut();
    document.getElementById("shorturl").value = "";
  }
}
