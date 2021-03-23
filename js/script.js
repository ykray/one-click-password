const scan = () => {
  var inputs = document.getElementsByTagName('input');
  var passwordFields = [];

  generatePassword().then((password) => {
    for (let i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      // Only inject into fields which have not been injected yet
      if (
        input.type == 'password' &&
        input.parentElement.querySelector('#generate-password-button') == null
      ) {
        passwordFields.push(input);
        addButtonToInput(passwordFields, password);
      }
    }
  });
};

// Handle password generation from context menu
chrome.runtime.onMessage.addListener((request) => {
  const element = document.activeElement;

  var nodeName = element.nodeName.toLowerCase();
  if (
    element.nodeType == 1 &&
    (nodeName == 'textarea' ||
      (nodeName == 'input' &&
        /^(?:text|email|search|password)$/i.test(element.type)))
  ) {
    element.click();
    element.value = request.generatedPassword;
  }
});

scan(); // initial scan
document.addEventListener('click', scan);
