function demeter() {

    const config = {
        chance: 0.50,
        images: 20,
        random: () => { return Math.floor(Math.random() * config.images) + 1 }
    }

    let images = document.querySelectorAll('image');

    for (const image of images) {
        console.log(image);
        if (Math.random() < config.chance) {
            image.src = `./images/lizard_${config.random()}`;
            image.style.objectFit = 'cover';
            console.log('Image replaced...');
        }
    }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('Switched tab');
    if (chrome.tabs.get(activeInfo.tabId).url?.startsWith("chrome://")) return undefined;
    console.log("Valid tab");
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        function: demeter
    })
})

