var aws = require('aws-sdk');
var nodemailer = require('nodemailer');

var ses = new aws.SES();
var s3 = new aws.S3();

const htmlContent = `
  <body>
    <table bgcolor="#ededed" width="900" cellpadding="5" cellspacing="0" border="0" align="center" style="border-collapse: collapse; border-spacing: 0; font-family: Helvetica,Arial,sans-serif; margin-top: 30px;">
      <tbody>
        <tr style="width: 940px;">
          <td width="200" valign="top" style="width: 300px; box-shadow: #b5b2af 2px 3px 5px;">
            <div style="margin: 0 10px;">
              <figure style="min-height: 160px; overflow: hidden; margin: 0;">
                <img src="cid:smileyImage" alt="">
              </figure>            
              <h4 style="color: #0065b8; margin-bottom: 8px;">Old Delhi Private Half-Day Tour</h4>
              <b>Rs. 7450</b>
              <div style="margin-top: 10px;">
                <img src="cid:attachImage1" alt="" style="width: 20px;">
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
                <img src="cid:attachImage2" alt="" style="width: 20px;">
              </figure>              
              <h4 style="color: #0065b8; margin-bottom: 8px;">Old &amp; New Delhi Private Full-Day Tour</h4>
              <b>Rs. 2343</b>
              <p></p>
            </div>
          </td>
          
          <td width="20"></td>
          
          <td width="200" valign="top" style="width: 300px; box-shadow: #b5b2af 2px 3px 5px;">
            <div style="margin: 0 10px;">
              <figure style="min-height: 160px; overflow: hidden; margin: 0;">
                <img src="cid:attachImage3" alt="" style="width: 20px;">
              </figure>  
              <h4 style="color: #0065b8; margin-bottom: 8px;">Private Full-Day Agra Tour with Lunch</h4>
              <b>Rs. 3422</b>
              <p></p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
`;

exports.handler = function (event, context, callback) {
      console.log("event.body");
      console.log(event.body);
  
      console.log("event");
      console.log(event);
      var mailOptions = {
          from: 'clikmic@gmail.com',
          subject: 'This is an email sent from a Lambda function!',
          // html: `<p>You got a contact message from: <b>${event.emailAddress}</b>
          //           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIE1u9FvDOahAJzXFGS1ECEKEIEQIQoQgRIgQIQgRghAhCBGCECEIQYgQhAhBiBCECEEIQoQgRAhChCBECEIQIgQhQhAiBCFCEIIQIQgRghAhCBGCEIQIQYgQhAhBiBCEIEQIQoQgRAhChCAEIUIQIgQhQhAiBCEIEYIQIQgRghAhCBEiRAhChCBECEK+W0L3+TnU7375AAAAAElFTkSuQmCC">
          //       </p>
          //       <div>Embedded image: <img src="cid:attachImage"/></div>`,
          // 
          html: htmlContent,
          to: 'cooldevlab@gmail.com',
          // bcc: Any BCC address you want here in an array,
          attachments: [
              {
                  filename: "text1.txt",
                  content: 'hello world!'
              },{
                filename: 'taj.jpeg',
                path: "https://thumbnails.trvl-media.com/By2eW6qAc-qjiC6gsNQC9xwos1U=/a.travel-assets.com/mediavault.le/media/b2d71135ca3c3c6c7f1bc8c0a5785152d6a005e3.jpeg"
              },{
                filename: 'google.png',
                path: "https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                cid: 'attachImage'
              },{
                path: "https://a.travel-assets.com/lxweb/media-vault/213358_m.jpeg",
                cid: 'attachImage1'
              },{
                path: "https://a.travel-assets.com/lxweb/media-vault/213400_m.jpeg",
                cid: 'attachImage2'
              },{
                path: "https://a.travel-assets.com/lxweb/media-vault/213372_m.jpeg",
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
