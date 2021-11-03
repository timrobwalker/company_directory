// EMPLOYEES
const addEmployees = () => {
    let fname = $(".newFirstName").val().trim(),
        lname = $(".newLastName").val().trim(),
        job = $(".newJobTitle").val().trim(),
        email = $(".newEmail").val().trim,
        did = Number($(".newDepartment : selected").attr("id"));

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
                    "200" === result.status.code ? (setModalContent("Employee", "created", !0), getAll("name")) 
                                                 : setModalContent("Employee", "created", !1, result.status.code, result.status.description);
                },
                error: (e, t, a) => {
                    setModalContent("Employee", "created", !1, t, a);
                }
            })
            : setModalContent("Employee", "error", !1);
}