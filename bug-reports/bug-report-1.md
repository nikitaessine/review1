# Bug Report

**Title**: Removing a friend hides the possible conversation with the user

**ID**: 01

**Date**: 2024-11-26

**Reported By**: Valtteri Rajalainen

## Description
Removing a friend hides possible previous conversation from the “Conversations”-page.

## To reproduce:
- Login.
- Ensure you have some users as friends.
- Message some user.
- Remove this user from your friends.


## Expected Result
The intuitive behavior would be that any conversation had in the past would show up in the “Conversations”-page, and the user could browse the sent messages.

## Actual Result
When a friend is removed, the possible related conversation is hidden from the “Conversations”-page. The message history cannot be accessed.


## Environment
**OS**: Windows

**Browser**: Chrome 131.0.6778.86

**Device**: Huawei Matebook laptop

**Version**: commit 6666f4a326cfc6915ace30c9f70bae09836250a0


## Severity & Reproducibility

**Severity**: Low

**Reproducibility**: Always
