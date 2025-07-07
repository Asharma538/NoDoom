# No Doom - Social Media Blocker

A Chrome extension that blocks access to popular social media sites to help improve productivity and focus.

## Overview

No Doom is a browser extension designed to block distracting social media websites. When blocking is enabled, attempts to visit blocked sites will redirect users to a blocked page instead, helping maintain focus during work or study sessions.

## Features

- **Toggle Blocking**: Easy on/off switch via popup interface
- **Multiple Platform Support**: Blocks major social media platforms including:
  - Instagram
  - Reddit
  - LinkedIn
  - Facebook
  - X (formerly Twitter)
  - TikTok
  - Pinterest
- **Persistent Settings**: Blocking state is saved and restored across browser sessions
- **Clean Interface**: Simple popup with toggle button
- **Immediate Effect**: Changes take effect immediately without requiring page refresh

## Installation

### From Source

- Newer version is coming soon (current version link: https://chromewebstore.google.com/detail/mfokcfcclncbcoofbapojlnhmmcmhgig?utm_source=item-share-cb)

### Usage

1. Click the No Doom icon in your browser toolbar
2. Use the toggle button to enable or disable blocking
3. When blocking is enabled, visiting blocked sites will show a blocked page
4. When blocking is disabled, all sites function normally

## Technical Details

### Architecture

The extension uses Chrome's Manifest V3 architecture with:

- **Service Worker**: `background.js` handles the core blocking logic
- **Declarative Net Request API**: Efficiently blocks network requests to social media domains
- **Web Navigation API**: Handles redirects for blocked sites
- **Storage API**: Persists user preferences

### File Structure

```
nodoom/
├── manifest.json          # Extension configuration
├── background.js          # Service worker with blocking logic
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── blocked.html          # Page shown when sites are blocked
├── icon.png              # Extension icon
└── README.md             # This file
```

### Permissions

The extension requires the following permissions:

- `declarativeNetRequest`: Block network requests to social media sites
- `declarativeNetRequestWithHostAccess`: Access to modify requests for specified hosts
- `storage`: Save user preferences
- `tabs`: Update tab URLs when redirecting
- `webNavigation`: Monitor navigation events for blocking

## Configuration

### Adding New Sites

To block additional websites, modify the `URLS_TO_BLOCK` array in `background.js`:

```javascript
const URLS_TO_BLOCK = [
  // Add new patterns here
  "*://*.example.com/*"
];
```

Also add corresponding host permissions to `manifest.json`:

```json
"host_permissions": [
  "*://*.example.com/*"
]
```

### Modifying Block Behavior

The extension currently blocks main frame requests only. To modify this behavior, edit the `resourceTypes` in the `createRules()` function within `background.js`.

## Development

### Prerequisites

- Chrome browser (version 88 or higher for Manifest V3 support)
- Basic knowledge of JavaScript and Chrome Extension APIs

### Testing

1. Load the extension in developer mode
2. Test blocking functionality by visiting blocked sites
3. Verify toggle functionality works correctly
4. Check that settings persist across browser restarts

### Building

This extension doesn't require a build process. All files can be loaded directly into Chrome as an unpacked extension.

## Version History

- **1.1.0**: Current version with full blocking functionality
- Support for major social media platforms
- Toggle interface for easy control
- Persistent settings storage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Please check the repository for license details.

## Support

For issues or feature requests, please create an issue in the project repository.

## Privacy

This extension:
- Does not collect or transmit any personal data
- Only stores blocking preferences locally
- Does not track browsing history
- Functions entirely offline after installation
