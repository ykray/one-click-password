const handleClick = (info, tab) => {
  generatePassword().then((password) => {
    chrome.tabs.sendMessage(tab.id, { generatedPassword: password });
  });
};

chrome.contextMenus.create({
  title: 'Generate password',
  contexts: ['editable'],
  onclick: handleClick,
});

chrome.runtime.onInstalled.addListener((details) => {
  // Set default settings on install
  if (details.reason == 'install') {
    chrome.storage.sync.set({ passwordLength: 20 });
  }
});
