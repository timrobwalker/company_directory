let departments, 
locations, 
departmentID, 
locationID, 
employeeCountByDepartment, 
departmentCountByLocation, 
departmentLocationID, 
employee = { id: 0, firstName: "", lastName: "", email: "", jobTitle: "", department: "", location: ""};

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

$(window).keydown((e) => {
    if (13 == e.keyCode) return e.preventDefault(), false;
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
    $("#updateProfileBtn").addClass("d-none"),
    $("#editProfileBtn").addClass("d-none"),
    $("#deleteProfileBtn").addClass("d-none"),
        $(".newFirstName").val(""),
        $(".newLastName").val(""),
        $(".newEmail").val(""),
        $(".newJobTitle").val(""),
        $(".newFirstName").attr("readonly", false),
        $(".newLastName").attr("readonly", false),
        $(".newEmail").attr("readonly", false),
        $(".newJobTitle").attr("readonly", false),
        $(".newDepartment").attr("disabled", false),
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
    console.log(currentID);
    if (currentID != NaN) {
        departmentSelectPopulation(),
        getEmployeeByID(currentID),
        $("#createProfileBtn").addClass("d-none"),
        $("#updateProfileBtn").addClass("d-none"),
        $("#editProfileBtn").removeClass("d-none"),
        $("#deleteProfileBtn").removeClass("d-none"),
            $(".newFirstName").attr("readonly", false),
            $(".newLastName").attr("readonly", false),
            $(".newEmail").attr("readonly", false),
            $(".newJobTitle").attr("readonly", false),
            $(".newDepartment").attr("disabled", false),
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
    $("#newDepartmentName").attr("readonly", true),
    $("#setLocation").attr("disabled", true),
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
    $("#newLocationName").attr("readonly", true),
    validatorReset();

    let id = $(value.currentTarget).attr("id");
    locationID = Number(id);
    locations.forEach((value) => {
        value.id === id && $("#newLocationName").val(value.name);
    })
});

// Add Department 
$("#addDepartmentBtn").click(() => {
    departmentFormPopulation(),
    $("#newDepartmentForm").removeClass("d-none"),
    $("#newLocationForm").addClass("d-none"),
    $("#createDepartmentBtn").removeClass("d-none"),
    $("#updateDepartmentBtn").addClass("d-none"),
    $("#editDepartmentBtn").addClass("d-none"),
    $("#deleteDepartmentBtn").addClass("d-none"),
    $("#newDepartmentName").val(""),
    $("#newDepartmentName").attr("readonly", false),
    $("#setLocation").attr("disabled", false),
    validatorReset();
});

// Add Location
$("#addLocationBtn").click(() => {
    $("#newLocationForm").removeClass("d-none"),
    $("#newDepartmentForm").addClass("d-none"),
    $("#createLocationBtn").removeClass("d-none"),
    $("#updateLocationBtn").addClass("d-none"),
    $("#editLocationBtn").addClass("d-none"),
    $("#deleteLocationBtn").addClass("d-none"),
    $("#newLocationName").val(""),
    $("#newLocationName").attr("readonly", false),
    validatorReset();
});

// When Delete Employee button is clicked
$("#deleteProfileBtn").click(() => {
    $("#deleteBody").empty(),
    $("#deleteBody").append("<p>Are you sure you want to delete this profile?</p>"),
    $("#deleteEmployee").removeClass("d-none"),
    $("#deleteDepartment").addClass("d-none"),
    $("#deleteLocation").addClass("d-none");
});

// Delete buttons
$("#deleteDepartmentBtn").click(() => getEmployeeCountByDepartmentID(departmentID)),
$("#deleteLocationBtn").click(() => getDepartmentCountByLocationID(locationID)),
$("#deleteEmployee").click(() =>  deleteEmployee(employee.id)),
$("#deleteDepartment").click(() => deleteDepartment(departmentID)),
$("#deleteLocation").click(() => deleteLocation(locationID));

//  Delete functions
//  deleteEmployee
const deleteEmployee = (id) => {
    console.log(id);
    $.ajax({
        url: "libs/php/deleteEmployee.php",
        type: "POST",
        dataType: "json",
        data: { id: id },
        success: (result) => {
            console.log(result);
            "200" === result.status.code 
            ? (setModalContent("Employee", "deleted", true), (employee.id = 0), getAll("name")) 
            : setModalContent("Employee", "deleted", false, result.status.code, result.status.description);
        },
        error: (e, t, a) => {
            setModalContent("Employee", "deleted", false, t, a);
        }
    })
};
// deleteDepartment
const deleteDepartment = (id) => {
    $.ajax({
        url: "libs/php/deleteDepartment.php",
        type: "POST",
        dataType: "json",
        data: { id: id },
        success: (result) => {
            console.log(result);
            "200" === result.status.code
            ? (setModalContent("Department", "deleted", true), (departmentID = 0), getAllDepartments(), getEmployeeCountByDepartment())
            : setModalContent("Department", "deleted", false, result.status.code, result.status.description);
        },
        error: (e, t, a) => {
            setModalContent("Department", "deleted", false, t, a);
        }
    })
};
// deleteLocation
const deleteLocation = (id) => {
    $.ajax({
        url: "libs/php/deleteLocation.php",
        type: "POST", 
        dataType: "json",
        data: { id: id },
        success: (result) => {
            console.log(result);
            "200" === result.status.code
            ? (setModalContent("Location", "deleted", true), (locationID = 0), getAllLocations(), getDepartmentCountByLocation())
            : setModalContent("Location", "deleted", false, result.status.code, result.status.description);
        },
        error: (e, t, a) => {
            setModalContent("Location", "deleted", false, t, a);
        }
    })
};

// Edit Buttons
// Edit Profile Pencil functionality
$("#editProfileBtn").click(() => {
    departmentSelectPopulation(),
    validatorReset(),
    $("#createProfileBtn").addClass("d-none"),
    $("#updateProfileBtn").removeClass("d-none"),
    $("#editProfileBtn").addClass("d-none"),
    $("#deleteProfileBtn").addClass("d-none"),
    $(".newFirstName").attr("readonly", false),
    $(".newLastName").attr("readonly", false),
    $(".newEmail").attr("readonly", false),
    $(".newJobTitle").attr("readonly", false),
    $(".newDepartment").attr("disabled", false),
    $(".newDepartment option").each(function () {
        if ($(this).val() == employee.department) {
            $(this).prop("selected", "selected");
            let value = $(this).attr("data-locationid");
            locationInputPopulation(value);
        }
    });
});
// Edit Department
$("#editDepartmentBtn").click(() => {
    departmentFormPopulation(),
    validatorReset(),
    $("#createDepartmentBtn").addClass("d-none"),
    $("#updateDepartmentBtn").removeClass("d-none"),
    $("#editDepartmentBtn").addClass("d-none"),
    $("#deleteDepartmentBtn").addClass("d-none"),
    $("#newDepartmentName").attr("readonly", false),
    $("#setLocation").attr("disabled", false),
    $("#setLocation option").each(function () {
        $(this).attr("id") == departmentLocationID && $(this).prop("selected", "selected");
    })
});
// Edit Location
$("#editLocationBtn").click(() => {
    validatorReset(),
    $("#createLocationBtn").addClass("d-none"),
    $("#updateLocationBtn").removeClass("d-none"),
    $("#editLocationBtn").addClass("d-none"),
    $("#deleteLocationBtn").addClass("d-none"),
    $("#newLocationName").attr("readonly", false);
});

// Update buttons
$("#updateProfileBtn").click(() => updateEmployee());
$("#updateDepartmentBtn").click(() => updateDepartment());
$("#updateLocationBtn").click(() => updateLocation());

// Update functions
// updateEmployee
const updateEmployee = () => {
    let id = Number(employee.id),
        fname = $(".newFirstName").val().trim(),
        lname = $(".newLastName").val().trim(),
        job = $(".newJobTitle").val().trim(),
        email = $(".newEmail").val().trim(),
        did = Number($(".newDepartment :selected").attr("id"));

        fname.length > 0 && lname.length > 0 && NaN != did ?
        $.ajax({
            url: "libs/php/updateEmployee.php",
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                firstName: fname,
                lastName: lname,
                jobTitle: job,
                email: email,
                departmentID: did
            },
            success: (result) => {
                "200" === result.status.code 
                ? (setModalContent("Employee", "updated", true), getAll("name"))
                : setModalContent("Employee", "updated", false, result.status.code, result.status.description);
            },
            error: (e, t, a) => {
                setModalContent("Employee", "updated", false, t, a);
            }
        })
        : setModalContent("Employee", "error", false);
};
// updateDepartment
const updateDepartment = () => {
    let id = departmentID,
        name = $("#newDepartmentName").val(),
        did = Number($("#setLocation :selected").attr("id"));
    NaN != id && NaN != did
        ? $.ajax({
            url: "libs/php/updateDepartment.php",
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                name: name,
                locationID: did
            },
            success: (result) => {
                "200" === result.status.code
                    ? (setModalContent("Department", "updated", true), getAll("name"), getAllDepartments(), getEmployeeCountByDepartment(), (departmentID = 0))
                    : setModalContent("Department", "updated", false, result.status.code, result.status.description);
            },
            error: (e, t, a) => {
                setModalContent("Department", "updated", false, t, a);
            },
        })
        : setModalContent("Department", "error", false);
};
// updateLocation
const updateLocation = () => {
    let id = locationID,
      name = $("#newLocationName").val();
    NaN != id && NaN != locationID
        ? $.ajax({
            url: "libs/php/updateLocation.php",
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                name: name
            },
            success: (result) => {
                "200" === t.status.code
                    ? (setModalContent("Location", "updated", true), getAll("name"), getAllLocations(), getDepartmentCountByLocation(), (locationID = 0))
                    : setModalContent("Location", "updated", false, result.status.code, result.status.description);
            }, 
            error: (e, t, a) => {
                setModalContent("Location", "updated", false, t, a);
            }
        })
        : setModalContent("Location", "error", false);
};

// Confirmation buttons
$('.confirmBtn').click(() => {
    getAll("name"),
    getAllDepartments(),
    getAllLocations(),
    getEmployeeCountByDepartment(),
    getDepartmentCountByLocation(),
    $("#searchBar").val("");
})

$("#confirmDepartment").click(() => departmentMenuPopulation());
$("#confirmLocation").click(() => locationMenuPopulation());

$("#createProfileBtn").click(() => {
    $("#createProfileBtn").addClass("clicked"),
    $("#updateProfileBtn").removeClass("clicked");
});

$("#updateProfileBtn").click(() => {
    $("#updateProfileBtn").removeClass("d-none"),
    $("#updateProfileBtn").addClass("clicked"),
    $("#updateDepartment").addClass("d-none"),
    $("#updateLocation").addClass("d-none"),
    $("#createProfileBtn").removeClass("clicked");
})

$("#newEmployeeForm").validator().on("submit", (value) => {
    if (value.isDefaultPrevented()) {
        let text = $(".newDepartment").find(":selected").text();
        "Select Department" == text 
        ? $(".newDepartment").css("border-color", "#E63946") 
        : $(".newDepartment").css("border-color", "#ced4da");
    } else
        $("#createProfileBtn").hasClass("clicked") ? addEmployee()
        : $("#updateProfileBtn").hasClass("clicked")
        ? ($("#updateBody").empty(), $("#updateBody").append("<p>Are you sure you want to update this profile?</p>"), $("#updateModal").modal())
        : alert("error");
    return false;
})

$("#createDepartmentBtn").click(() => {
    $("#createDepartmentBtn").addClass("d-none"),
    $("#updateDepartmentBtn").removeClass("clicked");
})

$("#updateDepartmentBtn").click(() => {
    $("#updateEmployee").addClass("d-none"),
    $("#updateDepartment").removeClass("d-none"),
    $("#updateLocation").addClass("d-none"),
    $("#updateDepartmentBtn").addClass("clicked"),
    $("#createDepartmentBtn").removeClass("clicked");
})

$("newDepartmentForm").validator().on("submit", (value) => {
    if (value.isDefaultPrevented()) {
        let text = $("#setLocation").find(":selected").text();
        "Select Location" == text
        ? $("#setLocation").css("border-color", "#E63946") 
        : $("#setLocation").css("border-color", "#ced4da");
    } else 
        $("#createDepartmentBtn").hasClass("clicked") ? addDepartment()
        : $("#updateDepartmentBtn").hasClass("clicked")
        ? ($("#updateBody").empty(), $("#updateBody").append("<p>Are you sure you want to update this department?</p>"), $("#updateModal").modal())
        : alert("error");
    return false;
})

$("#createLocationBtn").click(() => {
    $("#createLocationBtn").addClass("clicked"),
    $("updateLocationBtn").removeClass("clicked");
})

$("#updateLocationBtn").click(() => {
    $("#updateEmployee").addClass("d-none"),
    $("#updateDeparture").addClass("d-none"),
    $("#updateLocation").removeClass("d-none"),
    $("#updateLocationBtn").addClass("clicked"),
    $("#createLocationBtn").removeClass("clicked");
})

$("#newLocationForm").validator().on("submit", (value) => (
    value.isDefaultPrevented()
        ? $("#newLocationName").css("border-color", "#E63946")
        : $("#createLocationBtn").hasClass("clicked")
        ? addLocation()
        : $("#updateLocationBtn").hasClass("clicked")
        ? ($("#updateBody").empty(), $("#updateBody").append("<p>Are you sure you want to update this location?</p>"), $("#updateModal").modal())
        : alert("error"),
    !1
    )
);

// Add functions
// AddEmployee
const addEmployee = () => {
    let fname = $(".newFirstName").val().trim(),
        lname = $(".newLastName").val().trim(),
        job = $(".newJobTitle").val().trim(),
        email = $(".newEmail").val().trim(),
        did = Number($(".newDepartment :selected").attr("id"));

        fname.length > 0 && lname.length > 0 && NaN != did ?
            $.ajax({
                url: "libs/php/insertEmployee.php",
                type: "POST",
                dataType: "json",
                data: {
                    firstName: fname,
                    lastName: lname,
                    jobTitle: job,
                    email: email,
                    departmentID: did
                },
                success: (result) => {
                    "200" === result.status.code 
                    ? (setModalContent("Employee", "created", true), getAll("name")) 
                    : setModalContent("Employee", "created", false, result.status.code, result.status.description);
                },
                error: (e, t, a) => {
                    setModalContent("Employee", "created", false, t, a);
                }
            })
            : setModalContent("Employee", "error", false);
};

// AddDepartment
const addDepartment = () => {
    let name = $("#newDepartmentName").val().trim(),
          id = Number($("setLocation :selected").attr("id"));
    name.length > 0 && NaN != id
        ? $.ajax({
            url: "libs/php/insertDepartment.php",
            type: "POST",
            dataType: "json",
            data: {
                name: name,
                locationID: id
            },
            success: (result) => {
                "200" === e.status.code
                ? (setModalContent("Department", "created", true), getAllDepartments(), getEmployeeCountByDepartment(), (departmentID = 0))
                : setModalContent("Department", "created", false, result.status.code, result.status.description);
            },
            error: (e, t, a) => {
                setModalContent("Department", "created", false, t, a);
            },
        }) 
    : setModalContent("Department", "error", false);
};

// AddLocation
const addLocation = () => {
    let name = $("#newLocationName").val().trim();
    name.length > 0
        ? $.ajax({
            url: "libs/php/insertLocation.php",
            type: "POST",
            dataType: "json",
            data: {
                name: name
            },
            success: (result) => {
                "200" == result.status.code
                ? (setModalContent("Location", "created", true), getAllLocations(), getDepartmentCountByLocation(), (locationID = 0))
                : setModalContent("Location", "created", false, result.status.code, result.status.description);
            },
            error: (e, t, a) => {
                setModalContent("Location", "created", false, t, a);
            }
        })
        : setModalContent("Location", "error", false);
}


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
                    $(".newFirstName").val("").attr("readonly", true),
                    $(".newLastName").val("").attr("readonly", true),
                    $(".newEmail").val("").attr("readonly", true),
                    $(".newJobTitle").val("").attr("readonly", true),
                    $(".newDepartment").val("").attr("disabled", true),
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
            "200" == result.status.code 
            ? (employeeCountByDepartment = result.data) 
            : alert(result.status.name + ": " + result.status.description);
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
            alert("Error: " + t);
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
const setModalContent = (type, instruction, TorF, err, errdescription) => {

switch (type) {
    case "Employee":
        $("#confirmEmployee").removeClass("d-none"), 
        $("#confirmDepartment").addClass("d-none"), 
        $("#confirmLocation").addClass("d-none");
        break;
    case "Department":
        $("#confirmEmployee").addClass("d-none"),
        $("#confirmDepartment").removeClass("d-none"),
        $("#confirmLocation").addClass("d-none");
        break;
    case "Location":
        $("#confirmEmployee").addClass("d-none"),
        $("#confirmDepartment").addClass("d-none"),
        $("#confirmLocation").removeClass("d-none");
        break;
}

    if (TorF) {
        $("#confirmationTitle").empty(), 
        $("#confirmationBody").empty(), 
        $("#confirmationTitle").text("Congrats!"), 
        $("#confirmationBody").append("<p>" + type + " has been " + instruction + "!</p>"), 
        $("#confirmationModal").modal();
    } else {
        if (err == "error") {
           $("#confirmationTitle").empty(),
           $("#confirmationBody").empty(),
           $("#confirmationTitle").text("Failed!"),
           $("#confirmationBody").append("<p>Error: Form data cannot be processed. Please try again.</p>"),
           $("#confirmationModal").modal();
        } else {
           $("#confirmationTitle").empty(),
           $("#confirmationBody").empty(),
           $("#confirmationTitle").text("Failed!"),
           $("#confirmationBody").append("<p>" + type + " could not be " + instruction + ".</p><p>Code: " + err + "<br>Description: " + errdescription + "</p>"),
           $("#confirmationModal").modal();
        }
    }  
};

validatorReset = () => {
    $(".help-block").empty(), $(".newForm input").css("border-color", "#ced4da"), $(".newForm select").css("border-color", "#ced4da");
}