$(document).ready(() => {
    getAll("name"),
    getAllDepartments(),
    getAllLocations(),
    getEmployeeCountByDepartment();
    getDepartmentCountByLocation();
});

$(window).on("load", () => {
    setTimeout(() => {
        $(".preloader-wrapper").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 2000);

});

// Search bar functionality
$("#searchBar").on("input", () => {
    let input = $("#searchBar").val().toLowerCase();
    $(".tableInformation").each(function () {
        let name = $(this).find(".employeeName").text().toLowerCase(),
            department = $(this).find(".employeeDepartment").text().toLowerCase(),
            location = $(this).find(".employeeLocation").text().toLowerCase();
            email = $(this).find(".employeeEmail").text().toLowerCase();
        name.includes(input) || department.includes(input) || location.includes(input) || email.includes(input) ? $(this).removeClass("d-none") : $(this).addClass("d-none");
    })
})

// Where Add Employee is clicked
$("#addEmployeeBtn").click((e) => {
    departmentSelectPopulation(),
    $("#createProfileBtn").removeClass("d-none"),
    $("#updateProfileInput").addClass("d-none"),
    $("#editProfileBtn").addClass("d-none"),
    $("#deleteProfileBtn").addClass("d-none"),
        $(".newFirstName").val(""),
        $(".newLastName").val(""),
        $(".newEmail").val(""),
        $(".newJobTitle").val(""),
        $(".newFirstName").attr("readonly", !1),
        $(".newLastName").attr("readonly", !1),
        $(".newEmail").attr("readonly", !1),
        $(".newJobTitle").attr("readonly", !1),
        $(".newDepartment").attr("disabled", !1),
        validatorReset();
})

// ^ When Department is selected
$(".newDepartment").change(() => {
    let id = $(".newDepartment :selected").attr("data-locationid");
    locationInputPopulation(id);
})

// Manage Department / Location buttons
$("#manageDepartmentBtn").click(() => {
    departmentMenuPopulation();
});
$("#manageLocationBtn").click(() => {
    locationMenuPopulation();
});

// Sortby Buttons
$("#sortByEmployeeName").click(() => getAll("name"));
$("#sortByDepartment").click(() => getAll("department"));
$("#sortByLocation").click(() => getAll("location"));
$("#sortByEmail").click(() => getAll("email"));

// When Employee Table is clicked
$("#employeeTable").on("click", ".tableInformation", (value) => {
    let id = $(value.currentTarget).attr("id");
    let currentID = Number(id);
    if (currentID != NaN) {
        departmentSelectPopulation(),
        getEmployeeByID(currentID),
        $("#createProfileBtn").addClass("d-none"),
        $("#updateProfileInput").addClass("d-none"),
        $("#editProfileBtn").removeClass("d-none"),
        $("#deleteProfileBtn").removeClass("d-none"),
            $(".newFirstName").attr("readonly", !1),
            $(".newLastName").attr("readonly", !1),
            $(".newEmail").attr("readonly", !1),
            $(".newJobTitle").attr("readonly", !1),
            $(".newDepartment").attr("disabled", !1),
            validatorReset();
    } else {

    }
});

// When departmentLocationList - DEPARTMENT INFORMATION is clicked
$(".departmentLocationList").on("click", ".departmentInformation", (value) => {
    // FORM selects
    $("#newDepartmentForm").removeClass("d-none"),
    $("#newLocationForm").addClass("d-none"),
    // Department buttons
    $("#createDepartmentBtn").addClass("d-none"),
    $("#updateDepartmentBtn").addClass("d-none"),
    $("#editDepartmentBtn").removeClass("d-none"),
    $("deleteDepartmentBtn").removeClass("d-none"),
    // Location buttons
    $("#createLocationBtn").addClass("d-none"),
    $("#updateLocationBtn").addClass("d-none"),
    $("#editLocationBtn").addClass("d-none"),
    $("#deleteLocationBtn").addClass("d-none"),
    $("#newDepartmentName").attr("readonly",  !0),
    $("#setLocation").attr("disabled", !0),
    validatorReset(),
    departmentFormPopulation();

    let id = $(value.currentTarget).attr("id"),
       did = $(value.currentTarget).attr("data-locationID");
    departmentID = Number(id);
    departmentLocationID = did;
    departments.forEach((value) => {
        value.id === id && ($("#newDepartmentName").val(value.name),
            $("#setLocation option").each(function () {
                $(this).attr("id") == did && $(this).prop("selected", "selected");
            }));
    })
});

// When departmentLocationList - LOCATION INFORMATION is clicked
$(".departmentLocationList").on("click", ".locationInformation", (value) => {
    // FORM selects
    $("#newDepartmentForm").addClass("d-none"),
    $("#newLocationForm").removeClass("d-none"),
    // Department buttons
    $("#createDepartmentBtn").addClass("d-none"),
    $("#updateDepartmentBtn").addClass("d-none"),
    $("#editDepartmentBtn").addClass("d-none"),
    $("deleteDepartmentBtn").addClass("d-none"),
    // Location buttons
    $("#createLocationBtn").addClass("d-none"),
    $("#updateLocationBtn").addClass("d-none"),
    $("#editLocationBtn").removeClass("d-none"),
    $("#deleteLocationBtn").removeClass("d-none"),
    $("#newLocationName").attr("readonly", !0),
    validatorReset();

    let id = $(value.currentTarget).attr("id");
    locationID = Number(id);
    locations.forEach((value) => {
        value.id === id && $("#newLocationName").val(value.name);
    })
});









let departments, 
locations, 
departmentID, 
locationID, 
employeeCountByDepartment, 
departmentCountByLocation, 
departmentLocationID, 
employee = { id: 0, firstName: "", lastName: "", email: "", jobTitle: "", department: "", location: ""};

// Creating new profile
/*
$("input[name='firstName'], input[name='lastName']").change(function() {

    $('#newEmployeeImage').empty();
    $('#newEmployeeImage').css('line-height', '185px');

    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let initials = firstName.charAt(0) + lastName.charAt(0);
    initials = initials.toUpperCase();

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
        const hex = color.replace('#', '');
        const c_r = parseInt(hex.substr(0, 2), 16);
        const c_g = parseInt(hex.substr(2, 2), 16);
        const c_b = parseInt(hex.substr(4, 2), 16);
        const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
        
        brightness > 210 ? $('#newEmployeeImage').css('color', '#5c6464') : $('#newEmployeeImage').css('color', "#fff");

    $('#newEmployeeImage').text(initials);
    $('#newEmployeeImage').css('background', color);
}); 
*/

// Retrieve all data - SortBy
const getAll = (type) => {
    $.ajax({
        url: "libs/php/getAll.php",
        type: "POST",
        dataType: "json",
        data: { sortBy: type },
        success: (result) => {
            if (("200" !== result.status.code && alert(result.status.name + ": " + result.status.description), "200" == result.status.code)) {
        let data = result.data;  
        console.log(data);
        $('#employeeTable').empty();

          data.forEach((e) => {
            $('#employeeTable').append(
                '<div class="row tableInformation" data-bs-toggle="collapse" href=".addMenu" role="button" aria-expanded="false" aria-controls="addMenu" id="' +
                e.id +
                '"><div class="col-3 col-sm-4 col-xl-3 nameColumn"><a class="employeeName" data-bs-toggle="collapse" href=".addMenu" role="button" aria-expanded="false" aria-controls="addMenu">' +
                e.firstName + 
                " " +
                e.lastName + 
                '</a></div><div class="col-3 d-none d-xl-inline-block emailColumn"><a class="employeeEmail" data-bs-toggle="collapse" href=".addMenu" role="button" aria-expanded="false" aria-controls="addMenu">' +
                e.email +
                '</a></div><div class="col-3 col-sm-4 col-xl-3 d-none d-sm-inline-block locationColumn"><a class="employeeLocation" data-bs-toggle="collapse" href=".addMenu" role="button" aria-expanded="false" aria-controls="addMenu">' +
                e.location + 
                '</a></div><div class="col col-sm-4 col-xl-3 departmentColumn"><a class="employeeDepartment" data-bs-toggle="collapse" href=".addMenu" role="button" aria-expanded="false" aria-controls="addMenu">' +
                e.department + 
                "</a></div></div>"
            );
          })
        } 
        },
        error: (e, t, a) => {
            alert("Error: " + a);
        }  
   })
},
// Retrieve Employees by ID
getEmployeeByID = (id) => {
    $.ajax({
        url: "libs/php/getEmployeeByID.php",
        type: "POST",
        dataType: "json",
        data: { id: id },
        success: (result) => {
            if ("200" == result.status.code) {
            let a = result.data.personnel[0];
                    (employee.id = a.id),
                    (employee.firstName = a.firstName),
                    (employee.lastName = a.lastName),
                    (employee.email = a.email),
                    (employee.jobTitle = a.jobTitle),
                    (employee.department = a.department),
                    (employee.location = a.location),
                    // Clear window values & change to readonly
                    $(".newFirstName").val("").attr("readonly", !0),
                    $(".newLastName").val("").attr("readonly", !0),
                    $(".newEmail").val("").attr("readonly", !0),
                    $(".newJobTitle").val("").attr("readonly", !0),
                    $(".newDepartment").val("").attr("disabled", !0),
                    // And now fill the employee window
                    $(".newFirstName").val(a.firstName),
                    $(".newLastName").val(a.lastName),
                    $(".newEmail").val(a.email),
                    $(".newJobTitle").val(a.jobTitle);
                    $(".newDepartment option").each(function(){
                        // When department value matchs retrieved department, 
                        // use the department's ID to locate location value
                        if ($(this).val() == employee.department) {
                            $(this).prop("selected", "selected");
                            let value = $(this).attr("data-locationid");
                            locationInputPopulation(value);
                        }
                    });
            } else alert(result.status.name + ": " + result.status.description);
        },
        error: (e, t, a) => {
            alert("Error: " + a);
        }
    })
},
// Retrieve Employee Count By Department / Location
getEmployeeCountByDepartment = () => {
    $.ajax({
        url: "libs/php/getEmployeeCountByDepartment.php",
        type: "GET",
        dataType: "json",
        success: (result) => {  
            "200" == result.status.code ? (employeeCountByDepartment = result.data) : alert(result.status.name + ": " + result.status.description);
        },
        error: (e, t, a) => {
            alert("Error: " + t);
        }
    })
},
// Retrieve Employee Count by Department ID
getEmployeeCountByDepartmentID = (id) => {
    $.ajax({
        url: "libs/php/getEmployeeCountByDepartmentID.php",
        type: "POST",
        dataType: "json",
        data: { id: id },
        success: (result) => {
            if ("200" == result.status.code) {
                let total = Number(result.data[0].employees);
                total > 0
                        ? ($("#noDeleteBody").empty(), $("#noDeleteBody").append("<p class='text-danger'>Cannot delete a department when at least one employee is assigned to it.</p>"), $("#noDeleteModal").modal())
                        : ($("#deleteBody").empty(),
                           $("#deleteBody").append("<p>Are you sure you want to delete this department?</p>"),
                           $("#deleteEmployeeBtn").addClass("d-none"),
                           $("#deleteDepartmentBtn").removeClass("d-none"),
                           $("#deleteLocationBtn").addClass("d-none"),
                           $("#deleteModal").modal());
                    } else alert(result.status.name + ": " + result.status.description);
        },
        error: (e, t, a) => {
            alert("Error: " + t);
        }
    })
},
// Retrieve All Departments
getAllDepartments = () => {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "GET",
        dataType: "json",
        success: (result) => {
            "200" == result.status.code ? (departments = result.data) : alert(result.status.name + ": " + result.status.description);
        }, 
        error: (e, t, a) => {
            alert("Error: " + a);
        }
    })
},
// Retrieve Department Count By Location
getDepartmentCountByLocation = () => {
    $.ajax({
        url: "libs/php/getDepartmentCountByLocation.php",
        type: "GET",
        dataType: "json",
        success: (result) => {
            "200" == result.status.code ? (departmentCountByLocation = result.data) : alert(result.status.name + ": " + result.status.description);
        },
        error: (e, t, a) => {
            alert("Error: " + t);
        }
    })
},
// Retrieve Department Count By Location ID
getDepartmentCountByLocationID = (id) => {
    $.ajax({
        url: "libs/php/getDepartmentCountByLocationID.php",
        type: "POST",
        dataType: "json",
        data: {id: id},
        success: (result) => {
            if ("200" == result.status.code) {
                let total = Number(result.data[0].departments);
                total > 0
                        ? ($("#noDeleteBody").empty(), $("#noDeleteBody").append("<p class='text-danger'>Cannot delete a location when at least one department is assigned to it.</p>"), $("#noDeleteModal").modal())
                        : ($("deleteBody").empty(),
                          $("#deleteBody").append("<p>Are you sure you want to delete this location?</p>"),
                          $("#deleteEmployeeBtn").addClass("d-none"),
                          $("#deleteDepartmentBtn").addClass("d-none"),
                          $("#deleteLocationBtn").removeClass("d-none"),
                          $("#deleteModal").modal());
                } else alert(result.status.name + ": " + result.status.description);
        },
        error: (e, t, a) => {
            alert("Error: " + e);
        },
    })
},
// Retrieve All Locations
getAllLocations = () => {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "GET",
        dataType: "json",
        success: (result) => {
            "200" == result.status.code ? (locations = result.data) : alert(result.status.name + ": " + result.status.description);
            },
        error: (e, t, a) => {
            alert("Error: " + a);
        }
    })
},
// Populate Department Select 
departmentSelectPopulation = () => {
    $(".newDepartment").empty(),
        $(".newDepartment").append('<option disabled selected="selected">Select Department</option>'),
        departments.forEach((value) => {
            $(".newDepartment").append('<option value="' + value.name + '" id="' + value.id + '" data-locationid="' + value.locationID + '">' + value.name + "</option>");
        });
},
// Populate Departure Form
departmentFormPopulation = () => {
    $("#newLocationForm").addClass("d-none"),
    $("#newDepartureForm").removeClass("d-none"),
    $("#setLocation").empty(),
    $("#setLocation").append('<option disabled selected="selected">Select Location</option>'),
    locations.forEach((value) => {
        $("#setLocation").append('<option id="' + value.id + '">' + value.name + "</option>");
    });
},
// Populate Department Menu
departmentMenuPopulation = () => {
    $(".departmentLocationList").empty(),
        $("#addDepartmentBtn").removeClass("d-none"),
        $("#addLocationBtn").addClass("d-none"),
        $(".departmentInformationHeader").removeClass("d-none"),
        $(".locationInformationHeader").addClass("d-none"),
            employeeCountByDepartment.forEach((value) => {
                $(".departmentLocationList").append(
                    '<div class="row departmentInformation" data-bs-toggle="collapse" href=".addDepartmentLocationMenu" role="button" aria-expanded="false" aria-controls="addDepartmentLocationMenu" id="'
                    + value.departmentID +
                    '" data-locationID="' 
                    + value.locationID +
                    '"><div class="col-6 col-sm-6 align-items-center><p class="m-0">'
                    + value.department +
                    '</p></div><div class="col col-sm-3 d-none d-sm-block align-items-center"><p class="m-0">'
                    + value.location +
                    '</p></div><div class="col-4 col-sm-3"><p class="m-0 text-right">'
                    + value.employees + "</p></div></div"
                );
        }) 
},
// Populate Location Menu
locationMenuPopulation = () => {
    $(".departmentLocationList").empty(),
    $("#addDepartmentBtn").addClass("d-none"),
    $("#addLocationBtn").removeClass("d-none"),
    $(".departmentInformationHeader").addClass("d-none"),
    $(".locationInformationHeader").removeClass("d-none");
        departmentCountByLocation.forEach((value) => {
        
            $(".departmentLocationList").append(
                '<div class="row locationInformation" data-bs-toggle="collapse" href=".addDepartmentLocationMenu" role="button" aria-expanded="false" aria-controls="addDepartmentLocationMenu" id="'
                + value.locationID +
                '"><div class="col-2 d-none d-sm-inline-block"></div><div class="col-7 col-sm-5"><p class="m-0">'
                + value.location +
                '</p></div><div class="col-5 col-sm-3 text-right"><p class="m-0">'
                + value.departments +
                '</p></div><div class="col-2 d-none d-sm-inline-block"></div></div>'

            );    
    })
},
// Populate Location Input 
locationInputPopulation = (value) => {
    locations.forEach((e) => {
      value == e.id && $(".newLocation").attr("value", e.name);
    })
};


// Modal Content and Validator reset
const setModalContent = (type, instruction, n, err, errdescription) => {
  "Employee" === type 
    ? ($("#confirmEmployee").removeClass("d-none"), $("#confirmDepartment").addClass("d-none"), $("#confirmLocation").addClass("d-none"))
: "Department" === type
    ? ($("#confirmEmployee").addClass("d-none"), $("#confirmDepartment").removeClass("d-none"), $("#confirmLocation").addClass("d-none"))
: "Location" === type && ($("#confirmEmployee").addClass("d-none"), $("#confirmDepartment").addClass("d-none"), $("#confirmLocation").removeClass("d-none")),
    n
        ? ($("confirmationTitle").empty(), $("#confirmationBody").empty(), $("#confirmationTitle").text("Congrats!"), $("#confirmationBody").append("<p>" + type + " has been " + instruction + "!</p>"), $("#confirmationModal").modal())
        : "error" === err
        ? ($("#confirmationTitle").empty(),
           $("#confirmationBody").empty(),
           $("#confirmationTitle").text("Failed!"),
           $("#confirmationBody").append("<p>Error: Form data cannot be processed. Please try again.</p>"),
           $("#confirmationModal").modal())
        : ($("#confirmationTitle").empty(),
           $("#confirmationBody").empty(),
           $("#confirmationTitle").text("Failed!"),
           $("#confirmationBody").append("<p>" + type + " could not be " + instruction + ".</p><p>Code: " + err + "<br>Description: " + errdescription + "</p>"),
           $("#confirmationModal").modal());
};

validatorReset = () => {
    $(".help-block").empty(), $(".newForm input").css("border-color", "#ced4da"), $(".newForm select").css("border-color", "#ced4da");
}