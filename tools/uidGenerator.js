/* exported generateUid_ MD5_ */

/**
 *
 * @param {date} datetime
 */
function generateUid_(datetime, prefix) {
    prefix = prefix || '';
    return prefix + '-' + md5_(datetime.getTime(), true);
  }
  
  function md5_(input, isShortMode) {
    var txtHash = '';
    var rawHash = Utilities.computeDigest(
      Utilities.DigestAlgorithm.MD5,
      input,
      Utilities.Charset.UTF_8
    );
  
    isShortMode = !!isShortMode;
  
    if (!isShortMode) {
      for (var i = 0; i < rawHash.length; i++) {
        var hashVal = rawHash[i];
  
        if (hashVal < 0) {
          hashVal += 256;
        }
        if (hashVal.toString(16).length == 1) {
          txtHash += '0';
        }
        txtHash += hashVal.toString(16);
      }
    } else {
      for (var j = 0; j < 16; j += 8) {
        hashVal =
          (rawHash[j] + rawHash[j + 1] + rawHash[j + 2] + rawHash[j + 3]) ^
          (rawHash[j + 4] + rawHash[j + 5] + rawHash[j + 6] + rawHash[j + 7]);
  
        if (hashVal < 0) {
          hashVal += 1024;
        }
        if (hashVal.toString(36).length == 1) {
          txtHash += '0';
        }
  
        txtHash += hashVal.toString(36);
      }
    }
  
    return txtHash.toUpperCase();
  }
  