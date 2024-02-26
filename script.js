// List of all states in India
const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

// Function to remove special characters
function removeSpecialCharacters(inputString) {
  return inputString.replace(/[^\w\s]/gi, "");
}

// Function to restrict "PinCode" input to only allow numbers
function restrictPincodeInput() {
  const pincodeInput = document.getElementById("pinCode");
  pincodeInput.addEventListener("input", () => {
    // Remove non-numeric characters
    pincodeInput.value = pincodeInput.value.replace(/\D/g, "");
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
  const RegNo = removeSpecialCharacters(document.getElementById("RegNo").value);
  const RegDate = formatDate(document.getElementById("RegDate").value);
  const ExpiryDate = formatDate(document.getElementById("ExpiryDate").value);

  // Check if any of the required fields are empty
  if (!tradeName || !natureOfBusiness || !line1 || !line2 || !pinCode || !city || !state || !RegNo) {
    alert("Please fill in all the required fields.");
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
  document.getElementById("formattedContent").value = "";
  document.getElementById("RegDate").value = "";
  document.getElementById("ExpiryDate").value = "";
}

// Function to format date to DD/MM/YYYY format
function formatDate(dateString) {
    if (!dateString) return "NA"; // Return NA if date is not selected
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Increment the date by 1 to adjust for JavaScript's handling
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Run the functions when the page loads
window.addEventListener("load", () => {
  restrictPincodeInput();
  setupStateAutosuggestion();

  // Attach click event handlers to the "Copy" and "Reset" buttons
  document.getElementById("copyButton").addEventListener("click", copyFormattedContent);
  document.getElementById("resetButton").addEventListener("click", resetInputFields);
});
