---
title: Comment note in Shell Bash
tags:
  - cheatsheet
  - linux
  - command
  - bash
---

*2 ways for writing the comment to shell bash.*

Example and troubleshooting via  [Link to details](https://ioflood.com/blog/bash-comment/)

## Using the `#` character for comment
*In Bash, a comment starts with the hash symbol (#). Anything after # on that line is considered a comment and is ignored by the Bash interpreter*

```bash
# This is a comment in Bash

# Output:
# (No output, as comments are not executed)
```

## Using the doctype `Here Document` for comment multiple line
*Bash doesn’t have a specific syntax for multi-line comments like some other languages, but you can use a trick with the : command and a ‘here document’ to achieve the same effect.*

```bash
: << 'END_COMMENT'
This is a
multi-line comment
in Bash
END_COMMENT

# Output:
# (No output, as comments are not executed)
```
