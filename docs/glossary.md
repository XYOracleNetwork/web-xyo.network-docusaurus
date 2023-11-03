---
sidebar_position: 6
---

# Glossary
Looking for a quick reminder on definitions or usages for XYO technology? You're in the right place.

(Glossary expansion coming soon! 🚧)

<!-- [TODO] — Complete the Glossary -->
<!-- [Maryann] — Add any words here you've seen questions about (or have a question about yourself!) -->

## Node
**A Node is a collection of modules.**

Node modules provide scoping, so you can easily create public and private collections of modules. With a Node, you can also desgn unique collections with very specific access inclusions and exclusion. This scoping is key to organization, as well as sovereignty for data and projects created with XYO.

It is important to note that a Node module is not the same as a simple "node" in a network. A "node" may refer to a singular instance of something inside a larger, greater network. A Node module is specifically a collection of XYO modules.

## Sentinel
**A Sentinel tells one or more modules what to do.**
Similar to a conductor or a Zapier "Zap", the Sentinel contains instructions for other modules to complete. These tasks are often specialized steps that lead to a greater, overall task.

Most importantly, Sentinels do a lot of heavy lifting when it comes to the cryptographic design of XYO. A Sentinel can provide a final signature for a bundle of completed tasks, and it can instruct other modules to sign off on independently completed tasks. Each of these signatures creates a Bound Witnesses.

The more Sentinels that can agree and include unique signatures on the Bound Witnessed data, the better we can verify the audit trail for that data.

 Some examples of Sentinels might be:

- An NFC chip that counts phone scans every time you tap it to your phone
- A smart-watch that records your heart rate
- A thermometer that collects real-world temperature data

## Bridge
**A Bridge serves as a connection between different nodes.**

A Bridge is most often used when traversing a technology connecting remote modules. An example of this may be a Bridge connecting a local module running on your computer and a remote module that requires HTTP access. Another example may be when crossing a Bluetooth connection between two separate nodes.

At its core, a Bridge transfers Bound Witness and payload data from Sentinels to an Archivist. In many cases, the same device that is running the Sentinel also acts as the Bridge.Some examples of Bridges might be:

- A computer
- A smartphone
- A Raspberry Pi

## Archivist
**An Archivist is where Bound Witness and Payload data is stored.**

At its core, an Archivist is a module designed to store things. Archivists can be shared, hosted, or self-hosted, similar to a database.

It is also possible to run an Archivist on the same device as the Sentinel and Bridge. This allows a developer to simplify their XYO system, and for example, store payloads on the same device where payloads are sent to remote modules (by a Bridge) or where actions are orchestrated and signed (by a Sentinel).

## Diviner
**A Diviner is a module that transforms data.**

A Diviner takes in data, transforms it, and delivers an answer or new form of that original data. You can think of them in the same way "Reduce", "Map", and "Filter" methods in Javascript transform the data they are applied to.

For example, a "Summary" Diviner might work the same way a "Reduce" does — a diviner that takes in some amount of data, and transforms it it into a summary of that same data, like a sum or an average


## Module
A Module is an account or wallet with a sovereign ledger and the ability to build and sign Bound Witnesses.
Modules encapsulate XYO components (Archivists, Diviners, Bridges, etc.). All Modules have their own Bound Witness ledger, which allows them to remain sovereign and provide valuable and verifiable audit trails for data. Modules add to this Bound Witness ledger with a new signature when they are called via a query (remotely, in most cases). After being called, Modules build a Bound Witness and sign it, including the signature in the response.

## Bound Witness Blocks
A series of blocks that contain the data collected by a Sentinel.
