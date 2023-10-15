
class ApiNetwork {
  APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;
  BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  UNIT = process.env.EXPO_PUBLIC_UNIT;
  LANG = process.env.EXPO_PUBLIC_LANG;

  async getInfo({ lat, long }) {
    let url =
      this.BASE_URL +
      `lat=${lat}&lon=${long}&units=${this.UNIT}&lang=${this.LANG}&appid=${this.APP_KEY}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ApiNetwork();
