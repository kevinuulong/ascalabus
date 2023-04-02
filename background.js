const config = {
    // Don't try to change any images on pages that match these patterns
    forbidden: [
        "chrome://",
        "chrome-extension://",
        ".myschoolapp.com/"
    ]
}

function demeter() {

    const config = {
        // If the month is April there should be an increasing chance as the month goes on of an image being replaced.
        // This also turns off the replacing functionally for other months.
        chance: () => { return ((new Date()).getMonth() === 3) ? (new Date()).getDate() / 30 : 0.00; },
        images: 33,
        // Choose a random image number
        random: () => { return Math.floor(Math.random() * config.images) + 1; }
    }

    // Get only image elements
    // NOTE: I don't really want to deal with background images so just grabbing <img> elements should be fine
    let images = document.querySelectorAll('img');

    for (const image of images) {
        // Only change a percent of the images on the page
        if (Math.random() < config.chance()) {
            // Choose a random image
            let src = chrome.runtime.getURL(`/images/lizard_${config.random()}.jpg`);
            // Set the image src and make sure it fits properly-ish
            image.src = src;
            image.style.objectFit = 'cover';
            // Handle images using the srcset attribute
            if (image.srcset) {
                image.setAttribute('srcset', src);
            }
        }
    }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    // Get the tab URL
    let url = await chrome.tabs.get(tabId).then((tab) => tab.url);
    // Check if it is not a forbidden page
    if (!config.forbidden.some((string) => url?.includes(string))) {
        // Change the page only when it is loading
        if (changeInfo.status == 'loading') {
            // Inject the script
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: demeter
            })
        }
    }
})

