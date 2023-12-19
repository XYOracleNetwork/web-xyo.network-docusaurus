---
sidebar_position: 1
---

# Overview

Creating a basic dApp that can run on the XYO Platform is very simple.  It just requires the developer to create a manifest file that configures modules to do something useful.
In some cases, starting with an existing Manifest and modifying to is the easiest way to get started.

## Parts of an XYO dApp

A dApp running on the XYO Platform is defined by a manifest file.  This file includes all the information needed for a node to be able to host the dApp.

Additionally, a dApp usually provides a set of renderers and query builders that makes it easier for a user to interact with the dApp.

### dApp manifest (or manifests)

The dApp manifest is the only thing that is required to create a dApp.  However, most advanced dApps also provide some or all of the optional aspects of an XYO dApp.

### Initialization Payloads

In many cases, there are some payloads that are bundled with a dApp.  They range from configurations to seed data and act as the starting point for the dApp.
This can also be used as a way to provide constants or a default working set for the dApp.

### Modules

Many dApps can be built by just configuring existing or standard modules in new structures using a manifest.  However, in some cases, the modules that are required to
provide the functionality of the dApp in more complex, so a custom Witness, Diviner, Sentinel or other module must be provided.

### Payload Types (TypeScript/AJV)

In many cases, new Payload types are required for a dApp.  These can either be defined in the manifest or in a Payload PlugIn.

### Renderers

Every dApp can be viewed using the standard Payload Viewer.  However, to make the usage of the dApp simpler and more compelling, custom renderers are usually provided.

### Payload/Query Builders

Every dApp can be driven using the standard Payload/Query Builder.  However, to make the usage of the dApp simpler and more compelling, custom payload and query builders are usually provided.

## Implementation

The implementation of a dApp starts with a Manifest that defines the dApp, and contains all the configuration that makes that dApp able top run.  The has of the Manifest file is the unique
id of a specific version of a dApp.

## User Interface

The user interface for a dApp consists of a combination of Renderers and Payload/Query Builders.  Even though all dApps can be viewed and run from the standard Payload Viewer
and Payload/Query Builder, it is highly recommended to provide at least some custom Renderers and Query Builders.

In some cases, if the dApp uses pre-existing Payload types, there may already be Renderers and Payload/Query Builders available for those payloads.
