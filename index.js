// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//     if (
//         e.key === "F12" ||
//         ctrlShiftKey(e, 'I') ||
//         ctrlShiftKey(e, 'J') ||
//         ctrlShiftKey(e, 'C') ||
//         (e.ctrlKey && e.key === 'U')
//     )
//         return false;
// };

chrome.storage.sync.get(["name"], function (result) {
    if (result.name === undefined) {
    } else {
        chrome.storage.sync.get(["rate"], function (res) {
            if (res.rate === undefined) {
                document.getElementById("timming").style.display = "block";
                document.getElementById("intro").style.display = "none";
            } else {
                document.getElementById("intro").style.display = "none";
                document.getElementById("timming").style.display = "none";
                document.getElementById("reset").style.display = "inline-block";
                document.getElementById("fpassword").style.display = "inline-block";
                document.getElementById("option").style.display = "inline-block";
                document.getElementById("working").style.display = "block";
                document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
                // alert("Wrong Answer");
            }
        });
        // document.getElementById("reset").style.display = "inline-block";
        // document.getElementById("fpassword").style.display = "inline-block";
        // document.getElementById("option").style.display = "inline-block";
        // document.getElementById("working").style.display = "block";
        // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
    }
    // console.log(result);
});

// Taking name input 
// let submitName = document.getElementById('subName');
document.getElementById('nameInput').addEventListener("keyup", changeName);
document.getElementById('passInput').addEventListener("keyup", changeName);
document.getElementById('conPassInput').addEventListener("keyup", changeName);
document.getElementById('secque').addEventListener("keyup", changeName);
document.getElementById('ans').addEventListener("keyup", changeName);

let checkName = document.getElementById('nameInput');
checkName.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let pass = document.getElementById('passInput');
pass.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let conpass = document.getElementById('conPassInput');
conpass.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let ques = document.getElementById('secque');
ques.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let answ = document.getElementById('ans');
answ.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

function track() {
    var name = document.getElementById('nameInput').value;
    var pass = document.getElementById('passInput').value;
    var conpass = document.getElementById('conPassInput').value;
    var ques = document.getElementById('secque').value;
    var ans = document.getElementById('ans').value;
    if (name.trim().length > 0 && name.trim().length < 8)
        if (pass.trim().length > 0 && pass.trim().length < 8)
            if (conpass.trim().length > 0 && pass == conpass)
                if (ques.trim().length > 0 && ques.trim().length < 20)
                    if (ans.trim().length > 0 && ans.trim().length < 10)
                        return true;
    //                 else
    //                     return false;
    //             else
    //                 return false;
    //         else
    //             return false;
    //     else
    //         return false;
    // else
    return false;
}

function changeName() {
    if (track()) {
        // var name = document.getElementById('nameInput').value;
        // var pass = document.getElementById('passInput').value;
        // var conpass = document.getElementById('conPassInput').value;
        // var ques = document.getElementById('secque').value;
        // var ans = document.getElementById('ans').value;
        // if (name.trim() === "")
        // document.getElementById("subName").style.display = "none";
        // else
        document.getElementById("subName").style.display = "block";

    }
    else
        document.getElementById("subName").style.display = "none";
}

document.getElementById('subName').addEventListener("click", saveName);

function saveName() {
    var name = document.getElementById('nameInput').value;
    name = name.trim();
    var pass = document.getElementById('passInput').value;
    pass = pass.trim();
    var ques = document.getElementById('secque').value;
    ques = ques.trim();
    var ans = document.getElementById('ans').value;
    ans = ans.trim();
    const n = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    chrome.storage.sync.set({ name: n, password: pass, question: ques, answer: ans }, function () {
        document.getElementById("timming").style.display = "block";

        // document.getElementById("reset").style.display = "inline-block";
        // document.getElementById("fpassword").style.display = "inline-block";
        // document.getElementById("option").style.display = "inline-block";
        document.getElementById("intro").style.display = "none";
        // document.getElementById("working").style.display = "block";
        // document.getElementById("greet").innerHTML = "Hello " + name + ", it's time to study.";
        // chrome.tabs.create({ url: "options.html" });
    });
}

// Working with alarms 
let time = 0;
let input = document.getElementById('hours');

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter')
        setReminder();
});

function change(time) {
    // console.log(time);
    // chrome.storage.sync.get(["time"], function (result) {
    //     console.log(result.time);
    // })
    if (time > 0) {
        const re = document.getElementById("remove");
        re.style.display = "block";
        const ad = document.getElementById("add");
        ad.style.display = "none";
        const h = document.getElementById("hours");
        h.style.display = "none";
        chrome.runtime.sendMessage({ time }, function (res) {
            // console.log(res);
        });
        // console.log("w0");
        setTimeout(() => {
            // console.log(time + "waiting");
            // console.log("w1");
            time = 0;
            chrome.storage.sync.set({ time: time }, function () {
                // console.log("w2");
                change(0);
            });
            // console.log("w3");
        }, time * 60000);
        // console.log("w4");
    } else {
        // console.log("w5");
        const ad = document.getElementById("add");
        ad.style.display = "block";
        const h = document.getElementById("hours");
        h.style.display = "block";
        const re = document.getElementById("remove");
        re.style.display = "none";
    }
}

document.getElementById('add').addEventListener("click", setReminder);

function setReminder() {
    time = parseInt(document.getElementById('hours').value);
    document.getElementById('hours').value = "";
    if (isNaN(time)) {
        alert("Not a number.")
        // } else if (time > 240) {
        //     alert("Talk sense.")
        // }
        // else if (time < 25) {
        //     alert("Let it be. Dont sit for study.")
    } else {
        chrome.storage.sync.set({ time: time, number: 0, history: [] }, function () {
            change(time);
        });
        // setTimeout(() => {
        //     const ad = document.getElementById("add");
        //     ad.style.display = "block";
        //     h.style.display = "block";
        //     const h = document.getElementById("hours");
        //     const re = document.getElementById("remove");
        //     re.style.display = "none";
        // }, 5000);
    }
}

document.getElementById('remove').addEventListener("click", removeReminder);

function removeReminder() {
    chrome.storage.sync.get(["password"], function (result) {
        if (result.password === undefined) {
            alert("Caught in some errors.");
        }
        else {
            let pass = prompt('Enter Password');
            if (pass === result.password) {
                time = 0;
                chrome.storage.sync.set({ time: time }, function () {
                    change(time);
                });
                document.getElementById('hours').value = "";
                chrome.runtime.sendMessage({ time }, function (res) {
                    // console.log(res);
                });
            }
            else {
                alert("Wrong Password.");
            }
        }
        // change(result.time);
    });

}

chrome.storage.sync.get(["time"], function (result) {
    if (result.time === undefined)
        change(0);
    else
        change(result.time);
});
// change(time);

// Resetting
document.getElementById('reset').addEventListener("click", resetting);

function resetting() {
    let pass = prompt('Enter Password');
    chrome.storage.sync.get(["password"], function (result) {
        if (result.password === undefined) {
            alert("Something went wrong.");
            chrome.storage.sync.clear();
            // chrome.runtime.reload();
            window.close();
        }
        if (result.password === pass) {
            chrome.storage.sync.clear();
            // chrome.runtime.reload();
            window.close();
        }
        else {
            alert("Wrong Password");
        }
        // change(result.time);
    });
    // chrome.runtime.openOptionsPage();
}

document.getElementById('fpassword').addEventListener("click", passForgot);
// Forgot Password

function passForgot() {
    chrome.storage.sync.get(["question"], function (result) {
        let ans = prompt("Question: " + result.question);
        chrome.storage.sync.get(["answer"], function (res) {
            if (res.answer === ans) {
                chrome.storage.sync.clear();
                // chrome.runtime.reload();
                window.close();
            } else {
                alert("Wrong Answer");
            }
        });

    });
    // let bar = confirm('Confirm or deny');
    // console.log(foo, bar);
    // chrome.storage.sync.clear();
    // chrome.runtime.reload();
    // chrome.runtime.openOptionsPage();
}

// Option Page
document.getElementById('option').addEventListener("click", optionpage);

function optionpage() {
    // chrome.storage.sync.clear();
    // chrome.runtime.reload();
    chrome.runtime.openOptionsPage();
}

// Setting up when to block websites
document.getElementById('savetime').addEventListener("click", blocking);

function blocking() {
    let rate = document.querySelector('input[name="rate"]:checked').value;
    chrome.storage.sync.set({ rate: rate }, function () {
        // chrome.runtime.reload();
        window.close();
        document.getElementById("timming").style.display = "none";
        document.getElementById("reset").style.display = "inline-block";
        document.getElementById("fpassword").style.display = "inline-block";
        document.getElementById("option").style.display = "inline-block";
        document.getElementById("working").style.display = "block";
        document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
        // alert(rate);
    });
}