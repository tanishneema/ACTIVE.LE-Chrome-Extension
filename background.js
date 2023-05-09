let uninstallURL = "https://docs.google.com/forms/d/e/1FAIpQLSfbJAQhkePgwqwNoSeRD1elsOyUgWwY6flN18itX515-8Q80A/viewform?usp=sf_link";
// let installURL = "http://127.0.0.1:5500/install.html";
let installURL = "file:///C:/Users/tneem/Documents/Projects/Chrome%20Extension/try/install.html";
// let updateURL = "http://127.0.0.1:5500/update.html";
let updateURL = "file:///C:/Users/tneem/Documents/Projects/Chrome%20Extension/try/update.html";

// New chrome page on unintsall
chrome.runtime.setUninstallURL(uninstallURL, () => { });

// IMPORTANT CODE           ↓↓↓↓
// SHOULD NOT BE DELETED    ↓↓↓↓

// New chrome page on install or update
let installReason = (detail) => {
    console.log(detail);
    if (detail.reason === "install") {
        chrome.tabs.create({
            url: installURL
        })
    } else if (detail.reason === "update") {
        chrome.notifications.create({
            title: 'ACTIVE.LE',
            message: 'ACTIVE.LE got updated',
            iconUrl: 'assets/logo.png',
            type: 'basic'
        });
        chrome.notifications.onClicked.addListener(onClickedNotification);
    }
};

function onClickedNotification() {
    
    chrome.tabs.create({
        url: updateURL
    });
}

chrome.runtime.onInstalled.addListener((details) => {
    installReason(details);
});

chrome.runtime.onMessage
// IMPORTANT CODE           ↑↑↑↑
// SHOULD NOT BE DELETED    ↑↑↑↑



// let studyTime = 1.0;

// Water Reminder function
function dr() {
    chrome.alarms.create("Water", { delayInMinutes: 0.0 });
}

function drinkwater() {
    chrome.alarms.create("Water", { delayInMinutes: 30.0 });
}

dr();

// let temp = true;
// function notifer() {
//     setTimeout(() => {
//         try {
//             chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//                 if (tab.url?.startsWith("chrome://")) return undefined;
//                     if (tab.url.indexOf("amazon") == -1 && tab.url.indexOf("netflix") == -1 && tab.url.indexOf("flipkart") == -1) {
//                     }
//                     else {
//                     }
//             })
//         } catch (e) {
//             console.log(e);
//         }
//         notifer();
//     }, 100);
// }

// Study Timer
function createAlarm(time) {
    // try {
    //     chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //         if (tab.url?.startsWith("chrome://")) return undefined;
    //         if (changeInfo.status == 'complete') {
    //             if (tab.url.indexOf("amazon") == -1 && tab.url.indexOf("netflix") == -1 && tab.url.indexOf("flipkart") == -1) {
    //             }
    //             else {
    //                 alert("Focus on your studies");
    //                 // console.log("called focus");
    //                 // chrome.alarms.create("Focus", { delayInMinutes: 0.1 });
    //                 // chrome.scripting.executeScript({
    //                 //     files: ['content.js'],
    //                 //     target: { tabId: tab.id }
    //                 // }, () => chrome.runtime.lastError);
    //             }
    //         }
    //     })
    // } catch (e) {
    //     console.log(e);
    // }
    // temp = 1;
    console.log("bg js time " + time);
    chrome.alarms.create("Study", { delayInMinutes: time });
    // notifer();
}

// User Request for Creating/Deleting an Alarm 
chrome.runtime.onMessage.addListener(
    function (req, sender, sendResponse) {
        if (req.time === 0) {
            // try {
            //     chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            // if (changeInfo.status == 'complete') {
            //     if (tab.url.indexOf("amazon") == -1 && tab.url.indexOf("netflix") == -1 && tab.url.indexOf("flipkart") == -1) {
            //     }
            //     else {
            // const tabId = getTabId();

            // function removejscssfile(filename, filetype) {
            //     var targetelement = "script";
            //     var targetattr = "src";
            //     var allsuspects = document.getElementsByTagName(targetelement)
            //     for (var i = allsuspects.length; i >= 0; i--) {
            //         if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            //             allsuspects[i].parentNode.removeChild(allsuspects[i])
            //     }
            // }
            // removejscssfile("content.js", "js")
            // removejscssfile("content.js", "js")

            // chrome.scripting.executeScript({
            //     files: ['contentR.js'],
            //     target: { tabId: tab.id }
            // }, () => chrome.runtime.lastError);
            // }
            // }
            //     })
            // } catch (e) {
            //     console.log(e);
            // }
            // temp = 0;
            // console.log("Removing Alarm");
            studyTime = req.time * 1.0;
            chrome.alarms.clearAll(
                createAlarm ? () => { return true; } : () => { return false; }
            );
            // t = 0;
            // drinkwater();
            sendResponse({ success: true });
        }
        else {
            // console.log("Placing Alarm");
            var studyTime = req.time * 1.0;
            console.log("studyTime: " + studyTime);
            createAlarm(studyTime);
            sendResponse({ success: true });
        }
    }
);

// Chrome alarm function
chrome.alarms.onAlarm.addListener(function (alarm) {
    // console.log(alarm.name);
    if (alarm.name == "Study") {
        console.log("Alarm received");
        chrome.notifications.create('Reminder', {
            type: 'basic',
            iconUrl: 'assets/logo.png',
            title: 'Break Time',
            message: 'Achivement completed. You successfully completed the study task. Take a break.'
        }, function (notificationId) {
            // temp = false;
            chrome.storage.sync.set({ time: 0 }, function () {
                // change(0);
            });
            console.log("Alarm completed");
        });
    }

    if (alarm.name == "Water") {
        chrome.notifications.create('Reminder', {
            type: 'basic',
            iconUrl: 'assets/logo.png',
            title: 'Drink Water',
            message: 'Time to drink water. I will remind you again in 30 mins'
        }, function (notificationId) {
            drinkwater();
            // console.log(notificationId);
        });
    }
});

// Omnibox
chrome.omnibox.onInputStarted.addListener(function () {
    chrome.omnibox.setDefaultSuggestion({ description: "Search on google" });
})

chrome.omnibox.onInputEntered.addListener(function (text) {
    if (text.indexOf("https") == -1) {
        const link = "https://www.google.com/search?q=" + text;
        chrome.tabs.create({ url: link });
    } else
        chrome.tabs.create({ url: text });
})

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    // console.log(text);
    var suggestions = [];
    suggestions.push({ deletable: true, content: "https://www.reddit.com/search/?q=" + text, description: '(Reddit) ' + text });
    suggestions.push({ deletable: true, content: "https://twitter.com/search?q=" + text + "&src=typed_query", description: '(Twitter) ' + text });
    suggestions.push({ deletable: true, content: "https://www.youtube.com/results?search_query=" + text, description: '(Youtube) ' + text });
    suggestions.push({ deletable: true, content: "https://en.wikipedia.org/wiki/" + text, description: '(Wikipedia) ' + text });
    suggestions.push({ deletable: true, content: "https://news.google.com/search?q=" + text + "&hl=en-IN&gl=IN&ceid=IN%3Aen", description: '(Google News) ' + text });
    suggestions.push({ deletable: true, content: "https://www.amazon.in/s?k=" + text, description: '(Amazon) ' + text });
    suggest(suggestions);
})

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v"),
        });
    }
});


// createAlarm();


// try {
//     chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//         if (changeInfo.status == 'complete') {
//             if (tab.url.indexOf("amazon") == -1 && tab.url.indexOf("netflix") == -1 && tab.url.indexOf("flipkart") == -1) {
//             }
//             else {
//                 chrome.scripting.executeScript({
//                     files: ['content.js'],
//                     target: { tabId: tab.id }
//                 });
//             }
//         }
//     })
// } catch (e) {
//     console.log(e);
// }



// TRY (WRONG )

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     // alert(changeInfo.url);
//     let name = changeInfo.url;
//     if (name.indexOf("netflix") !== -1) {
//         chrome.scripting.exceuteScript({
//             files: ['content.js'],
//             target: { tabId: tab.id }
//         });
//         console.log("got it" + changeInfo.url + "  aaaaa  " + name);
//     }
//     else
//         console.log("nothing");
//     console.log(changeInfo.url);
// });

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//     // how to fetch tab url using activeInfo.tabid
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//         chrome.scripting.executeScript({
//             files: ['content.js'],
//             target: { tabId: tab.id }
//         });
//         console.log(tab.url + " 12 ka 4 4 2 ka 1");
//     });
// }); 