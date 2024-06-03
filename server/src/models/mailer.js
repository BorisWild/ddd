import fs from 'fs'
import { 
    send_email_msg
} from './auth.access.js';
import {parse} from 'node-html-parser';

function instrument_text(image, name, cost, comment, quantity) {
    return `
<div class="container3" style="margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="col-image-outlook" style="vertical-align:top;width:150px;" ><![endif]-->
          <div class="mj-column-per-25 mj-outlook-group-fix col-image"
            style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="vertical-align:top;" width="100%">
              <tbody>
                <tr>
                  <td align="left" style="font-size:0px;padding:0;word-break:break-word;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                      style="border-collapse:collapse;border-spacing:0px;">
                      <tbody>
                        <tr>
                          <td style="width:48px;"><img height="auto" src='https://drimo.dev-2-tech.ru:4321/${image}'
                              style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                              width="48"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td><td class="col-description-outlook" style="vertical-align:top;width:150px;" ><![endif]-->
          <div class="mj-column-per-25 mj-outlook-group-fix col-description"
            style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="vertical-align:top;" width="100%">
              <tbody>
                <tr>
                  <td align="left" class="description-text"
                    style="font-size:0px;padding:10px 25px;word-break:break-word;">
                    <div
                      style="font-family:Helvetica;font-size:13px;line-height:1;text-align:left;color:#000000;">
                      <p style="font-size:14px;line-height:16px;margin:0;">${name}<br><span style="color:#A2A2A2;font-size:12px;line-height:14px;">${comment}</span></p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td><td class="col-quantity-outlook" style="vertical-align:top;width:150px;" ><![endif]-->
          <div class="mj-column-per-25 mj-outlook-group-fix col-quantity"
            style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="vertical-align:top;" width="100%">
              <tbody>
                <tr>
                  <td align="left" class="table-text"
                    style="font-size:0px;padding:10px 25px;word-break:break-word;">
                    <div
                      style="font-family:Helvetica;font-size:13px;line-height:1;text-align:left;color:#000000;">
                      <p
                        style="white-space:nowrap;font-size:14px;line-height:14px;margin:0;color:#A2A2A2;">
                        ${quantity} шт</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td><td class="col-price-outlook" style="vertical-align:top;width:150px;" ><![endif]-->
          <div class="mj-column-per-25 mj-outlook-group-fix col-price"
            style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="vertical-align:top;" width="100%">
              <tbody>
                <tr>
                  <td align="left" class="table-text table-text-padding"
                    style="font-size:0px;padding:10px 25px;word-break:break-word;">
                    <div
                      style="font-family:Helvetica;font-size:13px;line-height:1;text-align:left;color:#000000;">
                      <p
                        style="white-space:nowrap;font-size:14px;line-height:19px;margin:0;margin-bottom:16px;font-weight:700;">
                        ${cost} ₽</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
</div>
<!--[if mso | IE]></td></tr></table></td></tr><tr><td class="container2-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="container2-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div class="container2"
  style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix"
            style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:top;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                            <p
                              style="border-top:solid 1px #E4E4E4;font-size:1px;margin:0px auto;width:100%;">
                            </p>
                            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #E4E4E4;font-size:1px;margin:0px auto;width:600px;" role="presentation" width="600px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
</div>
`
}

function send_file_by_mail(email, file_name, theme, object) {
    fs.readFile(process.cwd() + '/src/mail_src/html/' + file_name, (err, data) => {
        if (err)
            return {
                success: false,
                message: "The server can't sent an email"
            }; 
        
        let output = data.toString();
        for (const [key, value] of Object.entries(object)) {
            output = output.replaceAll(key, value)
        }

        const root = parse(output);
        if (file_name == "status.html" || file_name == "order.html") {
            const instruments = root.querySelector('#instruments');
        
            object['{instrument_object}'].map((part) => {
                console.log(JSON.parse(part.image).src)
                instruments.innerHTML += instrument_text(
                    JSON.parse(part.image).src, part.name, part.cost, part.comment, part.quantity
                );
            })
        }

        let response = send_email_msg(email,
            theme, '', root.toString());

        response.then(msg => {
            if (msg.message != "Success") {
                throw { message: "Head email server error" };
            }
        })
        .catch(error => console.log(error));
    })

    return {
        success: true
    }
}

export {
    send_file_by_mail
}