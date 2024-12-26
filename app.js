document.addEventListener("DOMContentLoaded", () => {
    const contentContainers = document.querySelectorAll(".content-container");
    const scrollContainer = document.getElementById('scrollContainer');

    // Scroll Animation Logic
    function handleScrollAnimations() {
        contentContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100 && rect.bottom >= 0) {
                container.classList.add("visible");
            }
        });
    }

    // Trigger Animation on Load
    handleScrollAnimations();

    // Add Scroll Event Listener for Animations
    document.addEventListener("scroll", handleScrollAnimations);


});


const boxes = document.querySelectorAll('.box');
const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.2 // Trigger when 20% visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

boxes.forEach(box => {
    observer.observe(box);
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzQunyehK92W9z28vyww9pl887mVd598SRc5iTCnxMzD3c-hp6ygFmfgulWz8GlwHIGTg/exec'
const form = document.forms['google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'post', body: new FormData(form) })
        .then(response => alert("klasdjflk"))
        .catch(error => console.error('Error!', error.message))
})

var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()
function intialSetup() {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    scriptProp.setProperty('key', activeSpreadsheet.getId())
}
function doPost(e) {
    var lock = LockService.getScriptLock()
    lock.tryLock(10000)
    try {
        var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
        var sheet = doc.getSheetByName(sheetName)
        I
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
        var nextRow = sheet.getLastRow() + 1
        var newRow = headers.map(function (header) {
            return header === 'timestamp' ? new Date() : e.parameter[header]
        })
        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow })).setMimeType(ContentService.MimeType.JSON)
    }
    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'erroг': е }))
            .setMimeType(ContentService.MimeType.JSON)
    }
    finally {
        lock.releaseLock()
    }
}