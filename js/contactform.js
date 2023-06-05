function submitForm() {
    swal({
        title: "Form Submitted Successfully !!!",
        icon: "success",
        button: "Close!",
        defeat: true,
        timer: 2000
    });
    submitted = true;
    var frm = document.getElementsByName('contact-form')[0];
    frm.submit(); // Submit the form
    // frm.reset(); 
    return true;
}