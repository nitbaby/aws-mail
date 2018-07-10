var aws = require('aws-sdk');
var nodemailer = require('nodemailer');

// aws.config.loadFromPath('./config.json');

var ses = new aws.SES();
var s3 = new aws.S3();

function createTemplate(event) {
  const htmlContent = `
    <body>
      <table bgcolor="#ededed" width="900" cellpadding="5" cellspacing="0" border="0" align="center" style="border-collapse: collapse; border-spacing: 0; font-family: Helvetica,Arial,sans-serif; margin-top: 30px;">
        <tbody>
          <tr style="width: 940px;">
            <td width="200" valign="top" style="width: 300px; box-shadow: #b5b2af 2px 3px 5px;">
              <div style="margin: 0 10px;">
                <figure style="min-height: 160px; overflow: hidden; margin: 0;">
                  <img src="cid:attachImage1" alt="">
                </figure>            
                <h4 style="color: #0065b8; margin-bottom: 8px;">${event.activities[0].activityName}</h4>
                <b>${event.activities[0].fromPrice}</b>
                <div style="margin-top: 10px;">
                  <img src="cid:smileyImage" alt="" style="width: 20px;">
                  <span>4.5/5</span>
                </div>
                
                <div style="margin-top: 10px;">
                  
                  <span>Duration: </span>
                  <span>12 Hours</span>
                </div>
                
                <div>
                  <a href="https://www.expedia.com/things-to-do/private-full-day-agra-tour-with-lunch.a213400.activity-details?srp=true&amp;location=Taj+Mahal%2C+Agra%2C+India&amp;startDate=2018-07-31&amp;endDate=2018-07-31&amp;latLong=27.1635%2C78.048&amp;rid=6126828&amp;pageNumber=1">Book</a>
                </div>
              </div>
            </td>
            
            <td width="20"></td>
            
            <td width="200" valign="top" style="width: 300px; box-shadow: #b5b2af 2px 3px 5px;">
              <div style="margin: 0 10px;">
                <figure style="min-height: 160px; overflow: hidden; margin: 0;">
                  <img src="cid:attachImage2" alt="">
                </figure>              
                <h4 style="color: #0065b8; margin-bottom: 8px;">${event.activities[1].activityName}</h4>
                <b>${event.activities[1].fromPrice}</b>
                <p></p>
              </div>
            </td>
            
            <td width="20"></td>
            
            <td width="200" valign="top" style="width: 300px; box-shadow: #b5b2af 2px 3px 5px;">
              <div style="margin: 0 10px;">
                <figure style="min-height: 160px; overflow: hidden; margin: 0;">
                  <img src="cid:attachImage3" alt="">
                </figure>  
                <h4 style="color: #0065b8; margin-bottom: 8px;">${event.activities[2].activityName}</h4>
                <b>${event.activities[2].fromPrice}</b>
                <p></p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  `;
  
  return htmlContent;
};

exports.handler = function (event, context, callback) {
      console.log("event");
      console.log(event);
      // 
      // console.log("event");
      // console.log(event);
      
      const HTMLContent = createTemplate(event);
      var mailOptions = {
          from: 'clikmic@gmail.com',
          subject: 'Plan Your Trip',
          // html: `<p>You got a contact message from: <b>${event.emailAddress}</b>
          //           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIE1u9FvDOahAJzXFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCECEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W0L3+TnU7375AAAAAElFTkSuQmCC">
          //       </p>
          //       <div>Embedded image: <img src="cid:attachImage"/></div>`,
          // 
          html: HTMLContent,
          to: 'cooldevlab@gmail.com',
          // bcc: Any BCC address you want here in an array,
          attachments: [{
                path: event.activities[0].imageUrl,
                cid: 'attachImage1'
              },{
                path: event.activities[1].imageUrl,
                cid: 'attachImage2'
              },{
                path: event.activities[2].imageUrl,
                cid: 'attachImage3'
              },{
                filename: 'smiley.png',
                path: "https://c.travel-assets.com/lxweb/images/happy_outline_v2_blue.png",
                cid: 'smileyImage'
              }
          ]
      };

      console.log('Creating SES transporter');
      // create Nodemailer SES transporter
      var transporter = nodemailer.createTransport({
          SES: ses
      });

      // send email
      transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
              console.log(err);
              console.log('Error sending email');
              callback(err);
          } else {
              console.log('Email sent successfully');
              callback();
          }
      });
};
