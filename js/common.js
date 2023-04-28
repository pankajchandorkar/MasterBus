$(document).ready(function() {
    /*******************function for creating chart layout************************** */
    GSInit();

    function GSInit() {
        generateBMCC();
        cancelBMCC();
        seatSelectBMCC();
    }

    //*****************Floating label********************//
    $(".form-group .form-control").blur(function() {
        if ($(this).val() != "") {
            $(this).siblings(".placeholder").addClass("active");
        } else {
            $(this).siblings(".placeholder").removeClass("active");
        }
    });

    /*********************datepicker*********************************/
    $(".datepicker1").datetimepicker({ format: "MM/YYYY", debug: false });
    $(".datepicker1").on('blur', function() {
        if ($(this).val() != "") {
            $(this).siblings(".placeholder1").addClass("active");
        } else {
            $(this).siblings(".placeholder1").removeClass("active");
        }
    });
    /***************************************************************/

    //for apply chosen drop down
    $(".chosen").chosen();

    //for disabled status drop down
    $('#busNumberStatus').prop('disabled', true).trigger("chosen:updated");
    $('#mstBusNumberStatus').prop('disabled', true).trigger("chosen:updated");

    //for toggle tabs content
    $(".header .tabs-list .tab").on("click", function() {
        var tabId = $(this).attr("id");
        //for manage active tab
        $(".header .tabs-list .tab").removeClass("active-tab");
        $(this).addClass("active-tab");

        //for mange active tab content area
        $(".page-container .tabs-content > div").hide();
        $(".page-container .tabs-content div[class='" + tabId + "']").show();

        //for hide save button if vehicle tab selected
        if (tabId == "tabVehicleList") {
            $(".btnSave").hide();
            $('#vehicle_list').DataTable().ajax.reload();
        } else if (tabId == "tabVehicleGPSList") {
            $(".btnSave").hide();
            $('#vehicle_gps_list').DataTable().ajax.reload();
        } else {
            $(".btnSave").show();
        }
    });

    //for bus usage select handle
    $(".busUsageBox").on("click", function() {
        $(".busUsageBox").find("input").parent("div").removeClass("activeBusUsage");
        $(this).find("input").prop("checked", true);
        $(this).find("input").parent("div").addClass("activeBusUsage");

        var vehicleUsageType = $(this).find("input:checked").val();

        //1 - Bus, 2 - Cargo, 3 - Bus & Cargo

        //for Cargo || (Bus & Cargo)
        if (vehicleUsageType == 2 || vehicleUsageType == 3) {
            $(".vmBlock1 .cargoCommRow").show();

            $("#tabDimensionWeight").removeClass("tabDisabled");
            $(".tabDimensionWeight .form-inputs-wrap").removeClass("tabDisabled");

            $(".vmBlock3 #tabTyreInformation").removeClass("tabDisabled");
            $(".tabTyreInformation .form-inputs-wrap").removeClass("tabDisabled");

        } else {
            $(".vmBlock1 .cargoCommRow").hide();

            $(".vmBlock3 #tabTyreInformation").addClass("tabDisabled");
            $(".tabTyreInformation .form-inputs-wrap").addClass("tabDisabled");

            $("#tabDimensionWeight").addClass("tabDisabled");
            $(".tabDimensionWeight .form-inputs-wrap").addClass("tabDisabled");
        }

        //for Bus || (Bus & Cargo)
        if (vehicleUsageType == 1 || vehicleUsageType == 3) {

            //for enabled
            $(".vmBlock2 #tabChartLayout").click();
            $(".vmBlock2 #tabChartLayout").removeClass("tabDisabled");
            $(".tabChartLayout .seatChartBox").removeClass("tabDisabled");

            //for disabled
            $("#tabUsageBodyType").addClass("tabDisabled");
            $(".tabUsageBodyType  .form-inputs-wrap").addClass("tabDisabled");

        } else {

            //for enabled
            $("#tabUsageBodyType").removeClass("tabDisabled");
            $(".tabUsageBodyType .form-inputs-wrap").removeClass("tabDisabled");
            $(".vmBlock2 #tabUsageBodyType").click();

            //for disabled
            $(".vmBlock2 #tabChartLayout").addClass("tabDisabled");
            $(".tabChartLayout .seatChartBox").addClass("tabDisabled");
        }
    });


    //for bus usage select handle
    $(".truckTypeBox").on("click", function() {
        $(".truckTypeBox").find("input").parent("div").removeClass("activeTruckType");
        $(this).find("input").prop("checked", true);
        $(this).find("input").parent("div").addClass("activeTruckType");
    });

    //for rear body type select handle
    $(".rearBodyTypeBox").on("click", function() {
        $(".rearBodyTypeBox").find("input").parent("div").removeClass("activeRearBodyType");
        $(this).find("input").prop("checked", true);
        $(this).find("input").parent("div").addClass("activeRearBodyType");
    });

    //for active chosen element
    $('.chosen').on('chosen:showing_dropdown', function(event) {
        $(event.target).parent("div").addClass("inputFocus");
        $(event.target).siblings("label").addClass("labelFocus");
    });

    //for inactive chosen element
    $('.chosen').on('chosen:hiding_dropdown', function(event) {
        $(event.target).parent("div").removeClass("inputFocus");
        $(event.target).siblings("label").removeClass("labelFocus");
    });

    //for active textbox
    $(".input-wrap input[type='text'],.input-wrap input[type='number']").on("focus", function(event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });


    //for inactive textbox
    $(".input-wrap input[type='text'],.input-wrap input[type='number']").on("blur", function(event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });

    $("input:radio[name='rdoBusNumber']").on("click", function() {
        if ($(this).val() == "1") {
            $(".tabBusMaster .selBusNumber").show();
            $(".tabBusMaster .txtBusNumber").hide();
        } else {
            $(".tabBusMaster .selBusNumber").hide();
            $(".tabBusMaster .txtBusNumber").show();
            $(".tabBusMaster #txtBusNumber").focus();
        }
    });

    $("input:radio[name='rdoMstBusNumber']").on("click", function() {
        if ($(this).val() == "1") {
            $(".tabBusMaster .selMstBusNumber").show();
            $(".tabBusMaster .txtMstBusNumber").hide();
        } else {
            $(".tabBusMaster .selMstBusNumber").hide();
            $(".tabBusMaster .txtMstBusNumber").show();
            $(".tabBusMaster #txtMstBusNumber1").focus();
        }
    });


    //for active textbox
    $(".bus-info-input-wrap input[type='text']").on("focus", function(event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });

    //for inactive textbox
    $(".bus-info-input-wrap input[type='text']").on("blur", function(event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });


    $(".datepicker").datetimepicker({ format: "DD-MM-YYYY", useCurrent: true, debug: false, });


    //save commercial button click
    $("#btnSaveCommercial").on("click", function() {
        $(".information-popup-wrapper").show();
    });


    //for active textbox
    $(".gps-input-wrap input[type='text']").on("focus", function(event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });

    //for inactive textbox
    $(".gps-input-wrap input[type='text']").on("blur", function(event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });

    //Associate Bus Number/Enter New Data on option click
    $("input:radio[name='rdoGPSFor']").on("click", function() {
        if ($(this).val() == "1") {
            $(".tabGPS .associate-bus-no").show();
            $(".tabGPS .new-data").hide();
        } else {
            $(".tabGPS .associate-bus-no").hide();
            $(".tabGPS .new-data").show();
        }
    });


    //for active textbox
    $(".otp-input-wrap input[type='text']").on("focus", function(event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });

    //for inactive textbox
    $(".otp-input-wrap input[type='text']").on("blur", function(event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });

    //for bus amenities type select handle
    $(".tabAmeType").on("click", function() {
        $(".tabAmeType").removeClass("active-ame-type");
        $(this).find("input").prop("checked", true);
        $(this).addClass("active-ame-type");

        if ($("input[name='ameType']:checked").val() == 1) {
            $(".tabBusAmenities .ame-at-bus").show();
            $(".tabBusAmenities .ame-in-bus").hide();
        } else {
            $(".tabBusAmenities .ame-at-bus").hide();
            $(".tabBusAmenities .ame-in-bus").show();
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    $(".general-ame-list-wrap #atbus-ame-checkall").on('click', function() {
        if ($(this).is(":checked")) {
            $(".general-ame-list-wrap input[type='checkbox']").prop("checked", true);
            $(".general-ame-list-wrap #checkAll").text("Uncheck All");
        } else {
            $(".general-ame-list-wrap input[type='checkbox']").prop("checked", false);
            $(".general-ame-list-wrap #checkAll").text("Check All");
        }
    });


    $(".covid-ame-list-wrap #atbus-ame-checkall").on('click', function() {
        if ($(this).is(":checked")) {
            $(".covid-ame-list-wrap input[type='checkbox']").prop("checked", true);
            $(".covid-ame-list-wrap #checkAll").text("Uncheck All");
        } else {
            $(".covid-ame-list-wrap input[type='checkbox']").prop("checked", false);
            $(".covid-ame-list-wrap #checkAll").text("Check All");
        }
    });

    $(".ame-in-bus-wrap #inbus-ame-checkall").on('click', function() {
        if ($(this).is(":checked")) {
            $(".ame-in-bus-wrap input[type='checkbox']").prop("checked", true);
            $(".ame-in-bus-wrap #checkAll").text("Uncheck All");
        } else {
            $(".ame-in-bus-wrap input[type='checkbox']").prop("checked", false);
            $(".ame-in-bus-wrap #checkAll").text("Check All");
        }
    });


    // Submit form data via Ajax
    $("#busPictures").on('submit', function(e) {
        e.preventDefault();

        var fileInputNo = $("#fileUploadFor").val();

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100);
                        $("#picture-block-" + fileInputNo + " .progress-bar-box .probar-loading").css("width", percentComplete + "%");
                    }
                }, false);
                return xhr;
            },
            type: 'POST',
            url: 'ajaxupload.php',
            data: new FormData(this),
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $("#picture-block-" + fileInputNo + " .browse-link").hide();
                $("#picture-block-" + fileInputNo + " .progress-bar-box").show();
                $("#picture-block-" + fileInputNo + " .progress-bar-box .probar-loading").css("width", "0%");
            },
            success: function(response) {
                if (response.status == 1) {
                    $('#busPictures')[0].reset();
                    $("#picture-block-" + fileInputNo + " .image-box").hide();
                    $("#picture-block-" + fileInputNo + " .uploaded-img").show();
                    $("#picture-block-" + fileInputNo + " .uploaded-img img").attr("src", response.imgPath);
                } else {
                    $(".bus-picture-error-popup-wrapper").show();
                    $(".bus-picture-error-popup-wrapper #fileName").text(response.filename);
                    $("#picture-block-" + fileInputNo + " .browse-link").show();
                    $("#picture-block-" + fileInputNo + " .progress-bar-box").hide();
                }
            }
        });
    });


    //datatable for vehicle master list
    loadVehicleMasterList();
    loadChartLayout();
    loadCoachList();
    //datatable for vehicle gps list
    loadVehicleGpsList();


    //for toggle tabs content
    $(".vmBlock2 .tabs-list .tab").on("click", function() {

        var tabId = $(this).attr("id");

        //for manage active tab
        $(".vmBlock2 .tabs-list .tab").removeClass("active-tab");
        $(this).addClass("active-tab");

        //for mange active tab content area
        $(".vmBlock2 .tabs-content > div").hide();
        $(".vmBlock2 .tabs-content div[class^='" + tabId + "']").show();

    });

    //for toggle tabs content
    $(".vmBlock3 .tabs-list .tab").on("click", function() {

        var tabId = $(this).attr("id");

        //for manage active tab
        $(".vmBlock3 .tabs-list .tab").removeClass("active-tab");
        $(this).addClass("active-tab");

        //for mange active tab content area
        $(".vmBlock3 .tabs-content > div").hide();
        $(".vmBlock3 .tabs-content div[class='" + tabId + "']").show();
    });




});



//this function called from Bus Info Tab, for select bus document file
function showBrowseDialog(obj) {
    var browseBtnNo = $(obj).attr("id").replace("btnBrowse-", "");
    $("#fileBrowse-" + browseBtnNo).trigger("click");

    $("#fileBrowse-" + browseBtnNo).unbind().bind("change", function() {
        var fileName = $(this)[0].files[0].name;
        $("#txtBrowse-" + browseBtnNo).val(fileName);
    });
}

function closeInfoPopup(e) {
    if (e.target.className === 'information-popup-wrapper') {
        $('.information-popup-wrapper').hide();
    }
}

function hideInfoPopup(e) {
    e.stopPropagation();
    $('.information-popup-wrapper').hide();
}


function closeOtpPopup(e) {
    if (e.target.className === 'otp-popup-wrapper') {
        $('.otp-popup-wrapper').hide();
    }
}


function hideOtpPopup(e) {
    e.stopPropagation();
    $('.otp-popup-wrapper').hide();
}

function gpsContinue() {
    $(".information-popup-wrapper").hide();
    $(".otp-popup-wrapper").show();
    $("#otp").focus();
}

function submitOTP() {
    if ($("#otp").val() == "") {
        alert("Please enter OTP !");
    } else {
        $("#btnToggleGPS").addClass("btnDisableGPS");
        $("button[class='btnGPSWorking']").show();
        $("button[class='btnGPSNotWorking']").hide();
        $('.otp-popup-wrapper').hide();
    }
}

function closeBusPictureErrorPopup(e) {
    e.stopPropagation();
    $('.bus-picture-error-popup-wrapper').hide();
}

function showBusPictureSelectDailog(obj) {
    var fileInputNo = $(obj).parents(".bus-picture-block").attr("id").replace("picture-block-", "");
    $("#busPicture" + fileInputNo).trigger("click");

    $("#busPicture" + fileInputNo).unbind().bind("change", function() {
        $("#fileUploadFor").val(fileInputNo);
        $("#btnUploadPhoto").submit();
    });
}

function editBusPicture(obj) {
    var fileInputNo = $(obj).parents(".bus-picture-block").attr("id").replace("picture-block-", "");
    $("#picture-block-" + fileInputNo + " .image-box").show();
    $("#picture-block-" + fileInputNo + " .uploaded-img").hide();
    $("#picture-block-" + fileInputNo + " .browse-link").show();
    $("#picture-block-" + fileInputNo + " .progress-bar-box").hide();
    $("#picture-block-" + fileInputNo + " .progress-bar-box .probar-loading").css("width", "0%");
}

function deleteBusPicture(obj) {
    var fileInputNo = $(obj).parents(".bus-picture-block").attr("id").replace("picture-block-", "");
    $("#picture-block-" + fileInputNo + " .image-box").show();
    $("#picture-block-" + fileInputNo + " .uploaded-img").hide();
    $("#picture-block-" + fileInputNo + " .browse-link").show();
    $("#picture-block-" + fileInputNo + " .progress-bar-box").hide();
    $("#picture-block-" + fileInputNo + " .progress-bar-box .probar-loading").css("width", "0%");
}
/*********************************chart layout Tab********************************************************* */
function loadChartLayout() {

    let tablechartlayout = $('#chart_layout').DataTable({
        ajax: {
            url: '../MasterBus/api/create-chart-layout.txt',
            dataSrc: 'data'
        },
        columns: [
            { data: 'Sr No' },
            {
                data: 'Chart Name',
                render: function(data, type, row, meta) {
                    if (type === 'display' && data.length <= 25) {
                        return '<span class=\"eye_icon\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data + '</span>';
                    } else {
                        return '<span class=\"eye_icon\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="text-decoration: underline;" title="' + data + '">' + data.substr(0, 20) + '...</span>';
                    }
                }
            },
            { data: 'Created Date & Time' },
            { data: 'Chart Type' },
            { data: 'Deck' },
            { data: 'Capacity' },
            { data: 'Seaters' },
            { data: 'Sleepers' },
            { data: 'Semi Sleeper' },
            {
                data: 'Self Created',
                render: function(data, type, row, meta) {
                    return '<input type="checkbox">';
                },
            },
            {
                data: 'Whitlisted',
                render: function(data, type, row, meta) {
                    return '<input type="checkbox" id="cbox" checked>';

                },
            },
        ],
        columnDefs: [

            { orderable: false, "width": "5%", "targets": 0 },
            { "width": "18%", "targets": 1 },
            { "width": "12%", "targets": 2 },
            { "width": "9%", "targets": 3 },
            { "className": 'dt-body-center', "width": "6%", "targets": 4 },
            { "className": 'dt-body-center', "width": "7%", "targets": 5 },
            { "className": 'dt-body-center', "width": "8%", "targets": 6 },
            { "className": 'dt-body-center', "width": "8%", "targets": 7 },
            { "className": 'dt-body-center', "width": "10%", "targets": 8 },
            { "className": 'dt-body-center', "width": "9%", "targets": 9 },
            { "className": 'dt-body-center', "width": "21%", "targets": 10 }

        ],
        paging: true,
        scrollY: '70vh',
        searching: true,
        pagingType: "full",
        pageLength: 10,
        sDom: '<"dom_wrapper"flipt>',
        language: {
            info: "_START_ - _END_ of _TOTAL_",
            infoEmpty: "No result found",
            infoFiltered: "",
            paginate: {
                first: '<span class="first_page_icon"></span>',
                previous: '<span class="prev_page_icon"></span>',
                next: '<span class="next_page_icon"></span>',
                last: '<span class="last_page_icon"></span>',
            },
            search: "",
            searchPlaceholder: "Search"
        }

    });

    $('#chart_layout tbody').on('click', '.eye_icon', function() {
        $(".layout-popup-wrapper").show();
    });


    $('#gobtn').on('click', function() {
        $(".ChartListContainer").toggle();
    });
    $('#filter_link').on('click', function() {
        $(".morefilter").toggle();
    });

    $("#newbtn").on('click', function() {
        $(".morefilter").css('display', 'none')
        $(".ChartListContainer").css('display', 'none')
        $(".flex-container").css('display', 'none')
        $(".new-flex-container").css('display', 'flex')
        $(".gen-deck").css('display', 'flex')
        $('#lowerDeckTable').empty();
        $('#upperDeckTable').empty();
    });

    $("#filterbtn").on('click', function() {
        filterDateRange();
        tablechartlayout.draw();
    });

    $("#resetbtn").on('click', function() {
        $("#min").val("");
        $("#max").val("");

    })
    $("#chart_layout tbody").on('click', '#cbox', function() {
        var checked = $(this).is(':checked');
        if (checked) {
            $("#dialog-activate").dialog({
                show: { effect: 'fade', duration: 250 },
                hide: { effect: 'fade', duration: 259 },
                dialogClass: "no-close",
                resizable: true,
                height: 190,
                maxHeight: 180,
                width: 300,
                left: 550,
                top: 240,
                modal: true,
                buttons: {
                    Confirm: function() {
                        $("#cbox").prop("checked", true).attr('checked', 'checked');
                        $(this).dialog("close");
                    },
                    Cancel: function() {
                        $("#cbox").prop("checked", false).removeAttr('checked');
                        $(this).dialog("close");
                    }
                },
                open: function(event) {
                    $('.ui-dialog-buttonpane').find('button:contains("Cancel")').css({ 'border-right': 'white', "border-bottom-right-radius": "10px" });
                    $('.ui-dialog-buttonpane').find('button:contains("Confirm")').css({ "border-bottom-left-radius": "10px" });
                    $('.ui-widget-overlay').css('background', 'black');
                }

            });
        } else {
            $("#dialog-deactivate").dialog({
                show: { effect: 'fade', duration: 250 },
                hide: { effect: 'fade', duration: 250 },
                dialogClass: "no-close",
                resizable: true,
                height: 190,
                maxHeight: 180,
                width: 300,
                left: 550,
                top: 240,
                modal: true,
                buttons: {
                    Confirm: function() {
                        $("#cbox").prop("checked", false).removeAttr('checked');
                        $(this).dialog("close");
                    },
                    Cancel: function() {
                        $("#cbox").prop("checked", true).attr('checked', 'checked');
                        $(this).dialog("close");
                    }
                },
                open: function(event) {
                    $('.ui-dialog-buttonpane').find('button:contains("Cancel")').css({ 'border-right': 'white', "border-bottom-right-radius": "10px" });
                    $('.ui-dialog-buttonpane').find('button:contains("Confirm")').css({ "border-bottom-left-radius": "10px" });
                    $('.ui-widget-overlay').css('background', 'black');
                }
            });
        }
    });
    tablechartlayout.draw();
}

function closelayoutPopup(event) {
    if (event.target.className === 'layout-popup-wrapper') {
        $('.layout-popup-wrapper').hide();
    }
}

function filterDateRange() {
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var fromdate = moment($("#min").val(), "MM/YYYY").format("YYYYMM")
            var todate = moment($("#max").val(), "MM/YYYY").format("YYYYMM")
            var date = moment(data[2], "DD/MM/YYYY hh:mm").format("YYYYMM")
            console.log(fromdate, todate, date)
            if (date >= fromdate && date <= todate) {
                return true;
            } else {
                return false;
            }
        });
}

function seatSelectBMCC() {
    $('#seaterNAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "3px solid #48bb48");
        $("#seaterAC").css("border", "1px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "1px solid #48bb48");
        $("#semiAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "1px solid #48bb48");
        $("#sleeperAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "1px solid #48bb48");
        $("#sleeperHAC").css("border", "1px solid rgb(255,0,0)");


    });
    $('#seaterAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "1px solid #48bb48");
        $("#seaterAC").css("border", "3px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "1px solid #48bb48");
        $("#semiAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "1px solid #48bb48");
        $("#sleeperAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "1px solid #48bb48");
        $("#sleeperHAC").css("border", "1px solid rgb(255,0,0)");

    });
    $('#semiNAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "1px solid #48bb48");
        $("#seaterAC").css("border", "1px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "3px solid #48bb48");
        $("#semiAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "1px solid #48bb48");
        $("#sleeperAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "1px solid #48bb48");
        $("#sleeperHAC").css("border", "1px solid rgb(255,0,0)");

    });
    $('#semiAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "1px solid #48bb48");
        $("#seaterAC").css("border", "1px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "1px solid #48bb48");
        $("#semiAC").css("border", "3px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "1px solid #48bb48");
        $("#sleeperAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "1px solid #48bb48");
        $("#sleeperHAC").css("border", "1px solid rgb(255,0,0)");

    });
    $('#sleeperNAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "1px solid #48bb48");
        $("#seaterAC").css("border", "1px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "1px solid #48bb48");
        $("#semiAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "3px solid #48bb48");
        $("#sleeperAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "1px solid #48bb48");
        $("#sleeperHAC").css("border", "1px solid rgb(255,0,0)");

    });
    $('#sleeperAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "1px solid #48bb48");
        $("#seaterAC").css("border", "1px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "1px solid #48bb48");
        $("#semiAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "1px solid #48bb48");
        $("#sleeperAC").css("border", "3px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "1px solid #48bb48");
        $("#sleeperHAC").css("border", "1px solid rgb(255,0,0)");

    });
    $('#sleeperHNAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "1px solid #48bb48");
        $("#seaterAC").css("border", "1px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "1px solid #48bb48");
        $("#semiAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "1px solid #48bb48");
        $("#sleeperAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "3px solid #48bb48");
        $("#sleeperHAC").css("border", "1px solid rgb(255,0,0)");

    });
    $('#sleeperHAC').click(function() {
        strdata = $(this).attr("data-details");
        style = $(this).attr("style");
        $("#seaterNAC").css("border", "1px solid #48bb48");
        $("#seaterAC").css("border", "1px solid rgb(255,0,0)");
        $("#semiNAC").css("border", "1px solid #48bb48");
        $("#semiAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperNAC").css("border", "1px solid #48bb48");
        $("#sleeperAC").css("border", "1px solid rgb(255,0,0)");
        $("#sleeperHNAC").css("border", "1px solid #48bb48");
        $("#sleeperHAC").css("border", "3px solid rgb(255,0,0)");

    });

}

function cancelBMCC() {
    $('#btnCancelCC').click(function() {
        $('.gen-deck').hide();
        $('.new-flex-container').hide();
        $('.flex-container').show();
    });
}

function generateBMCC() {
    $('#btnGenerateCC').click(function() {

        $('#lowerDeckTable').empty();
        $('#upperDeckTable').empty();
        var deck = $('#decknewCC').val();
        if (deck == '0') {
            alert("Select Deck");
            return false;
        }
        var col = $('#columnCC').val();
        var row = $('#rowCC').val();
        if (col == "" || row == "") {
            alert("Value Missing");
            return false;
        }
        var trtd = "";
        for (var i = 0; i < row; ++i) {
            trtd += "<tr>"
            for (var j = 0; j < col; ++j) {
                trtd += "<td colspan='1'  class='seat seater' style='border:1px solid #00aeef;background-color: white;' data-details='1^1^1^0^0' data-seat='seaterNAC' data-nomenu='yes'><br></td>";
            }
            trtd += "</tr>";
        }
        if (deck == "1") {
            $("#lowerDeckTable").append(trtd);
        }
        if (deck == "2") {
            $("#lowerDeckTable").append(trtd);
            $("#upperDeckTable").append(trtd);

        }
    });
    $("#lowerDeckTable").on("click", "td", function(event) {
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        if ($(this).attr("data-details") == "1^1^1^0^0") {
            if (strdata == "1^1^0^0^0" || strdata == "1^1^0^0^1" || strdata == "1^1^0^1^0" || strdata == "1^1^0^1^1") {
                $(this).attr("data-details", strdata);
                $(this).attr("style", style);
            }
            if (strdata == "1^2^0^0^0" || strdata == "1^2^0^0^1") {
                if ($(this).next().attr("data-details") == "1^1^1^0^0") {
                    var temp = style + ";border-right:0px;";
                    var temp1 = style + ";border-left:0px;";
                    $(this).attr("data-details", strdata);
                    $(this).attr("style", temp);
                    $(this).css('border-right', '0px');
                    $(this).next().attr("data-details", "0");
                    $(this).next().attr("style", temp1);
                }
            }
            if (strdata == "2^1^0^0^0" || strdata == "2^1^0^0^1") {
                if ($('#lowerDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("data-details") == "1^1^1^0^0") {
                    $(this).attr("data-details", strdata);
                    $(this).attr("style", style);
                    $('#lowerDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("data-details", "1");
                    $('#lowerDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("style", style);
                    $(this).css('border-bottom', '0px');
                    $('#lowerDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').css('border-top', '0px');

                }
            }

        } else {
            if ($(this).attr("data-details") == "0") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $(this).prev().attr("data-details", "1^1^1^0^0");
                $(this).prev().attr("style", defaultStyle);
            } else if ($(this).attr("data-details") == "1") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $('#lowerDeckTable tr:eq(' + (row - 1) + ') td:eq(' + (col) + ')').attr("data-details", "1^1^1^0^0");
                $('#lowerDeckTable tr:eq(' + (row - 1) + ') td:eq(' + (col) + ')').attr("style", defaultStyle);

            } else if ($(this).attr("data-details") == "1^1^0^0^0" || $(this).attr("data-details") == "1^1^0^0^1" || $(this).attr("data-details") == "1^1^0^1^0" || $(this).attr("data-details") == "1^1^0^1^1") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
            } else if ($(this).attr("data-details") == "1^2^0^0^0" || $(this).attr("data-details") == "1^2^0^0^1") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $(this).next().attr("data-details", "1^1^1^0^0");
                $(this).next().attr("style", defaultStyle);


            } else if ($(this).attr("data-details") == "2^1^0^0^0" || $(this).attr("data-details") == "2^1^0^0^1") {
                var diff = ($('#lowerDeckTable tr:eq(' + row + ') td').length - $('#lowerDeckTable tr:eq(' + row + 1 + ') td').length);

                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $('#lowerDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("data-details", "1^1^1^0^0");
                $('#lowerDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("style", defaultStyle);

            }
        }
    });
    $("#upperDeckTable").on("click", "td", function(event) {
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        if ($(this).attr("data-details") == "1^1^1^0^0") {
            if (strdata == "1^1^0^0^0" || strdata == "1^1^0^0^1" || strdata == "1^1^0^1^0" || strdata == "1^1^0^1^1") {
                $(this).attr("data-details", strdata);
                $(this).attr("style", style);
            }
            if (strdata == "1^2^0^0^0" || strdata == "1^2^0^0^1") {
                if ($(this).next().attr("data-details") == "1^1^1^0^0") {
                    var temp = style + ";border-right:0px;";
                    var temp1 = style + ";border-left:0px;";
                    $(this).attr("data-details", strdata);
                    $(this).attr("style", temp);
                    $(this).css('border-right', '0px');
                    $(this).next().attr("data-details", "0");
                    $(this).next().attr("style", temp1);
                }
            }
            if (strdata == "2^1^0^0^0" || strdata == "2^1^0^0^1") {
                if ($('#upperDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("data-details") == "1^1^1^0^0") {
                    $(this).attr("data-details", strdata);
                    $(this).attr("style", style);
                    $('#upperDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("data-details", "1");
                    $('#upperDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("style", style);
                    $(this).css('border-bottom', '0px');
                    $('#upperDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').css('border-top', '0px');

                }
            }

        } else {
            if ($(this).attr("data-details") == "0") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $(this).prev().attr("data-details", "1^1^1^0^0");
                $(this).prev().attr("style", defaultStyle);
            } else if ($(this).attr("data-details") == "1") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $('#upperDeckTable tr:eq(' + (row - 1) + ') td:eq(' + (col) + ')').attr("data-details", "1^1^1^0^0");
                $('#upperDeckTable tr:eq(' + (row - 1) + ') td:eq(' + (col) + ')').attr("style", defaultStyle);

            } else if ($(this).attr("data-details") == "1^1^0^0^0" || $(this).attr("data-details") == "1^1^0^0^1" || $(this).attr("data-details") == "1^1^0^1^0" || $(this).attr("data-details") == "1^1^0^1^1") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
            } else if ($(this).attr("data-details") == "1^2^0^0^0" || $(this).attr("data-details") == "1^2^0^0^1") {
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $(this).next().attr("data-details", "1^1^1^0^0");
                $(this).next().attr("style", defaultStyle);


            } else if ($(this).attr("data-details") == "2^1^0^0^0" || $(this).attr("data-details") == "2^1^0^0^1") {
                var diff = ($('#upperDeckTable tr:eq(' + row + ') td').length - $('#upperDeckTable tr:eq(' + row + 1 + ') td').length);
                $(this).attr("data-details", "1^1^1^0^0");
                $(this).attr("style", defaultStyle);
                $('#upperDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("data-details", "1^1^1^0^0");
                $('#upperDeckTable tr:eq(' + (row + 1) + ') td:eq(' + (col) + ')').attr("style", defaultStyle);

            }
        }


    });

}

/*****************************************Create Coach Tab***********************************************/
function loadCoachList() {

    var tableCoachList = $('#coach_list').DataTable({
        ajax: {
            url: '../MasterBus/api/create-coach-layout.txt',
            dataSrc: 'data'
        },
        columns: [
            { data: 'Sr' },
            {
                data: 'Coach Name',
                render: function(data, type, row, meta) {

                    return type === 'display' && data.length > 20 ?
                        '<span class=\"eye_icon\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="text-decoration: underline;" title="' + data + '">' + data.substr(0, 18) + '...</span>' :
                        data;

                }
            },
            { data: 'Created Data & Time' },
            {
                data: 'Bus Type',
                render: function(data, type, row, meta) {
                    return '<div id="busType-' + row.id + '"><div class="data">' + data + '</div><div class="input"><select id="myselectId-' + row.id + '"></select></div></div>';

                }
            },
            { data: 'Bus Cat' },
            { data: 'Standard Bus Type' },
            { data: 'Capacity' },
            {
                data: 'Created By Branch',
                render: function(data, type, row, meta) {

                    return type === 'display' && data.length > 18 ?
                        '<span style="text-decoration: underline;" title="' + data + '">' + data.substr(0, 15) + '...</span>' :
                        data;

                }
            },
            { data: 'Created User' },
            {
                "className": 'dt-body-center',
                data: 'Status',
                render: function(data, type, row, meta) {
                    return '<input type="checkbox">';
                },
            },

            {
                data: 'Action',
                render: function(data, type, row, meta) {
                    return '<div id="Action-' + row.id + '" style="display:flex;"><div class="editBtn"><a class=\"edit_link\"><span class=\"edit_icon\"></span>Edit</a></div><div class="saveBtn"><button type="button" class="btn1 btn-orange" style="height: 33px;">Save</button></div><div class="closeBtn"><button type="button" class="btn1 btn-new"  style="height: 33px;">Close</button></div><div>'
                }
            },
        ],
        columnDefs: [
            { orderable: false, "width": "1%", "targets": 0 },
            { "width": "17%", "targets": 1 },
            { "width": "15%", "targets": 2 },
            { "width": "7%", "targets": 3 },
            { "width": "7%", "targets": 4 },
            { "width": "13%", "targets": 5 },
            { "width": "7%", "targets": 6 },
            { "width": "15%", "targets": 7 },
            { "width": "10%", "targets": 8 },
            { "className": 'dt-body-center', "width": "7%", "targets": 9 },
            { "className": 'dt-body-center', orderable: false, "width": "7%", "targets": 10 }
        ],

        paging: true,
        scrollY: '70vh',
        searching: true,
        pagingType: "full",
        pageLength: 10,
        sDom: '<"dom_wrapper"flipt>',
        language: {
            info: "_START_ - _END_ of _TOTAL_",
            infoEmpty: "No result found",
            infoFiltered: "",
            paginate: {
                first: '<span class="first_page_icon"></span>',
                previous: '<span class="prev_page_icon"></span>',
                next: '<span class="next_page_icon"></span>',
                last: '<span class="last_page_icon"></span>',
            },
            search: "",
            searchPlaceholder: "Search"
        }

    });


    $("#coach_list_filter.dataTables_filter").prepend($(".coach_filter"));

    $("#coach_list_filter .dataTables_paginate").after($(".coach_new_btn"));

    $('#CoachStatus').on('change', function(e) {
        tableCoachList.draw();
    });

    $('#coach_list tbody').on('click', '.eye_icon', function() {
        $(".layout-popup-wrapper").show();
    });
    $('#coach_list tbody').on('click', '.edit_link', function() {
        $(" .input").hide()
        $(".saveBtn").hide()
        $(".closeBtn").hide()
        $(" .editBtn").show()
        $(" .data").show()


        let selectValues = {
            1: "Toyota",
            2: "Bus"
        };

        var data_row = tableCoachList.row($(this).parents('tr')).data();

        $("#Action-" + data_row.id + " .editBtn").hide()
        $("#Action-" + data_row.id + " .saveBtn").show()
        $("#Action-" + data_row.id + " .closeBtn").show()
        $("#busType-" + data_row.id + " .data").hide()
        $("#busType-" + data_row.id + " .input").show()

        $.each(selectValues, function(val, text) {
            $("#myselectId-" + data_row.id).append(
                $('<option></option>').val(val).html(text)
            );
        });
        $("#myselectId-" + data_row.id).chosen()

    });
    $('#coach_list tbody').on('click', '.closeBtn', function() {
        var data_row = tableCoachList.row($(this).parents('tr')).data();
        $("#busType-" + data_row.id + " .input").hide()
        $("#busType-" + data_row.id + " .data").show()
        $("#Action-" + data_row.id + " .saveBtn").hide()
        $("#Action-" + data_row.id + " .closeBtn").hide()
        $("#Action-" + data_row.id + " .editBtn").show()
    });
    $('#coach_list tbody').on('click', '.saveBtn', function() {
        var data_row = tableCoachList.row($(this).parents('tr')).data();
        $("#Action-" + data_row.id + " .saveBtn").hide()
        $("#Action-" + data_row.id + " .closeBtn").hide()
        $("#Action-" + data_row.id + " .editBtn").show()
        $("#busType-" + data_row.id + " .input").hide()
        $("#busType-" + data_row.id + " .data").show()
    });


    $('.coach_new_btn').on('click', function() {
        $(".CoachListContainer").css('display', 'none')
        $('.create_coach').css('display', 'flex')
    });
    $("#canbtn").on('click', function() {
        $(".CoachListContainer").css('display', 'block')
        $('.create_coach').css('display', 'none')
    })


    tableCoachList.draw();
}
/********************************************************************************************* */

//for load vechicle master datatable list
function loadVehicleMasterList() {

    var tableVehicleList = $('#vehicle_list').DataTable({
        ajax: {
            url: '../MasterBus/api/vehicle-master-data.txt',
            dataSrc: 'data'
        },
        columns: [
            { data: 'sr_no' },
            { data: 'bus_number' },
            { data: 'master_bus_number' },
            { data: 'coach_type' },
            { data: 'bus_type' },
            { data: 'bus_uses' },
            { data: 'status' },
            {
                data: 'action',
                render: function(data, type, row, meta) {
                    return "<a href=\"javascript:void(0)\"  class=\"edit_link\"><span class=\"edit_icon\"></span>Edit</a>"
                }
            },
        ],
        columnDefs: [
            { "width": "5%", "targets": 0 },
            { "width": "12%", "targets": 1 },
            { "width": "12%", "targets": 2 },
            { "width": "30%", "targets": 3 },
            { "width": "15%", "targets": 4 },
            { "width": "12%", "targets": 5 },
            { "width": "7%", "targets": 6 },
            { "width": "7%", "targets": 7 }
        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndexFull + 1;
            $("td:first", nRow).html(index);
            return nRow;
        },
        paging: true,
        scrollY: '70vh',
        ordering: true,
        order: [
            [1, "asc"],
            [6, "asc"]
        ],
        searching: true,
        pagingType: "full",
        pageLength: 20,
        sDom: '<"dom_wrapper"flipt>',
        language: {
            info: "_START_ - _END_ of _TOTAL_",
            infoEmpty: "No result found",
            infoFiltered: "",
            paginate: {
                first: '<span class="first_page_icon"></span>',
                previous: '<span class="prev_page_icon"></span>',
                next: '<span class="next_page_icon"></span>',
                last: '<span class="last_page_icon"></span>',
            },
            search: "",
            searchPlaceholder: "Search"
        }

    });

    //for prepend status drop down
    $("#vehicle_list_filter.dataTables_filter").prepend($(".custome_filter"));
    //for append button
    $(".dataTables_paginate").after($(".button_new"));

    $('#vehicleStatus').on('change', function(e) {
        //alert($(this).val());
        tableVehicleList.draw();
    });

    var statusIndex = 0;
    $("#vehicle_list th").each(function(i) {
        if ($(this).text() == "Status") {
            statusIndex = i;
            return false;
        }
    });

    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            if (settings.nTable.id == "vehicle_list") {
                var selectedItem = $('#vehicleStatus').val();
                var vStatus = data[statusIndex];
                if (selectedItem === "" || vStatus.includes(selectedItem)) {
                    return true;
                }
                return false;
            } else {
                return true;
            }
        }
    );

    $('#vehicle_list tbody').on('click', '.edit_link', function() {
        var data_row = tableVehicleList.row($(this).parents('tr')).data();
        //console.log(data_row);
        alert("Edit Bus No.: " + data_row.bus_number + " & Id : " + data_row.id);
    });

    tableVehicleList.draw();
}


function newVehicleRecord() {
    window.location = "";
    //$("#tabBusMaster").click();
}


//for load vechicle gps datatable list
function loadVehicleGpsList() {

    var tableVehicleGpsList = $('#vehicle_gps_list').DataTable({
        ajax: {
            url: '../MasterBus/api/vehicle-gps-data.txt',
            dataSrc: 'data'
        },
        columns: [
            { data: 'sr_no' },
            { data: 'master_bus_number' },
            { data: 'gps_vendor' },
            {
                data: 'action',
                render: function(data, type, row, meta) {
                    return "<a href=\"javascript:void(0)\"  class=\"edit_link\"><span class=\"edit_icon\"></span>Edit</a>"
                }
            },
        ],
        columnDefs: [
            { "width": "10%", "targets": 0 },
            { "width": "25%", "targets": 1 },
            { "width": "55%", "targets": 2 },
            { "width": "10%", "targets": 3 },
        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndexFull + 1;
            $("td:first", nRow).html(index);
            return nRow;
        },
        paging: true,
        scrollY: '70vh',
        ordering: true,
        order: [
            [1, "asc"],
            [2, "asc"]
        ],
        searching: true,
        pagingType: "full",
        pageLength: 20,
        sDom: '<"dom_wrapper"flipt>',
        language: {
            info: "_START_ - _END_ of _TOTAL_",
            infoEmpty: "No result found",
            infoFiltered: "",
            paginate: {
                first: '<span class="first_page_icon"></span>',
                previous: '<span class="prev_page_icon"></span>',
                next: '<span class="next_page_icon"></span>',
                last: '<span class="last_page_icon"></span>',
            },
            search: "",
            searchPlaceholder: "Search"
        }

    });


    $('#vehicle_gps_list tbody').on('click', '.edit_link', function() {
        var data_row = tableVehicleGpsList.row($(this).parents('tr')).data();
        //console.log(data_row);
        alert("Edit Bus No.: " + data_row.master_bus_number + " & Id : " + data_row.id);
    });

    tableVehicleGpsList.draw();

}


function calTotalAxle() {
    var totAxle = 0;
    var frontAxle = $("#frmTyreInformation #frontAxle").val();
    var rearAxle = $("#frmTyreInformation #rearAxle").val();

    if (parseInt(frontAxle) > 0) {
        totAxle += parseInt(frontAxle);
    }

    if (parseInt(rearAxle) > 0) {
        totAxle += parseInt(rearAxle);
    }

    $("#frmTyreInformation #totalAxle").val(totAxle);
}

function getAxleConfiguration() {

    var frontAxle = $("#frmTyreInformation #frontAxle").val();
    var rearAxle = $("#frmTyreInformation #rearAxle").val();

    if (frontAxle == "" || parseInt(frontAxle) <= 0) {
        $('.error-popup-wrapper .error-message').text("Please enter front axle value !");
        $('.error-popup-wrapper').show();
    }

    if (rearAxle == "" || parseInt(rearAxle) <= 0) {
        $('.error-popup-wrapper .error-message').text("Please enter rear axle value !");
        $('.error-popup-wrapper').show();
    }

    if (parseInt(frontAxle) && parseInt(rearAxle) > 0) {
        $.ajax({
            url: "getAxleConfiguration.php",
            type: "GET",
            async: true,
            data: { 'front': frontAxle, 'rear': rearAxle },
            beforeSend: function() {
                $(".axleConfiguration").html("Please wait while loading...");
            },
            success: function(result) {
                $(".axleConfiguration").html(result);
            }
        });
    }

}

function closeErrorPopup(e) {
    e.stopPropagation();
    $('.error-popup-wrapper').hide();
}

function closeSuccessPopup(e) {
    e.stopPropagation();
    $('.success-popup-wrapper').hide();
}

function addSpareTyre() {
    var stCount = $(".tyreSpareWrap .spareTyreWrap .spareTyre").length;
    stCount += 1;
    var spareTyreHtml = "";
    spareTyreHtml += "<div class=\"spareTyre\" id=\"spareTyre_" + stCount + "\">";
    spareTyreHtml += "<input type=\"checkbox\" name=\"chkSpareTyre[]\" id=\"chkSpareTyre_" + stCount + "\" value=\"1\">";
    spareTyreHtml += "<label for=\"chkSpareTyre_" + stCount + "\"></label>";
    spareTyreHtml += "</div>";
    $(".tyreSpareWrap .spareTyreWrap").append(spareTyreHtml);
}