const prod = true;
if (prod) {
  global.BASE_NEWS_API_REST_URL = "https://actu.epfl.ch/api/v1/";
} else {
  global.BASE_NEWS_API_REST_URL = "https://stage-actu.epfl.ch/api/v1/";
}
