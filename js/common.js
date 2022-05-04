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
        $(".tabs-list .tab").removeClass("active-tab");
        $(this).addClass("active-tab");

        //for mange active tab content area
        $(".tabs-content > div").hide();
        $(".tabs-content div[class='" + tabId + "']").show();

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

    $("input:radio[name='rdoBusNumber']").on("click", function () {
        if ($(this).val() == "1") {
            $(".tabBusMaster .selBusNumber").show();
            $(".tabBusMaster .txtBusNumber").hide();
        } else {
            $(".tabBusMaster .selBusNumber").hide();
            $(".tabBusMaster .txtBusNumber").show();
            $(".tabBusMaster #txtBusNumber").focus();
        }
    });

    $("input:radio[name='rdoMstBusNumber']").on("click", function () {
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
    $(".bus-info-input-wrap input[type='text']").on("focus", function (event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });

    //for inactive textbox
    $(".bus-info-input-wrap input[type='text']").on("blur", function (event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });


    $(".datepicker").datetimepicker(
        { format: "DD-MM-YYYY", useCurrent: true, debug: false, }
    );


    //save commercial button click
    $("#btnSaveCommercial").on("click", function () {
        $(".information-popup-wrapper").show();
    });


    //for active textbox
    $(".gps-input-wrap input[type='text']").on("focus", function (event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });

    //for inactive textbox
    $(".gps-input-wrap input[type='text']").on("blur", function (event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });

    //Associate Bus Number/Enter New Data on option click
    $("input:radio[name='rdoGPSFor']").on("click", function () {
        if ($(this).val() == "1") {
            $(".tabGPS .associate-bus-no").show();
            $(".tabGPS .new-data").hide();
        } else {
            $(".tabGPS .associate-bus-no").hide();
            $(".tabGPS .new-data").show();
        }
    });


    //for active textbox
    $(".otp-input-wrap input[type='text']").on("focus", function (event) {
        $(event.target).addClass("inputFocus");
        $(event.target).siblings("label").addClass("txtInputActiveLabel");
        $(event.target).siblings("label").removeClass("filled");
    });

    //for inactive textbox
    $(".otp-input-wrap input[type='text']").on("blur", function (event) {
        $(event.target).removeClass("inputFocus");
        if ($(event.target).val() == "" || $(event.target).val() == null) {
            $(event.target).siblings("label").removeClass("txtInputActiveLabel");
        } else {
            $(event.target).siblings("label").addClass("filled");
        }
    });

    //for bus amenities type select handle
    $(".tabAmeType").on("click", function () {
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

    $(".general-ame-list-wrap #atbus-ame-checkall").on('click', function () {
        if ($(this).is(":checked")) {
            $(".general-ame-list-wrap input[type='checkbox']").prop("checked", true);
            $(".general-ame-list-wrap #checkAll").text("Uncheck All");
        } else {
            $(".general-ame-list-wrap input[type='checkbox']").prop("checked", false);
            $(".general-ame-list-wrap #checkAll").text("Check All");
        }
    });


    $(".covid-ame-list-wrap #atbus-ame-checkall").on('click', function () {
        if ($(this).is(":checked")) {
            $(".covid-ame-list-wrap input[type='checkbox']").prop("checked", true);
            $(".covid-ame-list-wrap #checkAll").text("Uncheck All");
        } else {
            $(".covid-ame-list-wrap input[type='checkbox']").prop("checked", false);
            $(".covid-ame-list-wrap #checkAll").text("Check All");
        }
    });

    $(".ame-in-bus-wrap #inbus-ame-checkall").on('click', function () {
        if ($(this).is(":checked")) {
            $(".ame-in-bus-wrap input[type='checkbox']").prop("checked", true);
            $(".ame-in-bus-wrap #checkAll").text("Uncheck All");
        } else {
            $(".ame-in-bus-wrap input[type='checkbox']").prop("checked", false);
            $(".ame-in-bus-wrap #checkAll").text("Check All");
        }
    });


    // Submit form data via Ajax
    $("#busPictures").on('submit', function (e) {
        e.preventDefault();

        var fileInputNo = $("#fileUploadFor").val();

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
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
            beforeSend: function () {
                $("#picture-block-" + fileInputNo + " .browse-link").hide();
                $("#picture-block-" + fileInputNo + " .progress-bar-box").show();
                $("#picture-block-" + fileInputNo + " .progress-bar-box .probar-loading").css("width", "0%");
            },
            success: function (response) {
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

    //datatable for vehicle gps list
    loadVehicleGpsList();

});



//this function called from Bus Info Tab, for select bus document file
function showBrowseDialog(obj) {
    var browseBtnNo = $(obj).attr("id").replace("btnBrowse-", "");
    $("#fileBrowse-" + browseBtnNo).trigger("click");

    $("#fileBrowse-" + browseBtnNo).unbind().bind("change", function () {
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

    $("#busPicture" + fileInputNo).unbind().bind("change", function () {
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

//for load vechicle master datatable list
function loadVehicleMasterList() {

    var tableVehicleList = $('#vehicle_list').DataTable({
        ajax: {
            url: '/api/vehicle-master-data.txt',
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
                render: function (data, type, row, meta) {
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
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndexFull + 1;
            $("td:first", nRow).html(index);
            return nRow;
        },
        paging: true,
        scrollY: '70vh',
        ordering: true,
        order: [[1, "asc"], [6, "asc"]],
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

    $('#vehicleStatus').on('change', function (e) {
        //alert($(this).val());
        tableVehicleList.draw();
    });

    var statusIndex = 0;
    $("#vehicle_list th").each(function (i) {
        if ($(this).text() == "Status") {
            statusIndex = i; return false;
        }
    });

    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
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

    $('#vehicle_list tbody').on('click', '.edit_link', function () {
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
            url: '/api/vehicle-gps-data.txt',
            dataSrc: 'data'
        },
        columns: [
            { data: 'sr_no' },
            { data: 'master_bus_number' },
            { data: 'gps_vendor' },
            {
                data: 'action',
                render: function (data, type, row, meta) {
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
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndexFull + 1;
            $("td:first", nRow).html(index);
            return nRow;
        },
        paging: true,
        scrollY: '70vh',
        ordering: true,
        order: [[1, "asc"], [2, "asc"]],
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


    $('#vehicle_gps_list tbody').on('click', '.edit_link', function () {
        var data_row = tableVehicleGpsList.row($(this).parents('tr')).data();
        //console.log(data_row);
        alert("Edit Bus No.: " + data_row.master_bus_number + " & Id : " + data_row.id);
    });

    tableVehicleGpsList.draw();

}