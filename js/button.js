const wrap = (element, wrapper) => {
  element.parentNode.insertBefore(wrapper, element);
  return wrapper.appendChild(element);
};

const addButtonToInput = (inputs, password) => {
  var button = document.createElement('div');
  button.id = 'generate-password-button';
  button.className = 'generate-password-button';
  button.title = 'Generate password';

  inputs.forEach((input) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-field-wrapper';

    button.style.right = '5px';
    button.style.top = '50%';
    button.style.transform = 'translateY(-50%)';

    wrap(input, wrapper);
    wrapper.appendChild(button);
  });

  button.onclick = () => {
    inputs.forEach((input) => {
      input.click();
      input.value = password;
    });
  };
};
