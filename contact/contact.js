document.addEventListener('DOMContentLoaded', async function () {
  const response = await fetch("checkLoggedIn.php");
  console.log("hi");
  if (response.status === 401) {
    window.location.href = "../signup/";
    return;
  }
});

function validateForm() {
  let hasError = false;
  let errorMessage = "";

  let subject = document.getElementById("subject").value.trim();
  let content = document.getElementById("content").value.trim();


  if (subject.length > 60) {
    errorMessage += "The subject must be under 60 characters";
    hasError = true;
  }

  if (content.length > 2000) {
    errorMessage += "The support ticket must be under 2000 characters";
    hasError = true;
  }
  if (content.length === 0) {
    errorMessage += "You must write content for the email";
    hasError = true;
  }
  if (errorMessage != "") {
    alert(errorMessage);
  }

  return !hasError;
}
