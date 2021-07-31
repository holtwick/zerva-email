// (C)opyright 2021 Dirk Holtwick, holtwick.it. All rights reserved.

import nodemailer from "nodemailer"
import { Logger } from "zeed"
import { on, register } from "zerva"
import { ZEmailConfig } from "./types"

const name = "counter"
const log = Logger(`zerva:${name}`)

export function useEmail(config: ZEmailConfig) {
  const { transport } = config
  log.info(`use ${name}`)
  register(name, ["http"])
  on("emailSend", async (info) => {
    const {
      to,
      from = `zerva@holtwick.de`,
      subject = "Zerva Email",
      text = `Message from Zerva`,
    } = info

    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport(transport)

      // {
      //   host: "example.com",
      //   port: 465,
      //   secure: true,
      //   // requireTLS: true,
      //   auth: {
      //     user: "user@example.com",
      //     pass: "xxx",
      //   },
      // })

      transporter.sendMail(
        {
          to,
          from,
          subject,
          text,
        },
        (error, info) => {
          if (error) {
            log.error(error)
            reject(error)
          } else {
            log("Email sent: " + info.response)
            resolve(info.response)
          }
        }
      )
    })
  })
}
