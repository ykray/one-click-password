const onChange = () => {
  const lengthField = document.getElementById('password-length');
  var value = lengthField.value;

  if (lengthField.value > 100) {
    value = 100;
  } else if (lengthField.value < 20) {
    value = 20;
  }

  chrome.storage.sync.set({ passwordLength: value }, () => {
    // Password length settings saved
  });
};

const onBlur = () => {
  const lengthField = document.getElementById('password-length');

  if (lengthField.value > 100) {
    lengthField.value = 100;
  } else if (lengthField.value < 20) {
    lengthField.value = 20;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const lengthField = document.getElementById('password-length');

  chrome.storage.sync.get('passwordLength', (result) => {
    lengthField.value = result.passwordLength;
  });

  lengthField.addEventListener('change', onChange);
  lengthField.addEventListener('blur', onBlur);
});
