// Callback function for context menu click
function onClickHandler(info, tab) {
    var btc = info.selectionText;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {

        var resp = JSON.parse(xhr.responseText);

        var usdRate = resp.bpi.USD.rate;
        var usdValue = btc * usdRate;

        alert(btc + " BTC is $" + usdValue.toFixed(2) + ".");
      }
    }
    xhr.send();
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
    var title = "Convert BTC to USD";
    var context = "selection";
    var id = chrome.contextMenus.create({"title": title, "contexts": [context],
                                         "id": "context" + context});
});
