$(document).ready(function () {

    //for apply chosen drop down
    $(".chosen").chosen();

    //for disabled status drop down
    $('#busNumberStatus').prop('disabled', true).trigger("chosen:updated");
    $('#mstBusNumberStatus').prop('disabled', true).trigger("chosen:updated");


    //for toggle tabs content
    $(".tabs-list .tab").on("click", function () {
        var tabId = $(this).attr("id");
        //for manage active tab
        $(".tabs-list .tab").removeClass("active");
        $(this).addClass("active");

        //for mange active tab content area
        $(".tabs-content > div").hide();
        $(".tabs-content div[class='" + tabId + "']").show();

    });

    //for bus usage select handle
    $(".busUsageBox").on("click", function () {
        $(".busUsageBox").find("input").parent("div").removeClass("activeBusUsage");
        $(this).find("input").prop("checked", true);
        $(this).find("input").parent("div").addClass("activeBusUsage");
    });

    //for active chosen element
    $('.chosen').on('chosen:showing_dropdown', function (event) {
        $(event.target).parent("div").addClass("inputFocus");
        $(event.target).siblings("label").addClass("labelFocus");
    });

    //for inactive chosen element
    $('.chosen').on('chosen:hiding_dropdown', function (event) {
        $(event.target).parent("div").removeClass("inputFocus");
        $(event.target).siblings("label").removeClass("labelFocus");
    });

    //for active textbox
    $(".input-wrap input[type='text']").on("focus", function (event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });

    //for inactive textbox
    $(".input-wrap input[type='text']").on("blur", function (event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });

    $("input:radio[name='rdoBusNumber']").on("click",function(){
        if($(this).val()=="1"){
            $(".tabBusMaster .selBusNumber").show();
            $(".tabBusMaster .txtBusNumber").hide();
        }else{
            $(".tabBusMaster .selBusNumber").hide();
            $(".tabBusMaster .txtBusNumber").show();
            $(".tabBusMaster #txtBusNumber").focus();
        }
    });

    $("input:radio[name='rdoMstBusNumber']").on("click",function(){
        if($(this).val()=="1"){
            $(".tabBusMaster .selMstBusNumber").show();
            $(".tabBusMaster .txtMstBusNumber").hide();
        }else{
            $(".tabBusMaster .selMstBusNumber").hide();
            $(".tabBusMaster .txtMstBusNumber").show();
            $(".tabBusMaster #txtMstBusNumber1").focus();
        }
    });

});
