#!/usr/bin/env bun
/**
 * Gemini Slide Creator - Canvas Mode
 *
 * Workflow:
 * 1. Create new Gemini tab
 * 2. Select Canvas mode
 * 3. Send slide prompt
 * 4. Gemini creates slides in Canvas
 */

const MQTT_HOST = "localhost";
const MQTT_PORT = "1883";
const MQTT_TOPIC_CMD = "claude/browser/command";

// Mosquitto paths (Windows)
const MOSQUITTO_PUB = "C:/Program Files/mosquitto/mosquitto_pub.exe";

// Get topic from arguments
const topic = Bun.argv.slice(2).join(" ");

if (!topic) {
  console.log("Usage: create-slide.ts <topic>");
  console.log('Example: create-slide.ts "Arthur Morgan" 5 slides');
  process.exit(1);
}

console.log(`\n🎨 Creating Slides in Canvas Mode: ${topic}\n`);

// Helper to publish MQTT command
async function mqttPub(payload: object): Promise<void> {
  const msg = JSON.stringify(payload);
  const proc = Bun.spawn(
    [MOSQUITTO_PUB, "-h", MQTT_HOST, "-p", MQTT_PORT, "-t", MQTT_TOPIC_CMD, "-m", msg],
    { stdout: "inherit", stderr: "inherit" }
  );
  await proc.exited;
}

const ts = () => Date.now();

// Build the prompt for Canvas
const slidePrompt = `Create a beautiful slide presentation about: ${topic}

Please create this in Canvas with:
- 5 slides with stunning visuals
- Dark theme with elegant styling
- Include relevant quotes
- Beautiful typography and layout
- Each slide should tell part of the story

Create it now in Canvas mode.`;

// Step 1: Create new Gemini tab
console.log("1️⃣ Creating new Gemini tab...");
await mqttPub({
  id: `newtab-${ts()}`,
  action: "create_tab",
  url: "https://gemini.google.com/app",
  ts: ts(),
});
await Bun.sleep(4000);
console.log("   ✓ Tab created");

// Step 2: Select Canvas mode
console.log("2️⃣ Selecting Canvas mode...");
await mqttPub({
  id: `mode-${ts()}`,
  action: "select_mode",
  mode: "Canvas",
  ts: ts(),
});
await Bun.sleep(2000);
console.log("   ✓ Canvas mode selected");

// Step 3: Send slide prompt
console.log("3️⃣ Sending slide prompt...");
await mqttPub({
  id: `chat-${ts()}`,
  action: "chat",
  text: slidePrompt,
  ts: ts(),
});
await Bun.sleep(1000);
console.log("   ✓ Prompt sent");

console.log(`
🎉 Slide creation started in Canvas!

📺 Check your Gemini tab - Canvas should be creating your slides.
✏️  You can edit the slides directly in Canvas.
💾 Export when ready.

Topic: ${topic}
`);
