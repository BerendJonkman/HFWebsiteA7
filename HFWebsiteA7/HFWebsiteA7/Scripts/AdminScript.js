﻿window.onload = function () {
    $("body").css("cursor", "default");

}

function cancelRemoveDialog() {
    var removeDialog = document.getElementById('removeDialog');
    removeDialog.close();
}

function cancelAddDialog() {
    var addDialog = document.getElementById('addDialog');
    addDialog.close();
}

function showRemoveDialog(adminBandId) {
    console.log(adminBandId);
    id = adminBandId;
    var removeDialog = document.getElementById('removeDialog');
    removeDialog.showModal();
}

function removeBand() {
    $.ajax({
        type: "GET",
        url: '/Admin/RemoveBand',
        data: { 'bandId': id },
    }).done(function () {
        location.reload();
    }).fail(function (xhr, status, errorThrown) {
        alert(status);
    });
}

function showDiv() {
    if (document.getElementById('divCreate').style.display == "none") {
        document.getElementById('divCreate').style.display = "block";
        document.getElementById('newButton').textContent = "Close";
    } else {
        document.getElementById('divCreate').style.display = "none";
        document.getElementById('newButton').textContent = "New";
    }
}

var id = 0;

function showBandDialog(selectedId) {
    id = selectedId;
    $.ajax({
        url: '/Admin/GetBand',
        type: 'GET',
        data: { 'bandId': id },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var url = response.ImagePath.substring(1);

            console.log(url);
            $("#bandImage").attr("src", url);
            document.getElementById("Name").value = response.Name;
            document.getElementById("Description").value = response.Description;
            var addDialog = document.getElementById('addDialog');
            addDialog.showModal();
        },
        error: function (error) {
            $(that).remove();
            DisplayError(error.statusText);
        }
    });
}

function showLocationDialog(selectedId) {
    id = selectedId;
    $.ajax({
        url: '/Admin/GetLocation',
        type: 'GET',
        data: { 'locationId': id },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            document.getElementById("DialogName").value = response.Name;
            document.getElementById("DialogStreet").value = response.Street;
            document.getElementById("DialogHouseNumber").value = response.HouseNumber;
            document.getElementById("DialogCity").value = response.City;
            document.getElementById("DialogZipCode").value = response.ZipCode;

            var addDialog = document.getElementById('addDialog');
            addDialog.showModal();
        },
        error: function (error) {
            $(that).remove();
            DisplayError(error.statusText);
        }
    });
}

function setImageChanged() {
    imageChanged = true;
}

var imageChanged = false;

function showConcertDialog(selectedId) {
    id = selectedId;

    $.ajax({
        url: '/Admin/GetConcert',
        type: 'GET',
        data: { 'ConcertId': id },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            document.getElementById("LocationSelect").value = response.Location.Id;
            document.getElementById("HallSelect").value = response.Hall.Id;
            document.getElementById("DurationTextBox").value = response.Duration;
            document.getElementById("StartTimeTextBox").value = toJavaScriptDate(response.StartTime);
            document.getElementById("BandText").innerHTML = response.Band.Name;
            document.getElementById("DayText").innerHTML = response.Day.Name;

            var addDialog = document.getElementById('addDialog');
            addDialog.showModal();
        },
        error: function (error) {
            $(that).remove();
            DisplayError(error.statusText);
        }
    });
}

function showRestaurantDialog(selectedId) {
    id = selectedId;
    $.ajax({
        url: '/Admin/GetAdminRestaurant',
        type: 'GET',
        data: { 'restaurantId': id },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var url = response.Restaurant.ImagePath.substring(1);

            $("#ConcertImage").attr("src", url);
            setFoodTypesSelected(response.FoodTypeIdList)
            document.getElementById("NameTextBox").value = response.Restaurant.Name;
            document.getElementById("LocationSelect").value = response.Restaurant.LocationId;
            document.getElementById("DescriptonTextArea").value = response.Restaurant.Description;
            document.getElementById("SessionsTextBox").value = response.Sessions;
            document.getElementById("StartTimeTextBox").value = toJavaScriptDate(response.StartTime);
            document.getElementById("DurationTextBox").value = response.Duration;
            document.getElementById("SeatsTextBox").value = response.Restaurant.Seats;
            document.getElementById("StarsTextBox").value = response.Restaurant.Stars;
            document.getElementById("PriceTextBox").value = response.Restaurant.Price;
            document.getElementById("LessPriceTextBox").value = response.Restaurant.ReducedPrice;

            var addDialog = document.getElementById('addDialog');
            addDialog.showModal();
        },
        error: function (error) {
            $(that).remove();
            DisplayError(error.statusText);
        }
    });
}

function setFoodTypesSelected(foodTypeList) {
    $("#FoodTypeSelect").val(foodTypeList).trigger("chosen:updated");
}

function toJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    var minutes = dt.getMinutes().toString();
    if (minutes == "0") {
        minutes = "00";
    }
    var startTime = dt.getHours() + ":" + minutes;
    return (startTime);
}

function newBandImage() {
    formData = new FormData();
    var totalFiles = document.getElementById("BandImageFile").files.length;
    for (var i = 0; i < totalFiles; i++) {
        var file = document.getElementById("BandImageFile").files[i];
        formData.append("bandImage", file);
    }
    console.log(formData)
}
var formData;

function saveLocationData() {

}

function saveBandData() {
    var name = document.getElementById("Name").value;
    var description = document.getElementById("Description").value;

    $.ajax({
        type: "POST",
        url: '/Admin/UpdateBand',
        data: { 'bandId': id, 'name': name, 'description': description, 'imageChanged': imageChanged },
    }).done(function () {
        var totalFiles = document.getElementById("BandImageFile").files.length;
        if (totalFiles != 0 && imageChanged) {
            formData = new FormData();
            for (var i = 0; i < totalFiles; i++) {
                var file = document.getElementById("BandImageFile").files[i];
                fileName = name.replace(/\s/g, '') + ".jpg";

                file.name = fileName;
                formData.append("bandImage", file, fileName);
            }
            saveBandImage();
        } else {
            location.reload();
        }

    }).fail(function (xhr, status, errorThrown) {
        alert(status);
    });
}

function closeDialog(snackbarText, dialogId) {
    var addDialog = document.getElementById(dialogId);
    addDialog.close();

    var x = document.getElementById("snackbar");
    x.textContent = snackbarText;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", "");; }, 3000);
}

function saveBandImage() {
    $.ajax({
        type: "POST",
        url: '/Admin/`oadBandImage',
        data: formData,
        contentType: false,
        processData: false
    }).done(function () {
        location.reload()
    }).fail(function (xhr, status, errorThrown) {
        alert(xhr + ', ' + status + ', ' + errorThrown);
    });
}

function saveLocationData() {

    var name = document.getElementById("DialogName").value;
    var street = document.getElementById("DialogStreet").value;
    var houseNumber = document.getElementById("DialogHouseNumber").value;
    var city = document.getElementById("DialogCity").value;
    var zipCode = document.getElementById("DialogZipCode").value;
    $.ajax({
        type: "POST",
        url: '/Admin/UpdateLocation',
        data: { 'locationId': id, 'name': name, 'street': street, 'houseNumber': houseNumber, 'city': city, 'zipCode': zipCode },
    }).done(function () {
        location.reload();
    }).fail(function (xhr, status, errorThrown) {
        alert(status);
    });
}

function saveConcertData() {
    var locationId = document.getElementById("LocationSelect").value;
    var hallId = document.getElementById("HallSelect").value;
    var duration = document.getElementById("DurationTextBox").value;
    var startTime = document.getElementById("StartTimeTextBox").value;
    $.ajax({
        type: "POST",
        url: '/Admin/UpdateConcert',
        data: { 'eventId': id, 'locationId': locationId, 'hallId': hallId, 'duration': duration, 'startTime': startTime },
    }).done(function () {
        location.reload();
    }).fail(function (xhr, status, errorThrown) {
        alert(status);
    });
}

function saveRestaurantData() {

    var name = document.getElementById("NameTextBox").value;
    var location = document.getElementById("LocationSelect").value;
    var description = document.getElementById("DescriptonTextArea").value;
    var sessions = document.getElementById("SessionsTextBox").value;
    var startTime = document.getElementById("StartTimeTextBox").value;
    var duration = document.getElementById("DurationTextBox").value;
    var seats = document.getElementById("SeatsTextBox").value;
    var stars = document.getElementById("StarsTextBox").value;
    var price = document.getElementById("PriceTextBox").value;
    var reducedPrice = document.getElementById("LessPriceTextBox").value;
    var foodTypes = document.getElementById("FoodTypeSelect").value;
    $("body").css("cursor", "progress");
    $.ajax({
        type: "POST",
        url: '/Admin/UpdateAdminRestaurant',
        data: { 'restaurantId': id, 'availableSeats': seats, 'name': name, 'locationId': location, 'price': price, 'reducedPrice': reducedPrice, 'stars': stars, 'description': description, 'sessions': sessions, 'startTime': startTime, 'foodTypeArray': foodTypes, 'duration': duration },
    }).done(function () {
        var totalFiles = document.getElementById("RestaurantImageFile").files.length;
        if (totalFiles != 0 && imageChanged) {
            formData = new FormData();
            for (var i = 0; i < totalFiles; i++) {
                var file = document.getElementById("RestaurantImageFile").files[i];
                fileName = name.replace(/\s/g, '') + ".jpg";

                file.name = fileName;
                formData.append("restaurantImage", file, fileName);
            }
            saveRestaurantImage();

        }
    }).fail(function (xhr, status, errorThrown) {
        alert(status);
    });
}

function saveRestaurantImage() {
    $.ajax({
        type: "POST",
        url: '/Admin/UploadRestaurantImage',
        data: formData,
        contentType: false,
        processData: false
    }).done(function () {
        location.reload()
    }).fail(function (xhr, status, errorThrown) {
        alert(xhr + ', ' + status + ', ' + errorThrown);
    });
}