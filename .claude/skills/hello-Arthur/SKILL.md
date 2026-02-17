---
name: hello-Arthur
description: Greet someone with Arthur Morgan style. Usage /hello-Arthur NAME
---

# Hello Arthur Skill

> "I gave you all I had." - Arthur Morgan

## Instructions

When user invokes `/hello-Arthur NAME`:

1. Take the NAME argument: `$ARGUMENTS`
2. Convert name to lowercase
3. Respond with a cowboy-style greeting in this format:

```
/hello-{name} {greeting_text}
```

## Examples

**Input:** `/hello-Arthur John`
**Output:**
```
/hello-john Howdy partner, Arthur Morgan here. I gave you all I had.
```

**Input:** `/hello-Arthur Adam`
**Output:**
```
/hello-adam Hey there friend, name's Arthur. We're more ghosts than people.
```

## Greeting Style

Use Arthur Morgan quotes and cowboy language:
- "Howdy partner"
- "Hey there friend"
- "I gave you all I had"
- "We're more ghosts than people"
- "You're alright, boah"
