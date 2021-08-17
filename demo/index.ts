import {
  Logger,
  LoggerFileHandler,
  LoggerNodeHandler,
  LogLevel,
  setupEnv,
  valueToInteger,
  valueToString,
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

setupEnv()

const log = Logger("app")
log.info("app")

import { serve, on, emit, useHttp } from "zerva"
import { useEmail } from "zerva-email"

useHttp({
  port: valueToInteger(process.env.PORT, 8080),
})

const transport = {
  host: valueToString(process.env.EMAIL_HOST),
  port: valueToInteger(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: valueToString(process.env.EMAIL_USER),
    pass: valueToString(process.env.EMAIL_PASS),
  },
}

log.info("email transport", JSON.stringify(transport, null, 2))

useEmail({ transport })

on("serveStart", () => {
  emit("emailSend", {
    to: valueToString(process.env.EMAIL_TO, "example@example.com"),
  })
})

serve()
