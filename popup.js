const toggleBtn = document.getElementById("toggleBtn");

chrome.storage.sync.get("isBlocking", (data) => {
  const isBlocking = data.isBlocking ?? true;
  updateBtn(isBlocking);
});

toggleBtn.addEventListener("click", () => {
  chrome.storage.sync.get("isBlocking", (data) => {
    const newState = !(data.isBlocking ?? true);
    chrome.storage.sync.set({ isBlocking: newState }, () => {
      updateBtn(newState);
    });
  });
});

function updateBtn(state) {
  toggleBtn.textContent = state ? "Disable Blocking" : "Enable Blocking";
  toggleBtn.style.backgroundColor = state ? "#ff4d4d" : "#4CAF50";
  toggleBtn.style.color = "#fff";
}
