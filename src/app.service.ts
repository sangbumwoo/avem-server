import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(private httpService: HttpService) {  }

  async sendMessageToFirebase(data: any): Promise<any> {
    const apiUrl = "https://fcm.googleapis.com/fcm/send";

    const payload = {
      to: `${data.push_token}`,
      notification: {
        title: data.messageTitle,
        body: data.messageBody
      }
    };


    const headersRequest = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'Authorization': `key=${data.firebaseServerKey}`,
    };

    const result = await this.httpService.post(apiUrl, JSON.stringify(payload), { headers: headersRequest }).subscribe()
    return { result: 'OK' };
  }


  sendMessageToKakao(data: any): any {
    const request = require('request');
    const userInfo = {
      push_token: data.push_token,
    };
    const message = {
      title: data.messageTitle,
      body: data.messageBody,
    };
    const options = {
      url: 'https://kapi.kakao.com/v2/push/send',
      method: 'POST',
      headers: {
        'Authorization': `KakaoAK ${data.kakaoServerKey}`,
        // 'Content-Type': 'application/x-www-form-urlencoded' // Not required because POST method default is 'application/x-www-form-urlencoded'. In case of sending json data, we need to specify "application/json"
      },
      form: {
        uuids: '["1234"]',
        bypass: 'true',
        push_message: `{"for_apns":{"push_token":"${userInfo.push_token}","message":{"title":"${message.title}","body":"${message.body}"}},"for_fcm":{"push_token":"${userInfo.push_token}","notification":{"title":"${message.title}","body":"${message.body}"}}}`
      }
    }
    request.post(options, function (err, httpResponse, body) {})
    return { result: 'OK' };
  }
}
