var jpDbBaseUrl = "http://api.login2explore.com:5577";
var jpDbIrl = "/api/irl";
var jpDbIml = "/api/iml";
var sudentDBName = "Student";
var sudentRelationName = "Student-Rel";
var connectionToken = "90932905|-31949282314533087|90948089";


$('#studrollno').focus();


function saveRecNo2LS(jsonObj) {
    console.log(jsonObj)
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}


function getStudentIdAsJsonObject() {
    var studentrollno = $('#studentrollno').val();
    var jsonStr = {
        id: studid
    };
    return JSON.stringify(jsonStr);

}


function getStudentRollNoAsJsonObject() {
    var rollno = $('#studentrollno').val();
    var jsonStr = {
        id: rollno
    };
    console.log(jsonStr);
    return JSON.stringify(jsonStr);

}


function fillData(jsonObj) {
    console.log(jsonObj);
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    console.log(record);
    $('#studentname').val(record.name);
    $('#studentclass').val(record.salary);
    $('#studentaddress').val(record.hra);
    $('#birthdate').val(record.da);
    $('#enrollmentdate').val(record.deduction);


}


function validateFormData() {
    var studentrollno, studentname, studentclass, studentaddress, studentbirthdate, enrollmentdate;

    console.log(studentrollno);
    console.log(studentname);
    console.log(studentclass);
    console.log(studentaddress);
    console.log(studentbirthdate);
    console.log(enrollmentdate);


    studrollno = $('#studrollno').val();
    studentname = $('#studentname').val();
    studentclass = $('#studentclass').val();
    studentaddress = $('#studentaddress').val();
    studentbirthdate = $('#birthdate').val();
    enrollmentdate = $('#enrollmentdate').val();


    if (studentrollno === "") {
        alert("Student Roll No is Missing");
        $('#sudentid').focus();
        return "";

    }

    if (studentname === "") {
        alert("Student Name is Missing");
        $('#sudentname').focus();
        return "";

    }

    if (studentclass === "") {
        alert("Student Class is Missing");
        $('#sudentsalary').focus();
        return "";

    }


    if (studentaddress === "") {
        alert("Student Address is Missing");
        $('#sudenthra').focus();
        return "";

    }

    if (datepicker === "") {
        alert("Student Birthdate is Missing");
        $('#sudentda').focus();
        return "";
    }

    if (datepicker2 === "") {
        alert("Student Enrollment Date is Missing");
        $('#sudentdeduction').focus();
        return "";
    }



    var jsonStrObj = {
        rollno: studentrollno,
        name: studentname,
        class: studentclass,
        adress: studentaddress,
        bdt: datepicker,
        edt: datepicker2

    };

    console.log(jsonStrObj)
    return JSON.stringify(jsonStrObj);

}



function resetFormData() {

    $('#studentrollno').val("");
    $('#studentname').val("");
    $('#studentclass').val("");
    $('#studentaddress').val("");
    $('#birthdate').val("");
    $('#enrollmentdate').val("");

   console.log($('#studentrollno'));
   $('#studentrollno').prop("disabled",false);
   $('#save').prop("disabled",true);
   $('#change').prop("disabled",true);
   $('#reset').prop('disabled',true);

   $('#studentrollno').focus();





}



function getStudent() {
    var studIdJsonObj = getStudentRollNoAsJsonObject();
    var getRequest = createGET_BY_KEYRequest(connectionToken, sudentDBName, sudentRelationName, studIdJsonObj);

    console.log(studIdJsonObj);
    console.log(getRequest);



    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpDbBaseUrl, jpDbIrl);

    console.log(resJsonObj);

    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", true);
        $("#reset").prop("disabled", true);
        $("#studentname").focus();



    } else if (resJsonObj.status === 200) {
        console.log(resJsonObj);
        $("#studentrollno").prop("disabled", true);
        fillData(resJsonObj);

        $("change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studentname").focus();


    }
}

function saveData() {
    var jsonStrObj = validateFormData();
    console.log(jsonStrObj);

    if (jsonStrObj === "") {
        return "";
    }

    var putRequest = createPUTRequest(connectionToken, jsonStrObj, sudentDBName, sudentRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpDbBaseUrl, jpDbIml);
    jQuery.ajaxSetup({ async: true });
    console.log(jsonStrObj);
    console.log(resJsonObj);
    resetFormData();
    $('#studentrollno').focus();

}



function changeData() {
    $('#change').prop('disabled', true);

    jsonChng = validateFormData();
    var updateRequest = createUPDATERecordRequest(connectionToken, jsonChng, sudentDBName, sudentRelationName, localStorage.getItem('record'));

    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpDbBaseUrl, jpDbIml);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetFormData();
    $('#studentrollno').focus();


}








