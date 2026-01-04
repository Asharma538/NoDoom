const BLOCK_RULE_ID = 1;
const URLS_TO_BLOCK = [
  "*://*.instagram.com/*",
  "*://*.reddit.com/*",
  "*://*.linkedin.com/*",
  "*://*.x.com/*",
  "*://x.com/*",
  "*://*.facebook.com/*",
  "*://*.fbcdn.net/*",         // images, videos
  "*://*.fbsbx.com/*",         // file previews
  "*://*.twitter.com/*",
  "*://*.twimg.com/*",          // X media (images/videos)
  "*://*.tiktok.com/*",
  "*://*.snapchat.com/*",
  "*://*.pinterest.com/*",
  "*://*.youtube.com/*"
];


// Convert URLs to rules
const createRules = () => {
  const rules = URLS_TO_BLOCK.map((url, index) => ({
    id: BLOCK_RULE_ID + index,
    priority: 1,
    action: { type: "block" },
    condition: { 
      urlFilter: url, 
      resourceTypes: ["main_frame"] 
    }
  }));
  return rules;
}

chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with default blocking state
  chrome.storage.sync.get("isBlocking", (data) => {
    if (data.isBlocking === undefined) {
      chrome.storage.sync.set({ isBlocking: true });
    }
  });
  
  chrome.storage.sync.get("isBlocking", (data) => {    
    if (data.isBlocking ?? true) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: createRules(),
        removeRuleIds: URLS_TO_BLOCK.map((_, i) => BLOCK_RULE_ID + i)
      });
    }
  });
});

// Handle redirects to blocked sites
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) { // Main frame only
    chrome.storage.sync.get("isBlocking", (data) => {
      if (!data.isBlocking) return; // If blocking is disabled, do nothing

      const url = details.url;
      const pageIsBlocked = URLS_TO_BLOCK.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*/g, '.*').replace(/\./g, '\\.'));
        return regex.test(url);
      });
      
      if (pageIsBlocked) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL('blocked.html') });
      }
    })
  }
}, {
  url: [
    { hostContains: 'x.com' },
    { hostContains: 'twitter.com' },
    { hostContains: 'youtube.com' },
    // { hostContains: 'instagram.com' },
    // { hostContains: 'facebook.com' },
    // { hostContains: 'reddit.com' },
    // { hostContains: 'linkedin.com' },
    // { hostContains: 'tiktok.com' },
    // { hostContains: 'snapchat.com' },
    // { hostContains: 'pinterest.com' }
  ]
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.isBlocking) {
    const enable = changes.isBlocking.newValue;
    if (enable) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: createRules(),
        removeRuleIds: []
      });
    } else {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [],
        removeRuleIds: URLS_TO_BLOCK.map((_, i) => BLOCK_RULE_ID + i)
      });
    }
  }
});

