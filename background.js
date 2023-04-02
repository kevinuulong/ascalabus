function demeter() {
    const config = {
        chance: 0.50,
        images: 33,
        random: () => { return Math.floor(Math.random() * config.images) + 1 }
    }

    let images = document.querySelectorAll('img');

    for (const image of images) {
        if (Math.random() < config.chance) {
            let src = chrome.runtime.getURL(`/images/lizard_${config.random()}.jpg`);
            image.src = src;
            image.style.objectFit = 'cover';
            if (image.srcset) {
                image.setAttribute('srcset', src);
            }
        }
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (!chrome.tabs.get(tabId).url?.startsWith("chrome://")) {
        if (changeInfo.status == 'loading') {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: demeter
            })
        }
    }
})

