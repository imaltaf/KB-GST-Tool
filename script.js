// List of all states in India
const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

// Function to remove special characters
function removeSpecialCharacters(inputString) {
  return inputString.replace(/[^\w\s]/gi, "");
}

// Function to validate date in DD/MM/YYYY format
function validateDate(dateString) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;

  // Extract day, month, and year
  const [, day, month, year] = dateString.match(regex);

  // Validate month and day ranges
  if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) return false;
  if (parseInt(day, 10) < 1 || parseInt(day, 10) > 31) return false;

  // Validate February days for leap years
  if (parseInt(month, 10) === 2) {
    const isLeapYear = (parseInt(year, 10) % 4 === 0 && parseInt(year, 10) % 100 !== 0) || parseInt(year, 10) % 400 === 0;
    if (parseInt(day, 10) > (isLeapYear ? 29 : 28)) return false;
  }

  return true;
}

// Function to format date to DD/MM/YYYY
function formatDate(inputDate) {
  const [year, month, day] = inputDate.split('-');
  return `${day}/${month}/${year}`;
}

// Function to restrict "PinCode" input to only allow 6-digit numbers
function restrictPincodeInput() {
  const pincodeInput = document.getElementById("pinCode");
  pincodeInput.addEventListener("input", () => {
    // Remove non-numeric characters
    pincodeInput.value = pincodeInput.value.replace(/\D/g, "");

    // Ensure pin code is maximum 6 digits
    if (pincodeInput.value.length > 6) {
      pincodeInput.value = pincodeInput.value.slice(0, 6);
    }
  });
}

// Function to provide auto-suggestion for "State" input
function setupStateAutosuggestion() {
  const stateInput = document.getElementById("state");
  stateInput.addEventListener("input", () => {
    const inputText = stateInput.value.toLowerCase();
    const suggestions = indianStates.filter(state => state.toLowerCase().includes(inputText));

    // Display the suggestions
    const suggestionList = document.getElementById("stateSuggestions");
    suggestionList.innerHTML = "";
    suggestions.forEach(suggestion => {
      const listItem = document.createElement("li");
      listItem.textContent = suggestion;
      listItem.addEventListener("click", () => {
        stateInput.value = suggestion;
        suggestionList.innerHTML = "";
      });
      suggestionList.appendChild(listItem);
    });
  });

  // Clear the suggestions when the input loses focus
  stateInput.addEventListener("blur", () => {
    document.getElementById("stateSuggestions").innerHTML = "";
  });
}

// Function to copy the formatted content
function copyFormattedContent() {
  const tradeName = removeSpecialCharacters(document.getElementById("tradeName").value);
  const natureOfBusiness = removeSpecialCharacters(document.getElementById("natureOfBusiness").value);
  const line1 = removeSpecialCharacters(document.getElementById("line1").value);
  const line2 = removeSpecialCharacters(document.getElementById("line2").value);
  const pinCode = removeSpecialCharacters(document.getElementById("pinCode").value);
  const city = removeSpecialCharacters(document.getElementById("city").value);
  const state = removeSpecialCharacters(document.getElementById("state").value);
  const RegNo = document.getElementById("RegNo").value;
  const RegDate = formatDate(document.getElementById("RegDate").value);
  const ExpiryDate = formatDate(document.getElementById("ExpiryDate").value);

  // Check if any of the required fields are empty
  if (!tradeName || !natureOfBusiness || !line1 || !line2 || !pinCode || !city || !state || !RegNo) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Validate dates
  if (!validateDate(RegDate) || !validateDate(ExpiryDate)) {
    alert("Invalid date format. Please use DD/MM/YYYY format.");
    return;
  }

  const formattedText =
    `Trade Name/Name of Business: ${tradeName} | ` +
    `Nature of Business/Line of Business/Type of Business: ${natureOfBusiness} | ` +
    `Line1: ${line1} | ` +
    `Line2: ${line2} | ` +
    `PinCode: ${pinCode} | ` +
    `City: ${city} | ` +
    `State: ${state} | ` +
    `RegNo: ${RegNo} | ` +
    `RegDate: ${RegDate} | ` +
    `ExpiryDate: ${ExpiryDate}`;

  const formattedContent = document.getElementById("formattedContent");
  formattedContent.value = formattedText;
  formattedContent.select();
  document.execCommand("copy");
}

// Function to reset input fields
function resetInputFields() {
  document.querySelectorAll("input[type='text']").forEach(input => {
    input.value = "";
  });

  document.getElementById("pinCode").value = "";
  document.getElementById("RegDate").value = "";
  document.getElementById("ExpiryDate").value = "";
  document.getElementById("formattedContent").value = "";
}

// Run the functions when the page loads
window.addEventListener("load", () => {
  restrictPincodeInput();
  setupStateAutosuggestion();

  document.getElementById("copyButton").addEventListener("click", copyFormattedContent);
  document.getElementById("resetButton").addEventListener("click", resetInputFields);
});
