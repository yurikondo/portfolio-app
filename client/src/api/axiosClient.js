/* axiosはAPIを叩くためのライブラリ */
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

//ローカルストレージからトークンを取得
const getToken = () => {
  return localStorage.getItem("token");
};

/* カスタムでaxiosのインスタンスを作成(https://axios-http.com/docs/instance) */
/* 追加できるオブジェクト一覧(https://axios-http.com/docs/req_config) */
const axiosClient = axios.create({
  baseURL: BASE_URL,
});

/* APIを叩く前（リクエストを送る前）に前処理を捕まえる(https://axios-http.com/docs/interceptors) */
//リクエスト↓
axiosClient.interceptors.request.use(async (config) => {
  return {
    //configにheadersを挿入(レッスン50にて)
    ...config, //新しいオブジェクトを作成し、元の config オブジェクトのプロパティと値をそのままコピー
    headers: {
      "Content-Type": "application/json", //リクエストの内容がJSONであることを示す
      authorization: `Bearer ${getToken()}`, //リクエストヘッダにJWTをつけてサーバーに渡す
    },
  };
});

//レスポンス↓
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;

/* axios.interceptorsを使用して、リクエストとレスポンスの前処理を行います。リクエストの場合、axiosClient.interceptors.request.use()を使用して、リクエストを送信する前にJWTトークンをリクエストヘッダーに追加するように設定されます。レスポンスの場合、axiosClient.interceptors.response.use()を使用して、正常なレスポンスが返される場合はそのまま返し、エラーが発生した場合はエラーを投げるように設定されます。
 */
