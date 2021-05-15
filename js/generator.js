const generatePassword = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('passwordLength', (result) => {
      const length = result.passwordLength;
      const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowers = 'abcdefghijklmnopqrstuvwxyz';
      const digits = '0123456789';
      const symbols = '?/!#$_-';
      const nonSymbols = uppers + lowers + digits;

      var symbolsSet = '';
      var nonSymbolsSet = '';

      // 1. Pick at least 2 symbols
      for (
        let i = 0;
        i < Math.floor(Math.random() * (symbols.length - 2 + 1)) + 2;
        i++
      ) {
        symbolsSet += symbols.charAt(
          Math.floor(Math.random() * symbols.length) + 1
        );
      }
      // 2. Pick the rest from alphanumerics
      for (let i = 0; i < length - symbolsSet.length; i++) {
        nonSymbolsSet += (uppers + lowers + digits).charAt(
          Math.floor(Math.random() * nonSymbols.length) + 1
        );
      }
      // 3. Shuffle
      const combined = symbolsSet + nonSymbolsSet;
      var password = combined
        .split('')
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join('');
      return resolve(password);
    });
  });
};
