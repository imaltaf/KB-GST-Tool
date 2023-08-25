
  const copyButton = document.getElementById("copyButton");
  const resetButton = document.getElementById("resetButton");
  const formattedContent = document.getElementById("formattedContent");

  // Function to remove special characters
  function removeSpecialCharacters(inputString) {
    return inputString.replace(/[^\w\s]/gi, ""); // This regex removes special characters
  }

  copyButton.addEventListener("click", () => {
    const tradeName = removeSpecialCharacters(document.getElementById("tradeName").value);
    const natureOfBusiness = removeSpecialCharacters(document.getElementById("natureOfBusiness").value);
    const line1 = removeSpecialCharacters(document.getElementById("line1").value);
    const line2 = removeSpecialCharacters(document.getElementById("line2").value);
    const pinCode = removeSpecialCharacters(document.getElementById("pinCode").value);
    const city = removeSpecialCharacters(document.getElementById("city").value);
    const state = removeSpecialCharacters(document.getElementById("state").value);

    // Check if any of the required fields are empty
    if (!tradeName || !natureOfBusiness || !line1 || !line2 || !pinCode || !city || !state) {
      alert("Please fill in all the required fields.");
      return; // Exit the function if fields are empty
    }

    const formattedText =
      `Trade Name/Name of Business: ${tradeName} | ` +
      `Nature of Business/Line of Business/Type of Business: ${natureOfBusiness} | ` +
      `Line1: ${line1}| ` +
      `Line2: ${line2}| ` +
      `PinCode: ${pinCode}| ` +
      `City: ${city}| ` +
      `State: ${state}`;

    formattedContent.value = formattedText;
    formattedContent.select();
    document.execCommand("copy");
  });

  resetButton.addEventListener("click", () => {
    document.querySelectorAll("input[type='text']").forEach(input => {
      input.value = "";
    });
    formattedContent.value = "";
  });

