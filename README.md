# ditto

Identity manager app in react native

# Testing deep-links

This is a work in progress (and very much so). All parameters must be URI-encoded, the app will decode them.

## on iOS

Run:

    xcrun simctl openurl booted ditto://consent/foo/bar?challenge=baz&fields=huey,dewey,louie

## on Android

Run:

    adb shell am start -W -a android.intent.action.VIEW -d 'ditto://consent/foo/bar?challenge=baz\&fields=huey,dewey,louie

Note the backslash before the ampersand symbol => `\&fields`. It's needed by `adb` to correctly parse the query string.
