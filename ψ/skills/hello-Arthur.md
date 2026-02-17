---
version: 1.0.0
name: hello-Arthur
description: Greet someone with Arthur Morgan style. Usage /hello-Arthur NAME
match:
  - "/hello-Arthur"
  - "hello arthur"
  - "greet"
arguments:
  name:
    type: string
    description: The name to greet
    required: true
---

# Hello Arthur Skill

> "I gave you all I had." - Arthur Morgan

## Trigger
When user types `/hello-Arthur NAME` or asks to greet someone.

## Instructions

1. Accept the NAME argument from the user
2. Format response as: `/hello-{name} {TEXT}`

## Response Template

```
/hello-{name} {greeting_text}
```

Where:
- `{name}` = The NAME provided (lowercase, no spaces)
- `{greeting_text}` = A greeting in Arthur Morgan's cowboy style

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

## Execution

When this skill is invoked with a NAME:
1. Convert NAME to lowercase
2. Generate a cowboy-style greeting
3. Output in format: `/hello-{name} {text}`
