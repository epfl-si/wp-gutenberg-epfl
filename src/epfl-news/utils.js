const prod = true;
if (prod) {
  global.BASE_NEWS = "https://actu.epfl.ch";
  global.BASE_NEWS_API_REST_URL = `${BASE_NEWS}/api/v1/`;
} else {
  global.BASE_NEWS = "https://stage-actu.epfl.ch";
  global.BASE_NEWS_API_REST_URL = `${BASE_NEWS}/api/v1/`;
}
