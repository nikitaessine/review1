# Testing plan

**Project Name**: bunnybook

**Version/Release**: commit 6666f4a326cfc6915ace30c9f70bae09836250a0

**Date**: 2024-11-26

**Tester(s)**: Valtteri Rajalainen


## Testing Objective
- Ensure the key functionalities work as specified.
- Ensure the overall quality is good enough for showcasing publicly.


## Test Environment
**Hardware Specifications**: Huawei matebook laptop, x64 processor.

**Operating System**: Windows, running Docker Desktop.

**Software/Dependencies**: As specified in Dockerfile.

**Browser**: Google Chrome, version 131.0.6778.86


## Test Scope
### In-Scope Items:
- Registering.
- Login.
- Logout.
- Adding friends.
- Removing friends.
- Creating public posts on the user’s wall.
- Creating public posts on another user’s wall.
- Creating posts for friends on the user’s wall.
- Creating posts for friends on another user’s wall.
- Commenting on posts.
- Chatting with friends.
- Notifications.

### Out-of-Scope Items:
- Profile picture generation.
- Typing indication in chat.
- Online status indication.
- All security related items.
- Other functionality not mentioned in “In-Scope Items”.


## Defects found
- Removing a friend hides the possible conversation with the user. See related bug report from attachment:  `bug-report-1.md`.
- On a small screen the chat windows are hidden from view. See related bug report from attachment: `bug-report-2.md`.
- Application layout does not work for mobile devices. See related bug report from attachment: `bug-report-3.md`.


## Notes for further testing
Security related items must be addressed before hosting the application publicly.
