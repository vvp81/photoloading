/* global generateUid_ */
/* exported doGet include_ */

// Папка для загрузки изображений
var PHOTO_FOLDER_ID = '1whY3dkVqiT5fCXypVNZ04wqhZGEWpyyzlfgYjmgnrGw';
// Таблица для сохрания ID фотографий
var PHOTO_SPREADSHEET_ID = '1QVm0L7BRxk7WBd-pPMeCYvBaqz7B82M6d6cd2K7ntpw';

/**
 *
 * @param {GoogleAppsScript.Events.DoGet} e
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('app')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 *
 * @param {string} filename
 */
function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* exported uploadFiles */
/**
 *
 * @param {string} base64string
 */
function uploadFiles(base64string) {
  var code = generateUid_(new Date(), 'Q');
  try {
    var folder = DriveApp.getFolderById(PHOTO_FOLDER_ID);
    var base64 = base64string.slice(base64string.indexOf('base64,') + 7);
    var decoded = Utilities.base64Decode(base64);
    var blob = Utilities.newBlob(decoded);
    blob.setName(code);
    var file = folder.createFile(blob);
    var url = file.getUrl();
    try {
      SpreadsheetApp.openById(PHOTO_SPREADSHEET_ID)
                    .appendRow([code, new Date(), url]);
    } catch (error) {
      console.error(error.message, error.stack);
    }
    return code;
  } catch (e) {
    return e.toString() + e.stack.toString();
  }
}
