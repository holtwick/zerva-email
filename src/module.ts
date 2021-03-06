// (C)opyright 2021 Dirk Holtwick, holtwick.it. All rights reserved.

import nodemailer from "nodemailer"
import { Logger } from "zeed"
import { on, register } from "zerva"
import { ZEmailConfig } from "./types"

const name = "email"
const log = Logger(`zerva:${name}`)

export function useEmail(config: ZEmailConfig) {
  const { transport } = config
  log.info(`use ${name}`)
  register(name)
  on("emailSend", async (info) => {
    const {
      to,
      from = `zerva@holtwick.de`,
      subject = "Zerva Email",
      text = `Message from Zerva`,
      ...others
    } = info
    log.info(`will send to ${to}`)

    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport(transport)
      transporter.sendMail(
        {
          to,
          from,
          subject,
          text,
          ...others,
        },
        (error, info) => {
          if (error) {
            log.error(error)
            reject(error)
          } else {
            log.info(`Email sent to ${to}: ` + info.response)
            resolve(info.response)
          }
        }
      )
    })
  })
}
