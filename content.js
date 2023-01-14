let add = document.location.href;
let data = [];
let date = new Date();

// console.log(add +"this is the website link");
// console.log("content script");
chrome.storage.sync.get(["time"], function (r) {
    if (r.time > 0) {
        chrome.storage.sync.get(["number"], function (res) {
            // console.log(res.number);
            // console.log("In history 1");
            if (res.number === undefined || res.number === 0) {
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
    if (result.rate === undefined || result.rate === "never") {
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


(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };

        currentVideoBookmarks = await fetchBookmarks();

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        });
    };

    const newVideoLoaded = async () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

        currentVideoBookmarks = await fetchBookmarks();

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";
            bookmarkBtn.style.overflow = "visible";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName('video-stream')[0];

            if (youtubePlayer != undefined && youtubeLeftControls != undefined) {
                youtubePlayer.style.overflow = "visible";
                youtubeLeftControls.style.overflow = "visible";
                youtubeLeftControls.appendChild(bookmarkBtn);
            }

            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    };

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        } else if (type === "PLAY") {
            youtubePlayer.currentTime = value;
        } else if (type === "DELETE") {
            currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
            chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

            response(currentVideoBookmarks);
        }
    });

    newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);
    return date.toISOString().substring(11, 19);
};


// window.addEventListener('load', (e) => {
//     const box = document.querySelector('.box');
//     const rect = box.getBoundingClientRect();
//     document.addEventListener('mousemove', (e) => {
//     box.style.left = e.pageX + 'px';
//     box.style.top = e.pageY + 'px';
// });
// });

// Meaning of selected word
window.addEventListener("mouseup", wordSelector);

function wordSelector() {
    let check = document.getElementById("addedchild");
    if (check)
        document.body.removeChild(check);
    // console.log("present");

    // console.log("Word selected");
    let selectedText = document.getSelection();
    // const selectedText = window.getSelection();
    let size = 0;
    if (selectedText)
        size = window.getComputedStyle(selectedText.anchorNode.parentElement, null).getPropertyValue('font-size');
    // console.log(size);
    selectedText = selectedText.toString();
    selectedText = selectedText.trim();
    if (selectedText.indexOf(" ") === -1 && selectedText.length > 0) {
        var s = window.getSelection();
        var oRange = s.getRangeAt(0); //get the text range
        var oRect = oRange.getBoundingClientRect();
        // console.log(`(#${s.id})`.offset().top);
        // var scrollLeft = window.scrollLeft();
        // var scrollTop = window.scrollTop();
        var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        // console.log(scrollLeft);
        // console.log(scrollTop);
        // var t = document.getSelection().toString();
        // console.log(selectedText);
        // console.log("next");
        size = size.replace("px", "");
        // console.log(oRect.y);
        // console.log(size);
        // console.log(height);
        var height = oRect.y - size - 6 + scrollTop;
        var side = oRect.x + scrollLeft;
        var node = document.createElement("div");
        node.id = "addedchild";
        node.style.position = "absolute";
        node.style.zIndex = "1";
        node.style.backgroundColor = "pink";
        node.style.color = "black";
        node.style.top = `${height}px`
        node.style.left = `${side}px`
        node.style.borderRadius = "4px";
        node.style.padding = "1px";
        node.style.fontSize = `${size}px`;
        // node.style.transform = `translate(${oRect.x},${oRect.y})`;
        // var url = `https://api.wordnik.com/v4/word.json/${selectedText}/definitions?limit=5&includeRelated=false&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=${getAccessToken}`;
        var url = `https://api.wordnik.com/v4/word.json/${selectedText}/definitions?limit=5&includeRelated=false&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
        async function callingWordDesc(url) {
            const response = await fetch(url);
            var data = await response.json();
            if (data.error) {
                node.innerHTML = "Definition Unavailable"
            }
            // console.log(data);
            // console.log("next");
            else {
                if (data[0].text !== undefined) {
                    // console.log("0");
                    let def = data[0].text;
                    def = def.replace("<xref>", "")
                    def = def.replace("</xref>", "")
                    def = def.replace("<em>", "")
                    def = def.replace("</em>", "")
                    def = def.replace(`<internalXref urlencoded="center">`, "")
                    def = def.replace(`</internalXref>`, "")
                    node.innerHTML = def;
                    // document.body.appendChild(node);
                    // console.log(def);
                } else if (data[1].text) {
                    // console.log("1");
                    let def = data[1].text;
                    def = def.replace("<xref>", "")
                    def = def.replace("</xref>", "")
                    def = def.replace("<em>", "")
                    def = def.replace("</em>", "")
                    def = def.replace(`<internalXref urlencoded="center">`, "")
                    def = def.replace(`</internalXref>`, "")
                    node.innerHTML = def;
                    // document.body.appendChild(node);
                    // console.log(def);
                } else if (data[2].text) {
                    // console.log("2");
                    let def = data[2].text;
                    def = def.replace("<xref>", "")
                    def = def.replace("</xref>", "")
                    def = def.replace("<em>", "")
                    def = def.replace("</em>", "")
                    def = def.replace(`<internalXref urlencoded="center">`, "")
                    def = def.replace(`</internalXref>`, "")
                    node.innerHTML = def;
                    // document.body.appendChild(node);
                    // console.log(def);
                } else if (data[3].text) {
                    // console.log("3");
                    let def = data[3].text;
                    def = def.replace("<xref>", "")
                    def = def.replace("</xref>", "")
                    def = def.replace("<em>", "")
                    def = def.replace("</em>", "")
                    def = def.replace(`<internalXref urlencoded="center">`, "")
                    def = def.replace(`</internalXref>`, "")
                    node.innerHTML = def;
                    // document.body.appendChild(node);
                    // console.log(def);
                    // console.log(data[3].text);
                } else if (data[4].text) {
                    // console.log("4");
                    let def = data[4].text;
                    def = def.replace("<xref>", "")
                    def = def.replace("</xref>", "")
                    def = def.replace("<em>", "")
                    def = def.replace("</em>", "")
                    def = def.replace(`<internalXref urlencoded="center">`, "")
                    def = def.replace(`</internalXref>`, "")
                    node.innerHTML = def;
                } else {
                    node.innerHTML = "Definition Unavailable"
                }
            }
            document.body.appendChild(node);
            // if (node.innerHTML.trim().length == 0) { }
            setTimeout(() => {
                let remDef = document.getElementById("addedchild");
                if (remDef)
                    document.body.removeChild(remDef);
            }, 10000);
            // console.log(selectedText);
        }
        callingWordDesc(url);
    }
    // (function () {

    // loadJSON(url, gotData);
    // function gotData() {

    // }
    // })();
}

// Tracking Mouse for Movement
window.addEventListener("mouseover", mouseMove);

let d = new Date();
function mouseMove() {
    chrome.storage.sync.get(["s"], function (res) {
        d = new Date();
        let hour = d.getHours() + "";
        let min = d.getMinutes() + "";
        let sec = d.getSeconds() + "";
        hour = hour.length > 1 ? hour : "0" + hour;
        min = min.length > 1 ? min : "0" + min;
        sec = sec.length > 1 ? sec : "0" + sec;
        // let s = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        let s = hour + ":" + min + ":" + sec;
        // console.log(s);
        // console.log("0");
        // if(s.split(":")[2] > (os.split(":")[2] + 5)){}
        if (res.s === undefined) {
            // console.log("1");
            chrome.storage.sync.set({ s: s });
        }
        else {
            // console.log("2");
            let os = res.s;
            // console.log(s + " ", os);
            // console.log(s + " " + os);
            // console.log(parseInt(os.split(":")[2]) + 5);
            if (s.split(":")[2] >= (parseInt(os.split(":")[2]) + 6)) {
                // console.log("3");
                chrome.storage.sync.set({ s: s });
            }
            else if (s.split(":")[1] > os.split(":")[1]) {
                // console.log("4");
                chrome.storage.sync.set({ s: s });
            }
            else if (s.split(":")[0] !== os.split(":")[0]) {
                // console.log("5");
                chrome.storage.sync.set({ s: s });
            } else {
                console.log("not 5 sec");
            }
            // if ((s.split(":")[2] > (os.split(":")[2] + 5) || (s.split(":")[1] > (os.split(":")[1]))) && s.split(":")[1] < (os.split(":")[1] + 1)) {
            //     chrome.storage.sync.set({ s: s });
            //     // chrome.storage.sync.set({ s: s });
            //     console.log("chaning");
            // } else {
            //     console.log("Moving");
            // }
        }
    });
    // console.log(s);
    // console.log(s.split(":")[0]);
    // console.log(s.split(":")[1]);
    // console.log(s.split(":")[2]);
    // console.log("Moved");
    // console.log(d.getHours());
    // console.log(d.getMinutes());
    // console.log(d.getSeconds());
}

var intervalId = window.setInterval(function () {
    console.log("called 111");
    // window.alert = function () { };
    // driver.switchTo().alert().dismiss();
    // window.alert = () => false;
    // if(window.alert===true){
    //     console.log("t");
    // }else{
    //     console.log("f");
    // }
    console.log(add);
    console.log("this is link");
    if (add.indexOf("youtube") == -1) {
        console.log("not youtube");
        chrome.storage.sync.get(["s"], function (res) {
            if (res.s === undefined) {
                console.log("not found");
            }
            else {
                chrome.storage.sync.get(["time"], function (r) {
                    if (r.time === undefined);
                    else if (r.time > 0) {
                        console.log("00");
                        let os = res.s;
                        d = new Date();
                        let hour = d.getHours() + "";
                        let min = d.getMinutes() + "";
                        let sec = d.getSeconds() + "";
                        hour = hour.length > 1 ? hour : "0" + hour;
                        console.log(d.getSeconds());
                        min = min.length > 1 ? min : "0" + min;
                        sec = sec.length > 1 ? sec : "0" + sec;
                        let s = hour + ":" + min + ":" + sec;
                        if (s.split(":")[0] !== os.split(":")[0]) {
                            chrome.storage.sync.set({ s: s });
                            console.log("Wake up");
                            alert("wake up");
                            console.log("01");
                            console.log(s + " " + os + "1111");
                            window.close();
                        }
                        else if (s.split(":")[1] >= (parseInt(os.split(":")[1]) + 5)) {
                            chrome.storage.sync.set({ s: s });
                            console.log("Wake up");
                            window.close();
                            alert("wake up");
                            console.log("02");
                            console.log(s + " " + os + "1111");
                        }
                    }
                })
            }
        });
    }
}, 30000);
// chrome.storage.sync.set({ s: "00:00:31" });
// chrome.storage.sync.get(["time"], function (res) {