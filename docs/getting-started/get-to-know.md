---
sidebar_position: 2
---

# Get to Know XYO
The following examples offer a preview at just how easy XYO can be. Explore a Node, learn some of the basic XYO vocabulary, and review some resources that can take you where you need to be.

## Your first node

The following CodeSandbox demonstrates an XYO Node.

A Node is a container that house Sentinels, Bridges, Archivists, and Diviners. (More on those, next!) 

Right now, the `Node` is empty and has a custom name. Try editing `"YOUR-NODE-NAME"` and see what happens!

<iframe src="https://codesandbox.io/embed/exercise-1-xyo-documentation-rivjgc?codemirror=1&fontsize=14&hidenavigation=1&theme=dark&hidedevtools=1"
className="code-sandbox-div"
     title="Exercise 1 XYO Documentation"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   
Next, try uncommenting the following lines of code:

**Line 14:** `// ,MemoryArchivist: "StorageForSystemInfoWitnessData",`

**Line 17:** `// SystemInfoWitness: "WitnessCurrentSystemInformation",`

**Line 20:** `// Bridge: "BridgeToPublicXyoNode",`

 _Tip: All Modules in "yourModules" need a comma between them. Keep the leading comma in the Archivist Module line, otherwise you'll receive a bug!_

1. `Archivist` — An Archivist stores Bound Witness and Payload data. Learn more [here](/glossary#archivist).
2. `Witness` — A Witness captures real-world data. Learn more [here](/glossary#witness).
3. `Bridge` — A Bridge serves as a connection between different nodes. Learn more [here](/glossary#bridge).

A few other useful words to learn:

[TODO - Glossary Definition Variables]

1. `Sentinel` — [TODO]
2. `Diviner` — [TODO]

Need a quick reminder on what's what? The [Glossary](/glossary) can help you out!


## Exercises
We've created a few more [exercises](/getting-started/exercises) to teach you more about ways you can implement XYO.

## Demos
Explore our demos on [xyo.network](https://xyo.network/dapp) or on our GitHub.

## Glossary
Need a quick reminder on what's what? The [Glossary](/glossary) can help you out!