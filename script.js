const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");
const formattedContent = document.getElementById("formattedContent");

copyButton.addEventListener("click", () => {
  const tradeName = document.getElementById("tradeName").value;
  const natureOfBusiness = document.getElementById("natureOfBusiness").value;
  const line1 = document.getElementById("line1").value;
  const line2 = document.getElementById("line2").value;
  const pinCode = document.getElementById("pinCode").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value; // Get the state from the input field

  // Check if the state is empty
  if (state.trim() === "") {
    alert("Please enter the state.");
    return;
  }

  const formattedText =
    `Trade Name/Name of Business: ${tradeName} | ` +
    `Nature of Business/Line of Business/Type of Business: ${natureOfBusiness} | ` +
    `Line1: ${line1} | ` +
    `Line2: ${line2} | ` +
    `PinCode: ${pinCode} | ` +
    `City: ${city} | ` +
    `State: ${state}`;

  formattedContent.value = formattedText;
  formattedContent.select();
  document.execCommand("copy");
});

resetButton.addEventListener("click", () => {
  document.querySelectorAll("input[type='text']").forEach((input) => {
    input.value = "";
  });
  document.getElementById("pinCode").value = ""; // Clear the pinCode input
  document.getElementById("state").value = ""; // Clear the state input
  formattedContent.value = "";
});
