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
        var height = oRect.y - size - 6 + scrollTop;
        // console.log(oRect.y);
        // console.log(size);
        // console.log(height);
        var side = oRect.x + scrollLeft;
        var node = document.createElement("div");
        node.id = "addedchild";
        node.style.position = "absolute";
        node.style.zIndex = "1";
        node.style.backgroundColor = "pink";
        node.style.color = "black";
        // node.innerHTML = selectedText;
        node.style.top = `${height}px`
        node.style.left = `${side}px`
        node.style.borderRadius = "4px";
        node.style.padding = "1px";
        node.style.fontSize = `${size}px`;
        // node.style.transform = `translate(${oRect.x},${oRect.y})`;
        // var url = `TEMPORARY/${selectedText}`;
        var url = `https://api.wordnik.com/v4/word.json/${selectedText}/definitions?limit=5&includeRelated=false&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
        async function callingWordDesc(url) {
            const response = await fetch(url);
            var data = await response.json();
            // console.log(data);
            // console.log("next");
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
                document.body.appendChild(node);
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
                document.body.appendChild(node);
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
                document.body.appendChild(node);
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
                document.body.appendChild(node);
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
                document.body.appendChild(node);
            }
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