// <reference path="node_modules/zerva-module-template/dist/esm/index.d.ts" />

// Simple demo for node and CommonJS loading

import {
  Logger,
  LoggerFileHandler,
  LoggerNodeHandler,
  LogLevel,
  valueToInteger,
} from "zeed"

Logger.setHandlers([
  LoggerFileHandler("zerva.log", {
    level: LogLevel.debug,
  }),
  LoggerNodeHandler({
    level: LogLevel.info,
    filter: "*",
    colors: true,
    padding: 16,
    nameBrackets: false,
    levelHelper: false,
  }),
])

const log = Logger("app")

import { resolve } from "path"

function resolveConfig() {
  const p = resolve("config.js")
  log.info("config from:", p)
  import(p)
    .then((config) => log.info("config.test =", config.default.test))
    .catch((err) => log.warn("resolveConfig err:", err))
}

resolveConfig()

import { emit, on, serve, useHttp } from "zerva"

// import { useCounter } from "zerva-module-template"

useHttp({
  port: valueToInteger(process.env.PORT, 8080),
})

// on("counterIncrement", (counter) => {
//   log.info("counter inc", counter)
// })

// useCounter()

// serve()
