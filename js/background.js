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
// Set default settings on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == 'install') {
    chrome.storage.sync.set({ passwordLength: 20 });
  }
});
