function getTabIds(isRight, currentTab, tabs) {
    var ids = [];
    tabs.forEach(function (tab) {
        if (
            (isRight && tab.index > currentTab.index)
            ||
            (!isRight && tab.id !== currentTab.id)
        ) {
            ids.push(tab.id);
        }
    });
    return ids;
}

function getTabs(isRight, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
        chrome.tabs.getAllInWindow(tab[0].windowId, function (tabs) {
            callback(getTabIds(isRight, tab[0], tabs));   
        });
    });
}

document.getElementById('other').onclick = function () {
    getTabs(false, function (tabs) {
        console.log(tabs);
        chrome.tabs.remove(tabs);
    });
}
document.getElementById('right').onclick = function () {
    getTabs(true, function (tabs) {
        console.log(tabs);
        chrome.tabs.remove(tabs);
    });
}