const config = {
    chance: 0.50,
    images: 20,
    random: () => { return Math.floor(Math.random() * config.images) + 1 }
}

function demeter() {
    let images = document.querySelectorAll('image');

    for (const image in images) {
        if (Math.random() < config.chance) {
            image.src = `./images/lizard_${config.random()}`;
            image.style.objectFit = 'cover';
            console.log('Image replaced...');
        }
    }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        function: demeter
    })
})

