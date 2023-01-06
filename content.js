let add = document.location.href;
let data = [];
let date = new Date();

console.log(add);
// console.log("content script");
chrome.storage.sync.get(["time"], function (r) {
    if (r.time > 0) {
        if (add.indexOf("history") == -1) { }
        else {
            alert("Not Allowed");
            document.write("");
        }
        chrome.storage.sync.get(["number"], function (res) {
            // console.log(res.number);
            // console.log("In history 1");
            if (res.number === undefined) {
                // console.log("In history 2");
                data[0] = add;
                chrome.storage.sync.set({ number: 1, history: data }, function () {
                });
            } else {
                // console.log("In history 3");
                chrome.storage.sync.get(["history"], function (result) {
                    data = result.history;
                    if (data.includes(add)) {

                        // console.log("In history 4");
                    }
                    else {
                        // console.log("In history 5");
                        data[res.number] = add;
                        chrome.storage.sync.set({ number: res.number + 1, history: data }, function () {
                            // console.log("In history 6");
                        });
                    }
                    // console.log("In history 7");
                })
            }
        });
    }
})

chrome.storage.sync.get(["rate"], function (result) {
    if (result.rate === undefined) {
        // console.log("Please define the time to block website");
    } else if (result.rate === "never") {
    } else if (result.rate === "all") {
        if (add.indexOf("amazon") == -1 && add.indexOf("netflix") == -1 && add.indexOf("flipkart") == -1 && add.indexOf("myntra") == -1) { }
        else {
            alert("Get back to studies");
            document.write("");
        }
    } else if (result.rate === "study") {
        chrome.storage.sync.get(["time"], function (res) {
            if (res.time === undefined || res.time === 0) { }
            else {
                alert("Get back to studies");
                document.write("");
            }
        });
    } else if (result.rate === "schedule") {
        if (date.getHours() >= 1 && date.getMinutes() >= 30 && date.getHours() <= 4 && date.getMinutes() <= 30) {
            alert("Sleep Time!!")
            document.write = "";
        }
        else {
            try {
                if (add.indexOf("amazon") == -1 && add.indexOf("netflix") == -1 && add.indexOf("flipkart") == -1 && add.indexOf("myntra") == -1) { }
                else {
                    if (date.getDay() === 0)
                        alert("Don't spend much time on this");
                    else if (date.getDay() === 6) {
                        if ((date.getHours() >= 19 && date.getMinutes() >= 30) || (date.getHours() <= 1 && date.getMinutes() <= 30))
                            alert("Don't spend much time on this");
                        else {
                            alert("Get back to studies");
                            document.write("");
                        }
                    } else {
                        if ((date.getHours() >= 21 && date.getMinutes() >= 30) || (date.getHours() <= 1 && date.getMinutes() <= 30))
                            alert("Don't spend much time on this");
                        else {
                            alert("Get back to studies");
                            document.write("");
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
});



