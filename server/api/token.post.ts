import axios from 'axios';
export default defineEventHandler(async (event) => {
    const { code } = await readBody(event);

    const instance = axios.create({
      baseURL: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
      },
    });

    const response = await instance.request({
      data: {
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
    });

    return response.data;
});
